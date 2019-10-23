// ----- Imports ----- //

import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
import express from 'express';
import compression from 'compression';
import React from 'react';
import { renderToString } from 'react-dom/server';
import fetch from 'node-fetch';

import { Result, Ok, Err } from 'types/Result';
import Article from 'components/news/Article';
import LiveblogArticle from 'components/liveblog/LiveblogArticle';
import { getConfigValue } from 'utils/ssmConfig';
import { parseCapi, capiEndpoint } from 'utils/capi';
import { Reader } from 'types/Reader';
import { Env } from 'types/Env';

// ----- Setup ----- //

const defaultId =
  'cities/2019/sep/13/reclaimed-lakes-and-giant-airports-how-mexico-city-might-have-looked';
const readFileP = promisify(fs.readFile);


// ----- Functions ----- //

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function checkForUnsupportedContent(capi: any): Result<string, any> {

  const { fields, atoms } = capi.response.content;

  if (fields.displayHint === 'immersive') {
    return new Err('Immersive displayHint is not yet supported');
  }

  if (atoms) {
    return new Err('Atoms not yet supported');
  }

  return new Ok(capi);

}

function Unimplemented(props: { contentType: string }): JSX.Element {
  return React.createElement('p', null, `${props.contentType} not implemented yet`)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getArticleComponent = (capi: any): Reader<Env, React.ReactElement> => {
    switch (capi.type) {
      case 'article':
        return Article({ capi });
      case 'liveblog':
        return LiveblogArticle({ capi, isLive: true });
      default:
        return new Reader((): JSX.Element => Unimplemented({ contentType: capi.type }));
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const generateArticleHtml = (data: string, capi: any): Reader<Env, string> =>
    getArticleComponent(capi)
      .map(renderToString)
      .map(body => data.replace('<div id="root"></div>', `<div id="root">${body}</div>`))

async function readTemplate(): Promise<Result<string, string>> {
  try {
    const data = await readFileP(path.resolve('./src/html/articleTemplate.html'), 'utf8');
    return new Ok(data);
  } catch (_) {
    return new Err('Could not read template file');
  }
}


// ----- App ----- //

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use("/public", express.static(path.resolve(__dirname, '../public')));
app.use(compression());

app.get('/*', async (req, res) => {

  try {

    const articleId = req.params[0] || defaultId;

    const template = await readTemplate();
    const key = await getConfigValue<string>("capi.key");
    const imageSalt = await getConfigValue<string>('apis.img.salt');
    const resp = await fetch(capiEndpoint(articleId, key), {});
    const capiText = await resp.text();
    const parsedCapi = parseCapi(capiText);

    template
      .andThen((templ: string) =>
        parsedCapi
          .andThen(checkForUnsupportedContent)
          .map(capi => generateArticleHtml(templ, capi.response.content).run({ imageSalt }))
      )
      .either(
        err => { throw err },
        data => res.send(data),
      );

  } catch (e) {

    console.error(e);
    res.status(500).send('An error occurred, check the console');

  }

});

app.listen(3040);

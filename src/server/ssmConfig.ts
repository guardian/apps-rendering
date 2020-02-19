import { ssm } from './aws';
import { App, Stack, Stage } from './appIdentity';
import { Option, Some, None } from 'types/option';
import fs from 'fs';
import os from 'os';
import { logger } from 'logger';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Config = {[key: string]: any};

async function recursivelyFetchConfig(nextToken?: string, currentConfig?: Config): Promise<Config> {
    const path = `/${App}/${Stage}/${Stack}/`;
    const result = await ssm.getParametersByPath({
        Path: path,
        WithDecryption: true,
        NextToken: nextToken
    }).promise();
    const fetchedConfig: Config = {};
    if (result.Parameters) {
        result.Parameters.forEach(param => {
            if (param.Name) {
                const name = param.Name.replace(path, '');
                fetchedConfig[name] = param.Value;
            }
        });
    }
    const config = Object.assign({}, currentConfig, fetchedConfig);
    if (result.NextToken) {
        return recursivelyFetchConfig(result.NextToken, config);
    }
    else {
        return Promise.resolve(config);
    }
}

let state: Option<Config> = new None();

async function getState(): Promise<Config> {
    const config = await recursivelyFetchConfig();
    state = new Some(config);
    return config;
}

async function fetchConfig(): Promise<Config> {
    return state.fmap(s => Promise.resolve(s)).withDefault(getState());
}

export async function getConfigValue<A>(key: string, defaultValue?: A): Promise<A> {
    if (process.env.NODE_ENV === 'development') {
        try {
            let rawdata = fs.readFileSync(`${os.homedir}/.gu/mobile-apps-rendering.json`).toString()
            let config = JSON.parse(rawdata);
            if (config[key]) {
                return config[key];
            }
        } catch(e) {
            logger.error(e);
        }
    }

    const conf = await fetchConfig();
    if (conf[key]) {
        return conf[key];
    }
    else {
        if (defaultValue) {
            return defaultValue;
        }
        else {
            throw new Error(`No config value for key: /${App}/${Stage}/${Stack}/${key}`);
        }
    }
}
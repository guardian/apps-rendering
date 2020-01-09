import React from 'react';
import ArticleHeadline from './headline';
import { pillarColours, Pillar } from 'pillar';
import { text, boolean, withKnobs, object } from "@storybook/addon-knobs";

export default { title: 'Standard', decorators: [withKnobs] };

export const Headline = (): JSX.Element => <ArticleHeadline
  headline={text("Headline", "Headline")}
  feature={boolean("Feature", false)}
  analysis={boolean("Analysis", false)}
  rating={text("Rating", "5")}
  pillarStyles={object("Pillar Styles", pillarColours[Pillar.news])}
/>

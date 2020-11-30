// ----- Imports ----- //
import { withKnobs } from '@storybook/addon-knobs';
import FooterCcpa from 'components/shared/footer';
import type { FC } from 'react';

// ----- Stories ----- //
const WithCcpa: FC = () => <FooterCcpa isCcpa={true} />;

const Default: FC = () => <FooterCcpa isCcpa={false} />;

export default {
	component: FooterCcpa,
	title: 'Footer',
	decorators: [withKnobs],
};

export { Default, WithCcpa };

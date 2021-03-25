import type { SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import type { Campaign } from '@guardian/apps-rendering-api-models/campaign';
import type { FormField } from '@guardian/apps-rendering-api-models/formField';
import { Button } from '@guardian/src-button';
import { neutral, remSpace, text } from '@guardian/src-foundations';
import { body, headline, textSans } from '@guardian/src-foundations/typography';
import { SvgMinus, SvgPlus } from '@guardian/src-icons';
import { TextArea } from '@guardian/src-text-area';
import { TextInput } from '@guardian/src-text-input';
import type { Format } from '@guardian/types';
import FileInput from 'components/FileInput';
import RadioInput from 'components/RadioInput';
import type { FC, ReactElement } from 'react';
import { plainTextElement } from 'renderer';
import { darkModeCss } from 'styles';
import { getThemeStyles } from 'themeStyles';

export interface CalloutProps {
	campaign: Campaign;
	format: Format;
	description: DocumentFragment;
}

const calloutStyles = css`
	border-top: 1px ${neutral[86]} solid;
	border-bottom: 1px ${neutral[86]} solid;
	position: relative;
	margin: ${remSpace[4]} 0 ${remSpace[9]} 0;

	&:not([open]) .is-on,
	&[open] .is-off {
		display: none;
	}

	.is-on,
	.is-off {
		position: absolute;
		transform: translate(0, 50%);
		bottom: 0;
	}

	&[open] {
		background: ${neutral[97]};
	}

	${darkModeCss`
        background: white;
        color: ${neutral[7]};
        border: none;
    `}
`;

const summaryStyles = css`
	outline: none;
	padding: 0;
	list-style: none;

	&::-webkit-details-marker {
		display: none;
	}
`;

const kickerStyles = css`
	display: flex;
	flex-direction: row;
`;

const logoStyles = css`
	flex: initial;
`;

const headlineStyles = css`
	${headline.xxxsmall({ fontWeight: 'bold' })};
	margin: 0;
`;

const descriptionStyles = css`
	margin: ${remSpace[3]};

	p {
		${body.small({ lineHeight: 'tight' })};
		margin: ${remSpace[2]} 0;
	}
`;

const errorStyles = css`
	color: ${text.error};
	${textSans.small()};
`;

const speechBubbleStyles = (kicker: string): SerializedStyles => css`
	padding: ${remSpace[3]};
	position: relative;
	color: ${neutral[100]};
	background-color: ${kicker};
	margin-bottom: ${remSpace[9]};
	min-width: 5.5rem;

	&::after {
		content: '';
		width: 1.25rem;
		height: 1.375rem;
		border-radius: 0 0 1.125rem;
		position: absolute;
		bottom: -0.75rem;
		left: 0.625rem;
		color: ${neutral[100]};
		background-color: ${kicker};
	}
`;

const formStyles = css`
	margin: ${remSpace[4]} ${remSpace[2]} ${remSpace[9]} ${remSpace[2]};
`;

const formAnchor = (kicker: string): SerializedStyles => css`
	color: ${kicker};
	text-decoration: none;
	${textSans.small()};
	position: absolute;
	bottom: ${remSpace[2]};
	right: ${remSpace[2]};
`;

const renderField = ({
	type,
	label,
	mandatory,
	options,
	id,
}: FormField): ReactElement | null => {
	const name = `field_${id}`;
	const input = css`
		margin-bottom: ${remSpace[4]};
	`;
	switch (type) {
		case 'text':
			return (
				<TextInput
					cssOverrides={input}
					name={name}
					label={label}
					optional={!mandatory}
				/>
			);
		case 'textarea':
			return (
				<TextArea
					cssOverrides={input}
					name={name}
					label={label}
					optional={!mandatory}
				/>
			);
		case 'file':
			return (
				<FileInput
					cssOverrides={input}
					required={mandatory}
					name={name}
					label={label}
				/>
			);
		case 'radio':
			return (
				<RadioInput
					cssOverrides={input}
					options={options}
					name={name}
					label={label}
				/>
			);
		default:
			return null;
	}
};

const CalloutForm: FC<CalloutProps> = (props: CalloutProps) => {
	const { campaign, format, description } = props;
	const { kicker } = getThemeStyles(format.theme);

	return (
		<details className="js-callout" css={calloutStyles}>
			<summary css={summaryStyles}>
				<div css={kickerStyles}>
					<div css={logoStyles}>
						<div css={speechBubbleStyles(kicker)}>
							<h4 css={headlineStyles}>Take part</h4>
						</div>
					</div>
					<div css={descriptionStyles}>
						<h4 css={headlineStyles}>{campaign.fields.callout}</h4>
						{Array.from(description.childNodes).map(
							plainTextElement,
						)}
					</div>
				</div>
				<Button
					size="xsmall"
					className="is-off js-callout-expand"
					iconSide="left"
					icon={<SvgPlus />}
				>
					Tell us
				</Button>
				<Button
					size="xsmall"
					className="is-on js-callout-expand"
					iconSide="left"
					icon={<SvgMinus />}
				>
					Hide
				</Button>
			</summary>

			<form css={formStyles} action="#" method="post">
				<div>
					<input name="formId" type="hidden" value={campaign.id} />
					{campaign.fields.formFields.map(renderField)}
					<p css={errorStyles} className="js-error-message"></p>
					<Button
						cssOverrides={css`
							margin: ${remSpace[4]} 0;
						`}
						type="submit"
						size="xsmall"
					>
						Share with the Guardian
					</Button>
					<a
						css={formAnchor(kicker)}
						href="https://www.theguardian.com/help/terms-of-service"
					>
						Terms and conditions
					</a>
				</div>
			</form>
		</details>
	);
};

export default CalloutForm;

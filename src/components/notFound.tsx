import { css } from '@emotion/react';
import { brand } from '@guardian/src-foundations/palette';
import { FC } from 'react';
import type { SerializedStyles } from '@emotion/react';
import { remSpace } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';

const tabletSquare1 = css`
	position: absolute;
	width: 339px;
	height: 97vh;
	left: 21px;
	top: 8px;
	border: 1px solid rgba(255, 255, 255, 0.2);
	box-sizing: border-box;
`;

const tabletSquare2 = css`
	position: absolute;
	width: 340px;
	height: 97vh;
	left: 380px;
	top: 8px;
	border: 1px solid rgba(255, 255, 255, 0.2);
	box-sizing: border-box;
`;

const headline = css`{
	color: Palette.neutral[7],
	fontSize: '28px',
	fontWeight: 200,
	lineHeight: 1.15,
	marginBottom: '12px',
	maxWidth: '540px',	
	${from.tablet} {
		fontSize: '42px',
	},
}`;

const subHeadline = css`
	font-style: normal;
	font-weight: normal;
	font-family: 'Guardian Light Headline', Georgia;
	font-size: 17px;
	line-height: 21px;
	position: absolute;
	width: 258px;
	height: 84px;
	left: 12px;
	top: 210px;
`;

const reportLink = css`
	color: #ffffff;
	text-decoration: none;
	border-bottom: 1px solid #ffffff;
	padding-bottom: 3px; ;
`;

const arrowPosition = css`
	position: absolute;
	width: 270px;
	height: 44px;
	left: 12px;
	top: 319px;
`;

const arrow = css`
	background-color: #ffffff;
	border-radius: 9999px;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	color: #052962;
	display: inline-block;
	font-family: 'Guardian Text Sans Regular', Georgia, sans-serif;
	font-size: 16px;
	font-weight: bold;
	line-height: 42px;
	padding: 0 45px 0 20px;
	width: 250px;
	position: relative;
	text-decoration: none;
`;

const ovalContainer = css`
	height: 44px;
	position: absolute;
	right: 5px;
	top: 50%;
	-webkit-transform: translate(0, -50%);
	transform: translate(0, -50%);
	-webkit-transition: -webkit-transform 0.3s;
	transition: -webkit-transform 0.3s;
	transition: transform 0.3s;
	transition: transform 0.3s, -webkit-transform 0.3s;
	width: 40px;
`;

const gsContainer = css`
	position: relative;
	margin: 0 auto;
	z-index: 5000;
	padding: 0 10px;
`;

const Styles = css`
	background: ${brand[400]};
`;

export const sidePadding = css`
	padding-left: ${remSpace[2]};
	padding-right: ${remSpace[2]};

	${from.wide} {
		padding-left: 0;
		padding-right: 0;
	}
`;

export const wideContentWidth = 620;

export const articleWidthStyles: SerializedStyles = css`
	${sidePadding}
	${from.wide} {
		margin: 0 auto;
	}

	${from.phablet} {
		width: ${wideContentWidth}px;
	}
`;

const NotFound: FC = () => (
	<main css={[Styles]}>
		<div css={articleWidthStyles}>
			<div css={gsContainer}>
				<div css={tabletSquare1}></div>
				<div css={tabletSquare2}></div>
				<div css={headline}>
					Sorry – we haven’t been able to serve the page you asked
					for.
				</div>
				<div css={subHeadline}>
					You may have followed an outdated link, or have mistyped a
					URL. If you believe this to be an error please{' '}
					<a
						css={reportLink}
						href="https://www.theguardian.com/info/tech-feedback"
					>
						report it
					</a>
					.
				</div>
				<div css={arrowPosition}>
					<a href="https://www.theguardian.com/" css={arrow}>
						The Guardian homepage
						<svg
							width="30"
							height="30"
							viewBox="0 0 30 30"
							css={ovalContainer}
						>
							<path
								d="M22.8 14.6L15.2 7l-.7.7 5.5 6.6H6v1.5h14l-5.5 6.6.7.7 7.6-7.6v-.9"
								fill="#052962"
							></path>
						</svg>
					</a>
				</div>
			</div>
			{/* {
				<div css={gsContainer}>
					<div css={tabletSquare1}></div>
					<div css={tabletSquare2}></div>
					<div css={headline}>
						Sorry – we haven’t been able to serve the page you asked
						for.
					</div>
					<div css={subHeadline}>
						You may have followed an outdated link, or have mistyped
						a URL. If you believe this to be an error please{' '}
						<a
							css={reportLink}
							href="https://www.theguardian.com/info/tech-feedback"
						>
							report it
						</a>
						.
					</div>
					<div css={arrowPosition}>
						<a href="https://www.theguardian.com/" css={arrow}>
							The Guardian homepage
							<svg
								width="30"
								height="30"
								viewBox="0 0 30 30"
								css={ovalContainer}
							>
								<path
									d="M22.8 14.6L15.2 7l-.7.7 5.5 6.6H6v1.5h14l-5.5 6.6.7.7 7.6-7.6v-.9"
									fill="#052962"
								></path>
							</svg>
						</a>
					</div>
				</div>
			} */}
		</div>
	</main>
);

export default NotFound;

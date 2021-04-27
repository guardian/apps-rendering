import { css } from '@emotion/react';
import { FC } from 'react';

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

const headline = css`
	font-style: normal;
	font-weight: 500;
	font-size: 24px;
	line-height: 130%;
	position: absolute;
	width: 284px;
	height: 84px;
	left: 12px;
	top: 105px;
`;

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

const body = css`
	background-color: #052962;
`;

const gsContainer = css``;

const NotFound: FC = () => (
	<div css={body}>
		{/* <div css={gsContainer}>
			<div css={tabletSquare1}></div>
			<div css={tabletSquare2}></div>
			<div css={headline}>
				Sorry – we haven’t been able to serve the page you asked for.
			</div>
			<div css={subHeadline}>
				You may have followed an outdated link, or have mistyped a URL.
				If you believe this to be an error please{' '}
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
	 */}
	</div>
);

export default NotFound;

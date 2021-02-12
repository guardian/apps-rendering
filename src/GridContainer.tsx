import type { FC } from 'react';

export const Grid: FC = ({ children }) => {
	const styles = {
		display: 'grid',
		gridTemplateColumns: 'repeat(12, 1fr)',
	};

	return <div style={styles}>{children}</div>;
};

export const Row: FC = ({ children }) => {
	const styles = {
		gridRow: 'auto',
		height: '200px',
	};

	return <div css={styles}>{children}</div>;
};

export const Col: FC = ({ children }) => {
	const styles = {
		height: '20px',
		width: '200px',
		background: 'red',
	};

	return <div style={styles}>hello</div>;
};

const Example: FC = () => (
	<Grid>
		<Row>
			<Col />
			<Col />
		</Row>
		<Row>
			<Col />
			<Col />
			<Col />
			<Col />
		</Row>
	</Grid>
);

export default Example;

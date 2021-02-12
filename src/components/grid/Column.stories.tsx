import type { FC } from 'react';
import { Column } from './Column';
import Container from './Container';
import Grid from './Grid';

const Default: FC = () => (
	<Container>
		<Grid smCols={1} mdCols={2} lgCols={4}>
			<Column smSpan={2} mdSpan={2} lgSpan={0}>
				<div
					style={{
						height: '200px',
						width: '200px',
						backgroundColor: '2000px',
					}}
				/>
			</Column>
		</Grid>
	</Container>
);

// ----- Exports ----- //

export default {
	component: Column,
	title: 'Grid/Column',
};

export { Default };

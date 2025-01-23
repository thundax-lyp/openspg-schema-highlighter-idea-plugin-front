import React from 'react';
import { type Edge, type EdgeProps, getBezierPath } from '@xyflow/react';
import { SchemaEntity } from "@/pages/schema-diagram/types";

export type TurboEdgeData = {
	type?: 'extends' | 'contains',
}

const TurboEdge = (props: EdgeProps<Edge<TurboEdgeData>>) => {
	const {
		id,
		sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition,
		style = {},
		markerEnd,
	} = props

	const xEqual = sourceX === targetX;
	const yEqual = sourceY === targetY;

	const [edgePath] = getBezierPath({
		// we need this little hack in order to display the gradient for a straight line
		sourceX: xEqual ? sourceX + 0.0001 : sourceX,
		sourceY: yEqual ? sourceY + 0.0001 : sourceY,
		sourcePosition,
		targetX,
		targetY,
		targetPosition,
	});

	return (
		<>
			<path
				id={id}
				style={style}
				className="react-flow__edge-path"
				d={edgePath}
				markerEnd={markerEnd}
			/>
		</>
	);
}

export default TurboEdge

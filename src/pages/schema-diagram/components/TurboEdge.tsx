import React from 'react';
import { type Edge, type EdgeProps, getBezierPath, useInternalNode } from '@xyflow/react';
import { getEdgeParams } from "./utils";

export type TurboEdgeData = {
	source: any
	target: any
}

const TurboEdge = (props: EdgeProps<Edge<TurboEdgeData>>) => {

	const {id, source, target, label, markerStart, markerEnd, style} = props

	const sourceNode = useInternalNode(source);
	const targetNode = useInternalNode(target);

	if (!sourceNode || !targetNode) {
		return null;
	}

	const {sourceX, sourceY, targetX, targetY, sourcePos, targetPos} = getEdgeParams(sourceNode, targetNode, 5);

	if (!sourceX || !sourceY || !targetX || !targetY) {
		console.log(sourceNode, targetNode)
	}

	const [edgePath, labelX, labelY] = getBezierPath({
		sourceX: sourceX === targetX ? sourceX + 0.0001 : sourceX,
		sourceY: sourceY === targetY ? sourceY + 0.0001 : sourceY,
		sourcePosition: sourcePos,
		targetX,
		targetY,
		targetPosition: targetPos,
	});

	const labelText = label?.toString() || ''
	const labelTextWidth = (labelText.length + labelText.replaceAll(/[ -~]+/g, '').length) * 6
	const labelStart = labelX - labelTextWidth / 2
	const labelTop = labelY + 6

	return (
		<>
			<path
				id={id}
				style={style}
				className="react-flow__edge-path"
				d={edgePath}
				markerStart={markerStart}
				markerEnd={markerEnd}
			>
			</path>
			<text
				fontSize="12px"
				fill="var(--entity-name-color)"
				transform={`translate(${labelStart}, ${labelTop})`}
				style={{
					textShadow: '0 0 20px var(--keyword-color)',
				}}
			>
				{label}
			</text>
		</>
	);
}

export default TurboEdge

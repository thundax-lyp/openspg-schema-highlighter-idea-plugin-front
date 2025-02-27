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
			<text fontSize="12px" fill="#fffc" transform={`translate(${labelStart - 1}, ${labelTop - 1})`}>{label}</text>
			<text fontSize="12px" fill="#fffc" transform={`translate(${labelStart}, ${labelTop - 1})`}>{label}</text>
			<text fontSize="12px" fill="#fffc" transform={`translate(${labelStart + 1}, ${labelTop - 1})`}>{label}</text>
			<text fontSize="12px" fill="#fffc" transform={`translate(${labelStart - 1}, ${labelTop})`}>{label}</text>
			<text fontSize="12px" fill="#fffc" transform={`translate(${labelStart + 1}, ${labelTop})`}>{label}</text>
			<text fontSize="12px" fill="#fffc" transform={`translate(${labelStart - 1}, ${labelTop + 1})`}>{label}</text>
			<text fontSize="12px" fill="#fffc" transform={`translate(${labelStart}, ${labelTop + 1})`}>{label}</text>
			<text fontSize="12px" fill="#fffc" transform={`translate(${labelStart + 1}, ${labelTop + 1})`}>{label}</text>

			<text fontSize="12px" fill="var(--entity-alias-color)" enableBackground="#fff" transform={`translate(${labelStart}, ${labelTop})`}>{label}</text>
		</>
	);
}

export default TurboEdge

import type { Edge, Node } from "@xyflow/react";
import { DagreLayout, ForceLayout, LayoutEdge, LayoutNode } from "./layout";
import type { TurboNodeData } from "./TurboNode";
import { TurboEdgeData } from "./TurboEdge";

export interface LayoutNodesParam {
	nodes: Array<Node<TurboNodeData>>
	edges: Array<Edge<TurboEdgeData>>
}

export const layoutNodes = (params: LayoutNodesParam): Array<Node<TurboNodeData>> => {
	const {nodes, edges} = params

	const layoutEdges: Array<LayoutEdge> = edges
		.filter(x => x.source != x.target)
		.map(edge => {
			return {
				source: {id: edge.source}, target: {id: edge.target}
			}
		})

	const layoutNodes: Array<LayoutNode> = nodes.map(node => {
		const {id, position, data} = node
		return {
			id, x: position.x, y: position.y, width: data.width, height: data.height
		}
	})

	const hasEdges = (node: LayoutNode): boolean => {
		return !!layoutEdges.find(edge => edge.source.id == node.id || edge.target.id == node.id)
	}

	const forceLayoutNodes = ForceLayout().layout({
		nodes: layoutNodes.filter(x => hasEdges(x)), edges: layoutEdges
	})
	const dagreLayoutNodes = DagreLayout({direction: 'LR'}).layout({
		nodes: layoutNodes.filter(x => !hasEdges(x)), edges: []
	})

	const forceLayoutLeft = forceLayoutNodes.length === 0 ? 0 : Math.min(...forceLayoutNodes.map(({x = 0}) => x))
	const forceLayoutBottom = forceLayoutNodes.length === 0 ? 0 : Math.max(...forceLayoutNodes.map(({y = 0, height = 0}) => y + height))

	const dagreLayoutLeft = dagreLayoutNodes.length === 0 ? 0 : Math.min(...dagreLayoutNodes.map(({x = 0}) => x))
	const dagreLayoutTop = dagreLayoutNodes.length === 0 ? 0 : Math.min(...dagreLayoutNodes.map(({y = 0}) => y))

	const dagreLayoutOffsetX = forceLayoutLeft - dagreLayoutLeft
	const dagreLayoutOffsetY = forceLayoutBottom - dagreLayoutTop + 30
	dagreLayoutNodes.forEach(layoutNode => {
		layoutNode.x = (layoutNode.x || 0) + dagreLayoutOffsetX
		layoutNode.y = (layoutNode.y || 0) + dagreLayoutOffsetY
	})

	return [...forceLayoutNodes, ...dagreLayoutNodes].map(layoutNode => {
		const node = nodes.find(x => x.id == layoutNode.id)
		return {
			...node, position: {
				x: layoutNode.x, y: layoutNode.y
			}
		} as Node<TurboNodeData>
	})
}

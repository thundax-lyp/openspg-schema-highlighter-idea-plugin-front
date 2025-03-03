import { Layout, LayoutGroup, LayoutNode } from "./types";
import * as d3 from "d3";

const MANY_BODY_STRENGTH = -80
const LINK_DISTANCE = 80
const COLLISION_OFFSET = 60

export interface ForceLayoutProps {
	manyBodyStrength?: number
	linkDistance?: number
	collisionOffset?: number
	iteration?: number
}

export const ForceLayout = (props?: ForceLayoutProps): Layout => {
	const {
		manyBodyStrength = MANY_BODY_STRENGTH,
		linkDistance = LINK_DISTANCE,
		collisionOffset = COLLISION_OFFSET,
	} = props || {}

	const layout = (param: LayoutGroup): Array<LayoutNode> => {
		const {nodes, edges} = param
		if (nodes.length == 0) {
			return []
		}

		const layoutNodes = nodes.map(({x = 0, y = 0}, index) => ({x, y, index}))
		const layoutEdges = edges.map(({source, target}) => {
			return {
				source: nodes.findIndex(x => x.id == source.id),
				target: nodes.findIndex(x => x.id == target.id),
			}
		}).filter(({source, target}) => source >= 0 && target >= 0 && source !== target)

		const simulation = d3.forceSimulation(layoutNodes)
			.force("charge", d3.forceManyBody().strength(manyBodyStrength))
			.force("center", d3.forceCenter(300, 300))
			.force("collision", d3.forceCollide(({index}) => {
				const {width = 0, height = 0} = nodes[index] || {}
				return Math.sqrt(width * width + height * height) / 2 + collisionOffset
			}))
			.force("link", d3.forceLink(layoutEdges).distance(linkDistance))
			.force("x", d3.forceY(60))

		simulation.tick(100)

		return simulation.nodes().map(({x, y}, idx) => {
			// console.log(idx, x, y)
			const node = nodes[idx]
			return {
				...node,
				x: x - (node.width || 0) / 2,
				y: y - (node.height || 0) / 2,
			}
		})
	}

	return {
		name: 'ForceLayout',
		layout
	}
}
// targetPosition: isHorizontal ? 'left' : 'top',
// sourcePosition: isHorizontal ? 'right' : 'bottom',

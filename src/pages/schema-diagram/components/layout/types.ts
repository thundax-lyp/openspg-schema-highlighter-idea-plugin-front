export interface LayoutNode {
	id: string
	x?: number
	y?: number
	width?: number
	height?: number
}

export interface LayoutEdge {
	source: LayoutNode
	target: LayoutNode
	weight?: number
}

export interface LayoutParam {
	nodes: Array<LayoutNode>
	edges: Array<LayoutEdge>
}

export interface Layout {
	name: string
	layout: (param: LayoutParam) => Array<LayoutNode>
}

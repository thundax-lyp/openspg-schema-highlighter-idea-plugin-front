import React, { useEffect, useState } from 'react';
import { ConnectionLineType, Controls, type Edge, type Node, ReactFlow, ReactFlowInstance, useEdgesState, useNodesState } from '@xyflow/react';
import dagre from '@dagrejs/dagre';

import TurboNode, { type TurboNodeData } from './TurboNode';
import TurboEdge, { TurboEdgeData } from './TurboEdge';
import { DownloadIcon } from "./icons";
import { SchemaEntity } from "@/pages/schema-diagram/types";

import '@xyflow/react/dist/base.css';
import './turbo.css'

export type Direction = 'TB' | 'LR' | 'RL' | 'BT';

const layoutElements = (
	{
		nodes = [],
		edges = [],
		direction = 'TB',
	}: {
		nodes: Array<Node<TurboNodeData>>
		edges: Array<Edge>
		direction: Direction
	}): Array<Node<TurboNodeData>> => {
	const isHorizontal = direction === 'LR';

	const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
	dagreGraph.setGraph({rankdir: direction});

	nodes.forEach(node => {
		dagreGraph.setNode(node.id, {
			width: (node.data.width || 150) + 32,
			height: (node.data.height || 20),
		});
	});

	edges.forEach((edge) => dagreGraph.setEdge(edge.source, edge.target));

	const maxFreeNodeCount = 3;
	const freeNodes: Node<TurboNodeData>[] = []
	const flushFreeNodes = () => {
		for (let i = 0; i < freeNodes.length - 1; i += 1) {
			dagreGraph.setEdge(freeNodes[i].id, freeNodes[i + 1].id)
		}
		freeNodes.splice(0, freeNodes.length)
	}

	nodes.forEach(node => {
		if (!edges.find(edge => edge.source === node.id || edge.target === node.id)) {
			freeNodes.push(node)
			if (freeNodes.length >= maxFreeNodeCount) {
				flushFreeNodes()
			}
		} else {
			flushFreeNodes()
		}
	})
	flushFreeNodes()

	dagre.layout(dagreGraph);

	return nodes.map((node) => {
		const nodeWithPosition = dagreGraph.node(node.id);
		return {
			...node,
			targetPosition: isHorizontal ? 'left' : 'top',
			sourcePosition: isHorizontal ? 'right' : 'bottom',
			position: {
				x: nodeWithPosition.x, y: nodeWithPosition.y,
			},
		} as Node<TurboNodeData>
	});
};

export type TurboFlowProps = {
	initialEntities?: SchemaEntity[]
};

const TurboFlow = (props: TurboFlowProps) => {
	const {initialEntities = []} = props

	const [nodes, setNodes, onNodesChange] = useNodesState<Node<TurboNodeData>>([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

	const [reactFlow, setReactFlow] = useState<ReactFlowInstance>();

	//call fitView() after nodes have been initialized, this fitting run only once
	const [initialized, setInitialized] = useState<boolean>(false);

	const handleSave = () => {
		console.log("onSave")
	}

	// initialize nodes and edges
	useEffect(() => {
		const normalizedNodes: Array<Node<TurboNodeData>> = []
		const normalizedEdges: Array<Edge<TurboEdgeData>> = []
		const additionalEdges: Array<Edge<TurboEdgeData>> = []

		initialEntities.forEach(entity => {
			const {id = ''} = entity
			if (!normalizedNodes.find(x => x.id === id)) {
				const normalizedNode: Node<TurboNodeData> = {
					id, position: {x: 0, y: 0}, type: 'turbo', data: {
						entity,
					},
				}
				const cachedNode = nodes.find(x => x.id === id)
				if (cachedNode) {
					normalizedNode.position = cachedNode.position
					normalizedNode.data.width = cachedNode.data.width
					normalizedNode.data.height = cachedNode.data.height
				}
				normalizedNodes.push(normalizedNode)
			}
		})

		initialEntities.forEach(entity => {
			const {id = '', types = []} = entity
			types.forEach(type => {
				const parentNode = initialEntities.find(x => x.name == type)
				if (parentNode) {
					normalizedEdges.push({
						id: `edge__${parentNode.id}__${id}`,
						source: `${parentNode.id}`,
						target: id,
					})
				}
			})
		})

		setNodes(layoutElements({nodes: normalizedNodes, edges: normalizedEdges, direction: 'LR'}));
		setEdges([...normalizedEdges, ...additionalEdges])
	}, [initialEntities]);

	// recalculate node position after HTML elements rendered
	useEffect(() => {
		let dirty = false
		const newNodes = nodes.map(node => {
			if (node.measured && (node.measured.width != node.data.width || node.measured.height != node.data.height)) {
				dirty = true
				return {
					...node, data: {
						...node.data,
						width: node.measured.width,
						height: node.measured.height
					}
				}
			}
			return node
		})

		if (dirty) {
			setNodes(layoutElements({nodes: newNodes, edges, direction: 'LR'}));
			setInitialized(true)
		}
	}, [nodes])

	// auto-fitting layout
	useEffect(() => {
		if (initialized && reactFlow) {
			console.log('run fitView')
			reactFlow.fitView({
				nodes: nodes.map(({id}) => ({id}))
			}).then(x => x)
		}
	}, [initialized, reactFlow]);

	return (
		<div className="schema-diagram">
			<div className="turbo-container">
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					connectionLineType={ConnectionLineType.SmoothStep}
					onInit={(x) => setReactFlow(x)}
					fitView={false}
					nodeTypes={{
						turbo: TurboNode,
					}}
					edgeTypes={{
						turbo: TurboEdge,
					}}
					defaultEdgeOptions={{
						type: 'turbo',
						markerEnd: 'edge-circle',
					}}
				>
					<Controls showInteractive={true} position="bottom-right">
						{/*<button type="button" className="react-flow__controls-button" title="save as image" aria-label="save as image" onClick={() => handleSave()}>*/}
						{/*	<DownloadIcon/>*/}
						{/*</button>*/}
					</Controls>
					<svg>
						<defs>
							<linearGradient id="edge-gradient">
								<stop offset="0%" stopColor="#ae53ba"/>
								<stop offset="100%" stopColor="#2a8af6"/>
							</linearGradient>

							<marker
								id="edge-circle"
								viewBox="-5 -5 10 10"
								refX="0"
								refY="0"
								markerUnits="strokeWidth"
								markerWidth="10"
								markerHeight="10"
								orient="auto"
							>
								<circle stroke="#2a8af6" strokeOpacity="0.75" r="2" cx="0" cy="0"/>
							</marker>
						</defs>
					</svg>
				</ReactFlow>
			</div>
		</div>
	);
};

export default TurboFlow

import React, {useCallback, useEffect, useState} from 'react';
import {
    Background,
    ConnectionMode,
    Controls,
    type Edge,
    type Node,
    ReactFlow,
    ReactFlowProvider,
    useEdgesState,
    useNodesState,
    useOnSelectionChange,
    useReactFlow
} from '@xyflow/react';

import {type TurboNodeData, TurboNode} from './turbo-node';
import {type TurboEdgeData, TurboEdge} from './turbo-edge';
import {layoutNodes} from "./layout-nodes";
import {SchemaEntity} from "../types";

import '@xyflow/react/dist/base.css';
import './turbo.css';

export type TurboFlowProps = {
    initialEntities?: SchemaEntity[]
    selection?: SchemaEntity[]
    onSelectionChange?: (entities: SchemaEntity[]) => void
};

const TurboFlow = (props: TurboFlowProps) => {
    const {initialEntities = [], selection = [], onSelectionChange} = props

    const reactFlow = useReactFlow();
    const [nodes, setNodes, onNodesChange] = useNodesState<Node<TurboNodeData>>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<Edge<TurboEdgeData>>([]);
    const [animateNodes, setAnimateNodes] = useState<boolean>(false);

    // call fitView after first layout pass to avoid repeated viewport jumps
    const [initialized, setInitialized] = useState<boolean>(false);

    // keep selection in React Flow and expose it to parent via callback
    useOnSelectionChange({
        onChange: useCallback(({nodes}) => {
            onSelectionChange?.(nodes.map(x => x.data.entity) as SchemaEntity[])
        }, []),
    })

    // build nodes/edges from entities, then layout once per input change
    useEffect(() => {
        // trigger temporary slide animation for the new layout
        setAnimateNodes(true)
        const animationTimer = window.setTimeout(() => {
            setAnimateNodes(false)
        }, 360)

        // normalize entities into nodes, merging with existing node state if possible
        const normalizedNodes: Array<Node<TurboNodeData>> = []
        const normalizedEdges: Array<Edge<TurboEdgeData>> = []

        initialEntities.forEach((entity, index) => {
            const {id = ''} = entity
            if (!normalizedNodes.find(x => x.id === id)) {
                // reuse existing node to preserve React Flow internal state
                const targetNode = nodes.find(x => x.id === id);
                if (targetNode) {
                    normalizedNodes.push({
                        ...targetNode, data: {
                            ...targetNode.data, entity
                        }
                    })
                } else {
                    normalizedNodes.push({
                        id, position: {x: 0, y: 0}, type: 'turbo', data: {
                            entity, layout: {
                                x: 0.01 * (index % 3), y: 0.01 * (index / 3), width: 0, height: 0
                            }
                        }
                    })
                }
            }
        })

        initialEntities.forEach(entity => {
            const {id = '', properties = [], relations = []} = entity
            const schemas = [...properties, ...relations]
            schemas.forEach(({aliasName, types}) => {
                types?.forEach(type => {
                    // create edges from referenced entity types
                    const target = initialEntities.find(x => x.name == type)
                    if (target?.id) {
                        const edgeId = `edge__${id}__${target.id}`
                        const targetEdge = normalizedEdges.find(x => x.id == edgeId);
                        if (targetEdge) {
                            // merge labels when multiple properties point to the same target
                            targetEdge.label = `${targetEdge.label}、${aliasName}`
                        } else {
                            normalizedEdges.push({
                                id: edgeId,
                                source: `${id}`,
                                target: target.id,
                                label: `${aliasName}`,
                            })
                        }
                    }
                })
            })
        })
        // run layout and push nodes/edges into React Flow
        setNodes(layoutNodes({nodes: normalizedNodes, edges: normalizedEdges}));
        setEdges([...normalizedEdges])

        return () => window.clearTimeout(animationTimer)
    }, [initialEntities]);

    // toggle slide class on nodes during the brief animation window
    useEffect(() => {
        setNodes(currentNodes => {
            return currentNodes.map(node => {
                const existing = node.className
                    ? node.className.split(' ').filter(x => x && x !== 'turbo-slide')
                    : []
                if (animateNodes) {
                    existing.push('turbo-slide')
                }
                const className = existing.join(' ')
                if (className === node.className) {
                    return node
                }
                return {
                    ...node,
                    className
                }
            })
        })
    }, [animateNodes, setNodes])

    // re-layout when DOM measurements are available
    useEffect(() => {
        let dirty = false
        const newNodes = nodes.map(node => {
            if (node.measured && (node.measured.width != node.data.layout?.width || node.measured.height != node.data.layout?.height)) {
                // update node dimensions so layout can avoid overlaps
                dirty = true
                return {
                    ...node, data: {
                        ...node.data,
                        layout: {
                            ...node.data.layout,
                            width: node.measured.width,
                            height: node.measured.height
                        }
                    }
                }
            }
            return node
        })

        if (dirty) {
            setNodes(layoutNodes({nodes: newNodes, edges}));
            setInitialized(true)
        }
    }, [nodes])

    // sync external selection prop into React Flow node selection state
    useEffect(() => {
        if (initialized && reactFlow) {
            nodes.forEach(node => {
                const selected = !!selection.find(x => x.id === node.id)
                if (node.selected !== selected) {
                    reactFlow.updateNode(node.id, {
                        selected
                    })
                }
            })
        }
    }, [initialized, reactFlow, selection])

    // fit view once after initialization
    useEffect(() => {
        if (initialized && reactFlow) {
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
                    connectionMode={ConnectionMode.Loose}
                    fitView={false}
                    nodeTypes={{
                        turbo: TurboNode,
                    }}
                    edgeTypes={{
                        turbo: TurboEdge,
                    }}
                    defaultEdgeOptions={{
                        type: 'turbo',
                        markerStart: 'edge-circle',
                        markerEnd: 'edge-arrowhead',
                    }}
                >
                    <Background/>
                    <Controls showInteractive={true} position="top-left">
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
                            <marker
                                id="edge-arrowhead"
                                className="react-flow__arrowhead"
                                markerWidth="16"
                                markerHeight="16"
                                viewBox="-10 -10 20 20"
                                markerUnits="strokeWidth"
                                orient="auto-start-reverse"
                                refX="0"
                                refY="0"
                            >
                                <polyline
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    fill="none"
                                    points="-5,-4 0,0 -5,4"
                                    style={{
                                        stroke: "#a853ba",
                                        strokeWidth: 1,
                                    }}
                                />
                            </marker>
                        </defs>
                    </svg>
                </ReactFlow>
            </div>
        </div>
    );
};

export const TurboFlowWithProvider = (props: TurboFlowProps) => {
    return (
        <ReactFlowProvider>
            <TurboFlow {...props} />
        </ReactFlowProvider>
    );
}

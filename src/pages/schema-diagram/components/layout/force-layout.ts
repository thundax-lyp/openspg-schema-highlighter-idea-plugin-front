import {Layout, LayoutEdge, LayoutGroup, LayoutNode} from "./types";
import * as d3 from "d3";
import {Simulation, SimulationLinkDatum, SimulationNodeDatum} from "d3-force";

interface NodeDatum extends SimulationNodeDatum {
    id: string
}

interface LinksDatum extends SimulationLinkDatum<NodeDatum> {
    source: number
    target: number
}

export const ForceLayout = (): Layout => {
    const normalizeLayoutGroup = (nodes: LayoutNode[], edges: LayoutEdge[]): [NodeDatum[], LinksDatum[]] => {
        const layoutNodes: NodeDatum[] = nodes.map(({id, x = 0, y = 0, width = 0, height = 0}) => ({
            id, x: x + width / 2, y: y + height / 2, width, height
        }))

        const layoutEdges: LinksDatum[] = edges
            .filter(({source, target}) => source.id != target.id)
            .map(({source, target}) => {
                return {
                    source: nodes.findIndex(x => x.id == source.id),
                    target: nodes.findIndex(x => x.id == target.id),
                }
            })
            .filter(({source, target}) => source >= 0 && target >= 0)
        return [layoutNodes, layoutEdges]
    }

    const run = (simulation: Simulation<NodeDatum, undefined>) => {
        const maxStep = 100;
        for (let step = 0; step < maxStep; step++) {
            simulation.tick(10)
            const activeNodes = simulation.nodes().filter(({vx = 0, vy = 0}) => {
                return Math.abs(vx) > 0.01 || Math.abs(vy) > 0.01
            })
            if (activeNodes.length == 0) {
                break;
            }
        }
        return simulation;
    }

    const layout = (param: LayoutGroup): Array<LayoutNode> => {
        const {nodes, edges} = param
        if (nodes.length == 0) {
            return []
        }

        const [layoutNodes, layoutEdges] = normalizeLayoutGroup(nodes, edges)

        const simulation = d3.forceSimulation(layoutNodes)
            .alpha(0.4)
            .alphaDecay(0)
            .force("charge", d3.forceManyBody()
                .strength(-30)
                .distanceMax(400)
                .theta(0.9)
            )
            .force("link", d3.forceLink(layoutEdges)
                .distance(50)
                .strength(0.7)
            )
            .force("collision", d3.forceCollide()
                .radius(({index = -1}) => {
                    if (index < 0 || index >= nodes.length) {
                        return 60;
                    }
                    const node = nodes[index]
                    const {width = 0, height = 0} = node || {}
                    return Math.sqrt(width ** 2 + height ** 2) / 2 + 60;
                })
                .strength(0.7)
            )
            .force("center", d3.forceCenter(300, 300))
            .force("y", d3.forceY().strength(0.5))
            .restart()

        return run(simulation)
            .nodes()
            .map(({id, x = 0, y = 0}) => {
                const node = nodes.find(x => x.id == id)
                const {width = 0, height = 0} = node || {}
                return Object.assign({}, node, {
                    x: x + width / 2,
                    y: y + height / 2,
                }) as LayoutNode
            })
            .filter(({id}) => !!id)
    }

    return {
        name: 'ForceLayout',
        layout
    }
}

import {Layout, LayoutEdge, LayoutGroup, LayoutNode} from "./types";
import * as d3 from "d3";
import {Simulation, SimulationLinkDatum, SimulationNodeDatum} from "d3-force";

const MANY_BODY_STRENGTH = -80;
const LINK_DISTANCE = 80;
const COLLISION_OFFSET = 40;

interface NodeDatum extends SimulationNodeDatum {
    id: string
}

interface LinksDatum extends SimulationLinkDatum<NodeDatum> {
    source: number
    target: number
}

export interface ForceLayoutProps {
    manyBodyStrength?: number
    linkDistance?: number
    collisionOffset?: number
}

export const ForceLayout = (props?: ForceLayoutProps): Layout => {
    const {
        manyBodyStrength = MANY_BODY_STRENGTH,
        linkDistance = LINK_DISTANCE,
        collisionOffset = COLLISION_OFFSET,
    } = props || {}

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
            simulation.tick(5)
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
            .force("charge", d3.forceManyBody().strength(manyBodyStrength))
            .force("center", d3.forceCenter(300, 300))
            .force("collision", d3.forceCollide(({id}) => {
                const node = nodes.find(x => x.id == id)
                const {width = 0, height = 0} = node || {}
                return Math.sqrt(width ** 2 + height ** 2) / 2 + collisionOffset
            }))
            .force("link", d3.forceLink(layoutEdges).distance(linkDistance))
            .force("y", d3.forceY().strength(0.2))
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

import React, { memo, ReactNode } from 'react';

import { Handle, type Node, type NodeProps, Position } from '@xyflow/react';
import { SchemaEntity } from "../types";
import { ConceptIcon, EntityIcon, EventIcon, FloatIcon, IntegerIcon, SchemaEntityIcon, StringIcon } from "./icons";

export type TurboNodeData = {
	entity?: SchemaEntity
	width?: number
	height?: number
};

const TYPE_ICONS: {
	[key: string]: ReactNode
} = {
	'ConceptType': <ConceptIcon/>,
	'EntityType': <EntityIcon/>,
	'EventType': <EventIcon/>,
	'Float': <FloatIcon/>,
	'Integer': <IntegerIcon/>,
	'String': <StringIcon/>,
}

const TurboNode = memo((props: NodeProps<Node<TurboNodeData>>) => {
	const {entity = {}} = props.data;
	const builtinTypes = (entity.types || []).filter(x => Object.keys(TYPE_ICONS).includes(x))

	return (
		<>
			<div className="clouds">
				{builtinTypes.map((type, idx) => {
					return <div className="cloud gradient" key={idx}>
						<div>
							{TYPE_ICONS[type]}
						</div>
					</div>
				})}
			</div>
			<div className="wrapper gradient">
				<div className="inner">
					<div className="body">
						<div className="icon">
							<SchemaEntityIcon/>
						</div>
						<div>
							<div className="title">{entity.name}</div>
							<div className="subtitle">{entity.aliasName}</div>
						</div>
					</div>
					<Handle type="target" position={Position.Left}/>
					<Handle type="source" position={Position.Right}/>
				</div>
			</div>
		</>
	);
});

export default TurboNode

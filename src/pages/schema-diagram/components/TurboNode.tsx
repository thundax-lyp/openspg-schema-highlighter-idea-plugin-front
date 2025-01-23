import React, { memo } from 'react';

import { Handle, type Node, type NodeProps, Position } from '@xyflow/react';
import FunctionIcon from "./FunctionIcon";
import { SchemaEntity } from "@/pages/schema-diagram/types";

export type TurboNodeData = {
	entity?: SchemaEntity
	width?: number
	height?: number
};

const TurboNode = memo((props: NodeProps<Node<TurboNodeData>>) => {
	const {entity = {}} = props.data;
	// console.log(entity.types)
	return (
		<>
			<div className="clouds">
				<div className="cloud gradient">
					<div>
						<FunctionIcon/>
					</div>
				</div>
				<div className="cloud gradient">
					<div>
						<FunctionIcon/>
					</div>
				</div>
				<div className="cloud gradient">
					<div>
						<FunctionIcon/>
					</div>
				</div>
			</div>
			<div className="wrapper gradient">
				<div className="inner">
					<div className="body">
						<div className="icon">
							<FunctionIcon/>
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

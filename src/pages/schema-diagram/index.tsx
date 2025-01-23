import React, { useEffect, useState } from 'react'

import Turbo from "./components/Turbo";

import service from "./service"

import { SchemaEntity } from "./types";
import styles from "./index.module.less"

const SchemaDiagramPage = () => {

	const [loading, setLoading] = useState(false)
	const [namespace, setNamespace] = useState<string>('')

	const [entities, setEntities] = useState<SchemaEntity[]>([])

	const requestSchema = () => {
		service.requestSchema().then(({namespace = {}, entities = []}) => {
			setNamespace(namespace.value || '')
			setEntities([...entities])
		})
	}

	useEffect(() => {
		requestSchema()
	}, [])

	return (
		<>
			<div style={{display: "none"}} aria-label="toolbar for interactive">
				<a id="schema-diagram-refresh-button" onClick={() => requestSchema()}>refresh</a>
			</div>
			<div className={styles.diagramContainer}>
				<Turbo initialEntities={entities}/>
			</div>
		</>
	)
}

export default SchemaDiagramPage

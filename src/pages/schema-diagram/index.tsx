import React, { useEffect, useState } from 'react'
import Turbo from "./components/Turbo";
import { SchemaEntity } from "./types";
import service from "./service"

import styles from "./index.module.less"
import { useDebounce } from "use-debounce";

const SchemaDiagramPage = () => {

	const [namespace, setNamespace] = useState<string>('')
	const [entities, setEntities] = useState<SchemaEntity[]>([])

	const [schemaVersion, setSchemaVersion] = useState<number>(0);
	const [debouncedSchemaVersion] = useDebounce(schemaVersion, 300);

	const requestSchema = () => {
		service.requestSchema().then(({namespace = {}, entities = []}) => {
			setNamespace(namespace.value || '')
			setEntities([...entities])
		})
	}

	useEffect(() => {
		requestSchema()
	}, [debouncedSchemaVersion]);

	useEffect(() => {
		requestSchema()
	}, [])

	return (
		<>
			<div style={{display: "none"}} aria-label="toolbar for interactive">
				<a id="schema-diagram-refresh-button" onClick={() => setSchemaVersion(new Date().getTime())}>refresh schema</a>
			</div>
			<div className={styles.diagramContainer}>
				<Turbo initialEntities={entities}/>
			</div>
		</>
	)
}

export default SchemaDiagramPage

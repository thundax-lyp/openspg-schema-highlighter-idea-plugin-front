import React, { useEffect, useState } from 'react'
import { useDebounce } from "use-debounce";
import Turbo from "./components/Turbo";
import { SchemaEntity } from "./types";
import service from "./service"

import styles from "./index.module.less"

const SchemaDiagramPage = () => {

	// const [namespace, setNamespace] = useState<string>('')
	const [entities, setEntities] = useState<SchemaEntity[]>([])

	const [schemaVersion, setSchemaVersion] = useState<number>(0);
	const [debouncedSchemaVersion] = useDebounce(schemaVersion, 500);

	const [cssStyle, setCssStyle] = useState<string>("");

	const requestSchema = () => {
		service.requestSchema().then(({entities = []}) => {
			// setNamespace(namespace.value || '')
			setEntities([...entities])
		})
	}

	const requestCss = () => {
		service.requestCss().then((x) => {
			setCssStyle(x)
		})
	}

	useEffect(() => {
		if (debouncedSchemaVersion > 0) {
			requestSchema()
		}
	}, [debouncedSchemaVersion]);

	useEffect(() => {
		requestSchema()
	}, [])

	return (
		<>
			<div style={{display: "none"}} aria-label="toolbar for interactive">
				<a id="schema-diagram-refresh-button" onClick={() => setSchemaVersion(new Date().getTime())}>refresh schema</a>
				<a id="schema-diagram-refresh-css-button" onClick={() => requestCss()}>refresh css</a>
			</div>
			<div className={styles.diagramContainer}>
				<Turbo initialEntities={entities}/>
			</div>
			<style>
				{cssStyle}
			</style>
		</>
	)
}

export default SchemaDiagramPage

import React, {useEffect, useState} from 'react'
import useDebounce from '@/hooks/use-debounce'
import {TurboFlowWithProvider} from './components'
import {SchemaEntity, SchemaNamespace} from './types'
import service from './service'

import styles from './index.module.less'

const SchemaDiagramPage = () => {
    const [namespace, setNamespace] = useState<SchemaNamespace>()
    const [entities, setEntities] = useState<SchemaEntity[]>([])
    const [selectedEntities, setSelectedEntities] = useState<SchemaEntity[]>()

    const [schemaVersion, setSchemaVersion] = useState<number>(0)
    const debouncedSchemaVersion = useDebounce<number>(schemaVersion, 500)
    const debouncedSelection = useDebounce<SchemaEntity[]>(selectedEntities || [], 300)

    const [cssStyle, setCssStyle] = useState<string>('')

    const requestSchema = () => {
        service.requestSchema().then(({namespace, entities = []}) => {
            setNamespace(namespace)
            setEntities([...entities])
        })
    }

    useEffect(() => {
        if (debouncedSchemaVersion > 0) {
            requestSchema()
        }
    }, [debouncedSchemaVersion])

    useEffect(() => {
        requestSchema()
    }, [])

    /**
     * Web Examples:
     * 1. refresh screen
     * ```js
     * window.postMessage({type: 'schema-diagram.refresh'})
     * ```
     * 2. refresh theme
     * ```js
     * window.postMessage({type: 'schema-diagram.refresh-theme'})
     * ```
     * 3. activate entity
     * ```js
     * window.postMessage({type: 'schema-diagram.activate-entity', payload: {name: 'Node1' }})
     * ```
     */
    useEffect(() => {
        const handler = (event: MessageEvent) => {
            const {type, payload = {}} = event.data
            if (type === 'schema-diagram.refresh') {
                setSchemaVersion(new Date().getTime())
            } else if (type === 'schema-diagram.refresh-theme') {
                service.requestCss().then((x) => {
                    setCssStyle(x)
                })
            } else if (type === 'schema-diagram.activate-entity') {
                const currentEntities = entities.filter((x) => x.name === payload.name)
                setSelectedEntities([...currentEntities])
            }
        }

        window.addEventListener('message', handler)
        return () => window.removeEventListener('message', handler)
    }, [])

    useEffect(() => {
        if (debouncedSelection.length > 0) {
            void service.activateEntities(debouncedSelection)
        }
    }, [debouncedSelection])

    return (
        <>
            <div className={styles.diagramContainer} data-name={namespace?.value}>
                <TurboFlowWithProvider
                    initialEntities={entities}
                    selection={selectedEntities}
                    onSelectionChange={(entities) => {
                        setSelectedEntities(entities)
                    }}
                />
            </div>
            <style>{cssStyle}</style>
        </>
    )
}

export default SchemaDiagramPage

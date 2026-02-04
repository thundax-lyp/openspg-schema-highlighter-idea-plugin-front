import React, { useEffect, useState } from 'react';
import useDebounce from '@/hooks/use-debounce';
import { TurboFlowWithProvider } from './components';
import { SchemaEntity, SchemaNamespace } from './types';
import service from './service';

import styles from './index.module.less';

const SchemaDiagramPage = () => {
    const [namespace, setNamespace] = useState<SchemaNamespace>();
    const [entities, setEntities] = useState<SchemaEntity[]>([]);
    const [selectedEntities, setSelectedEntities] = useState<SchemaEntity[]>();

    const [schemaVersion, setSchemaVersion] = useState<number>(0);
    const debouncedSchemaVersion = useDebounce<number>(schemaVersion, 500);
    const debouncedSelection = useDebounce<SchemaEntity[]>(selectedEntities || [], 300);

    const [cssStyle, setCssStyle] = useState<string>('');

    const requestSchema = () => {
        service.requestSchema().then(({ namespace, entities = [] }) => {
            setNamespace(namespace);
            setEntities([...entities]);
        });
    };

    useEffect(() => {
        if (debouncedSchemaVersion > 0) {
            requestSchema();
        }
    }, [debouncedSchemaVersion]);

    useEffect(() => {
        requestSchema();
    }, []);

    /**
     * Web Examples:
     * 1. refresh screen
     * ```js
     * window.postMessage({action: 'openspg.command', payload: {type: 'refresh-schema'}})
     * ```
     * 2. refresh theme
     * ```js
     * window.postMessage({action: 'openspg.command', payload: {type: 'refresh-theme'}})
     * ```
     * 3. activate entity
     * ```js
     * window.postMessage({action: 'openspg.command', payload: {type: 'activate-entity', name: 'Node1'}})
     * ```
     */
    useEffect(() => {
        const handler = (event: MessageEvent) => {
            const { action, payload = {} } = event.data;
            if (action === 'openspg.command') {
                const { type, args = {} } = payload;
                if (type === 'refresh-schema') {
                    setSchemaVersion(new Date().getTime());
                } else if (type === 'refresh-theme') {
                    service.requestCss().then((x) => {
                        setCssStyle(x);
                    });
                } else if (action === 'activate-entity') {
                    const currentEntities = entities.filter((x) => x.name === args.name);
                    setSelectedEntities([...currentEntities]);
                }
            }
        };

        window.addEventListener('message', handler);
        return () => window.removeEventListener('message', handler);
    }, [entities]);

    useEffect(() => {
        if (debouncedSelection.length > 0) {
            void service.activateEntities(debouncedSelection);
        }
    }, [debouncedSelection]);

    return (
        <>
            <div className={styles.diagramContainer} data-name={namespace?.value}>
                <TurboFlowWithProvider
                    initialEntities={entities}
                    selection={selectedEntities}
                    onSelectionChange={(entities) => {
                        setSelectedEntities(entities);
                    }}
                />
            </div>
            <style>{cssStyle}</style>
        </>
    );
};

export default SchemaDiagramPage;

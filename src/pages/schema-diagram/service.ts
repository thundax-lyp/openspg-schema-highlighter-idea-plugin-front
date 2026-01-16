import {Schema, SchemaEntity} from "./types"

const API_PREFIX = `/openspg/api`

interface ResponseWrapper {
    code: number
    message: string
    data: SchemaVO
}

interface SchemaVO {
    namespace?: NamespaceVO
    entities?: EntityVO[]
}

interface NamespaceVO {
    value?: string
}

interface EntityVO {
    id?: string
    name?: string
    aliasName?: string
    types?: string[]
    properties?: PropertyVO[]
}

interface PropertyVO {
    name?: string
    value?: string
    children?: EntityVO[]
}

const normalizeEntity = ({id, name, aliasName, types, properties}: EntityVO, index: number, prefix = ''): SchemaEntity => {
    const entity: SchemaEntity = {
        id: `${prefix}${id || index}`, name, aliasName, types
    }
    properties?.forEach(({name, value, children = []}) => {
        if (name === 'desc' && value) {
            entity.desc = `${value}`.trim()

        } else if (name === 'index' && value) {
            entity.index = `${value}`.trim()

        } else if (name === 'hypernymPredicate' && value) {
            entity.hypernymPredicate = `${value}`.trim()

        } else if (name === 'regular' && value) {
            entity.regular = `${value}`.trim()

        } else if (name === 'spreadable' && typeof value !== "undefined") {
            entity.spreadable = `${value}`.trim()

        } else if (name === 'autoRelate' && value) {
            entity.autoRelate = `${value}`.trim()

        } else if (name === 'properties' && children?.length > 0) {
            entity.properties = children.map((x, index) => normalizeEntity(x, index, `${entity.id}_property_`))

        } else if (name === 'relations' && children?.length > 0) {
            entity.relations = children.map((x, index) => normalizeEntity(x, index, `${entity.id}__relation_`))
        }
    })
    return entity;
}


export const requestSchema = async (): Promise<Schema> => {
    const emptySchema = {
        namespace: {}, entities: []
    }
    try {
        const response = await fetch(`${API_PREFIX}/schema/fetch`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })

        if (!response.ok) {
            return Promise.resolve(emptySchema)
        }

        const responseBody: ResponseWrapper = await response.json()

        const {namespace = {}, entities = []} = responseBody?.data || {}
        return Promise.resolve({
            namespace: {
                value: namespace.value
            },
            entities: entities.map((x, index) => normalizeEntity(x, index, 'schema-')).filter(x => x)
        })

    } catch (error) {
        console.error('requestSchema failed', error)
        return Promise.resolve(emptySchema)
    }
}

export const activateEntities = async (entities: SchemaEntity[]): Promise<boolean> => {
    try {
        const response = await fetch(`${API_PREFIX}/schema/focus`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entities.map(({id}) => ({id})))
        })

        if (!response.ok) {
            return Promise.resolve(false)
        }

        const responseBody: ResponseWrapper = await response.json()

        return Promise.resolve(responseBody.code === 0)

    } catch (error) {
        console.error('activateEntities failed', error)
        return Promise.resolve(false)
    }
}

export const requestCss = async (): Promise<string> => {
    try {
        const response = await fetch(`/schema-theme.css`)

        if (!response.ok) {
            return Promise.resolve('')
        }

        const responseBody: string = await response.text()

        return Promise.resolve(responseBody)

    } catch (error) {
        console.error('requestCss failed', error)
        return Promise.resolve('')
    }
}

export default {
    requestSchema,
    activateEntities,
    requestCss,
}

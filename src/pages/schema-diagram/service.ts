import { Schema, SchemaEntity } from "./types"

const API_PREFIX = `/openspg/api`

interface ResponseWrapper {
	code: number
	message: string
	data: SchemaResponse
}

interface SchemaResponse {
	namespace?: NamespaceResponse
	entities?: EntityResponse[]
}

interface NamespaceResponse {
	value?: string
}

interface EntityResponse {
	name?: string
	aliasName?: string
	types?: string[]
	properties?: PropertyResponse[]
}

interface PropertyResponse {
	name?: string
	value?: string
	children?: EntityResponse[]
}

const normalizeEntityResponse = ({name, aliasName, types, properties}: EntityResponse, index: number, prefix = ''): SchemaEntity => {
	const entity: SchemaEntity = {
		id: `${prefix}${index}`, name, aliasName, types
	}
	properties?.forEach(({name, value, children = []}) => {
		if (name === 'desc' && value) {
			entity.desc = value.trim()

		} else if (name === 'index' && value) {
			entity.index = value.trim()

		} else if (name === 'hypernymPredicate' && value) {
			entity.hypernymPredicate = value.trim()

		} else if (name === 'regular' && value) {
			entity.regular = value.trim()

		} else if (name === 'spreadable' && typeof value !== "undefined") {
			entity.spreadable = value.trim()

		} else if (name === 'autoRelate' && value) {
			entity.autoRelate = value.trim()

		} else if (name === 'properties' && children?.length > 0) {
			entity.properties = children.map((x, index) => normalizeEntityResponse(x, index, `${entity.id}_`))

		} else if (name === 'relations' && children?.length > 0) {
			entity.relations = children.map((x, index) => normalizeEntityResponse(x, index, `${entity.id}_`))
		}
	})
	return entity;
}


export const requestSchema = async (): Promise<Schema> => {
	const response = await fetch(`${API_PREFIX}/schema/fetch`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({})
	})

	const responseBody: ResponseWrapper = await response.json()
	const {namespace = {}, entities = []} = responseBody.data
	return Promise.resolve({
		namespace: {
			value: namespace.value
		},
		entities: entities.map((x, index) => normalizeEntityResponse(x, index)).filter(x => x)
	})
}

export default {
	requestSchema,
}

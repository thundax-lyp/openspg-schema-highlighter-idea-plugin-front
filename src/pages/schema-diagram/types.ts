export interface Schema {
    namespace?: SchemaNamespace
    entities?: Array<SchemaEntity>
}

export interface SchemaNamespace {
    value?: string
}

export interface SchemaEntity {
    id?: string
    name?: string
    aliasName?: string
    types?: string[]

    desc?: string
    index?: string
    properties?: Array<SchemaEntity>
    relations?: Array<SchemaEntity>
    hypernymPredicate?: string
    regular?: string
    spreadable?: string
    autoRelate?: string
}

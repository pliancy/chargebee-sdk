// Make Chargebee types more easily accessible
export * from 'chargebee-typescript/lib/resources'
export * from 'chargebee-typescript/lib/resources/plan'
export * from 'chargebee-typescript/lib/list_result'
export * from 'chargebee-typescript/lib/result'
export * from 'chargebee-typescript/lib/resources/quote'
export * from 'chargebee-typescript/lib/resources'

export interface ChargebeeConfig {
    site: string
    api_key: string
}

export interface FilterParams {
    is?: string | number | boolean
    is_not?: string | number | boolean
    in?: Array<string>
    not_in?: Array<string>
    is_present?: boolean
    starts_with?: string
    gt?: number
    gte?: number
    lt?: number
    lte?: number
    between?: [number, number]
    on?: number
    before?: number
    after?: number
}

export type DocumentFilterParams = { [index: string]: FilterParams }

export interface PartialAddon {
    id: string
    quantity: number
}

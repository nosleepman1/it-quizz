import type { CategoryResponse } from "./category"
import type { TopicResponse } from "./topic"



export interface SubcategoryResponse {
    id: number
    name : string
    category_id: number
    slug : string
    description : string
    is_active : boolean
    category : CategoryResponse
    topics : TopicResponse[]

}

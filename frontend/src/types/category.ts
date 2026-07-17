import type { SubcategoryResponse } from "./SubCategory"
import type { ThemeResponse } from "./theme"

export interface CategoryResponse {
    id : string
    name: string
    theme_id: string
    slug: string
    description: string
    is_active: boolean
    icon: string
    created_at: string
    updated_at: string
    theme: ThemeResponse
    subcategories: SubcategoryResponse[]
}


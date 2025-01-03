import type {CategoryResponse} from '@/types/category'

export interface ThemeResponse {
    id : string
    name: string
    description: string
    is_active: boolean
    categories: CategoryResponse[]
}
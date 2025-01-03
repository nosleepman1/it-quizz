import type { QuestionResponse } from "./question"
import type { SubcategoryResponse } from "./SubCategory"


export interface TopicResponse {
    id : number
    name : string
    subcategory_id : number
    slug : string
    description : string
    is_active : boolean
    icon : string
    subcategory : SubcategoryResponse
    questions : QuestionResponse[]
}

/**
 *  return [
            'id' => $this->id,
            'name' => $this->name,
            'subcategory_id' => $this->subcategory_id,
            'slug' => $this->slug,
            'description' => $this->description,
            'is_active' => (bool) $this->is_active,
            'icon' => $this->icon,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'subcategory' => new SubcategoryResource($this->whenLoaded('subcategory')),
            'questions' => QuestionResource::collection($this->whenLoaded('questions')),
        ];
 */
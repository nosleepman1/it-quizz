import type { ResponseResponse } from "./repsonse"


export interface QuestionResponse {
    id: string
    question : string
    difficulty : string
    responses : ResponseResponse[]
}
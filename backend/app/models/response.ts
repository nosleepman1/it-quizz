import { ResponseSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Question from './question.ts'

export default class Response extends ResponseSchema {
    @belongsTo(() => Question)
    declare question: BelongsTo<typeof Question>
}
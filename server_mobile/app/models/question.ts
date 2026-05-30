import { QuestionSchema } from '#database/schema'
import { hasMany, belongsTo } from '@adonisjs/lucid/orm'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import Response from './response.ts'
import Topic from './topic.ts'

export default class Question extends QuestionSchema {
    @hasMany(() => Response)
    declare responses: HasMany<typeof Response>

    @belongsTo(() => Topic)
    declare topic: BelongsTo<typeof Topic>
}
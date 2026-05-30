import { TopicSchema } from '#database/schema'
import { hasMany, belongsTo } from '@adonisjs/lucid/orm'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import Question from './question.ts'
import SubCategory from './sub_category.ts'

export default class Topic extends TopicSchema {
    @hasMany(() => Question)
    declare questions: HasMany<typeof Question>

    @belongsTo(() => SubCategory)
    declare subCategory: BelongsTo<typeof SubCategory>
}   
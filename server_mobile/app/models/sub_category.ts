import { SubCategorySchema } from '#database/schema'
import { hasMany, belongsTo } from '@adonisjs/lucid/orm'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import Topic from './topic.ts'
import Category from './category.ts'

export default class SubCategory extends SubCategorySchema {
    @hasMany(() => Topic)
    declare topics: HasMany<typeof Topic>

    @belongsTo(() => Category)
    declare category: BelongsTo<typeof Category>
}   
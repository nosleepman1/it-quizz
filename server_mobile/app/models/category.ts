import { CategorySchema } from '#database/schema'
import { hasMany, belongsTo } from '@adonisjs/lucid/orm'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import SubCategory from './sub_category.ts'
import Theme from './theme.ts'

export default class Category extends CategorySchema {
    @hasMany(() => SubCategory)
    declare subCategories: HasMany<typeof SubCategory>

    @belongsTo(() => Theme)
    declare theme: BelongsTo<typeof Theme>
}
import { ThemeSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Category from './category.ts'

export default class Theme extends ThemeSchema {
    @hasMany(() => Category)
    declare categories: HasMany<typeof Category>
}
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'topics'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('sub_category_id').references('id').inTable('sub_categories').onDelete('cascade')
      table.string('name', 255).notNullable()
      table.string('slug', 255).nullable()
      table.text('description', 'longtext').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
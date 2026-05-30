import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'questions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('topic_id').references('id').inTable('topics').onDelete('cascade')
      table.text('question', 'longtext').notNullable()
      table.text('explanation', 'longtext').nullable()
      table.enum('difficulty', ['easy', 'medium', 'hard']).defaultTo('easy')
      table.enum('type', ['choice', 'multiple', 'true_false']).defaultTo('choice')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
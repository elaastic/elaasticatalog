import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'elaastic_resources'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title', 255).notNullable()
      table.string('author', 255)
      table.text('link').notNullable()
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.boolean('public').defaultTo(false)
      table.string('elaastic_uuid', 255).notNullable()
      table.timestamp('elaastic_updated_at', { useTz: true })
      table.text('description').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

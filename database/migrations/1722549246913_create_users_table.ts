import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Subscribers extends BaseSchema {
  protected tableName = 'subscribers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('invoice_number').notNullable().unique()
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('address').notNullable()
      table.string('customer_id').notNullable().unique()
      table.string('service_line').notNullable()
      table.timestamps(true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

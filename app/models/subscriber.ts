import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Subscriber extends BaseModel {
  @column({ isPrimary: true })
  declare invoice_number: number

  @column()
  declare first_name: string

  @column()
  declare last_name: string

  @column()
  declare address: string

  @column()
  declare customer_id: string

  @column()
  declare service_line: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}

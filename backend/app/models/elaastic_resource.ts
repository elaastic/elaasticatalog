import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class ElaasticResource extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare author: string

  @column()
  declare link: string

  @column()
  declare public: boolean

  @column()
  declare elaasticUUID: string

  @column.dateTime()
  declare elaasticUpdatedAt: DateTime

  @column()
  declare description: string | null
}

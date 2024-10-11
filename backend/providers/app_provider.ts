import ElaasticResourcesService from '#services/elaastic_resources_service'
import env from '#start/env'
import { ApplicationService } from '@adonisjs/core/types'
import { AMQPClient } from '@cloudamqp/amqp-client'

export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  async start() {
    try {
      const amqp = new AMQPClient(`${env.get('AMQP_HOST')}`)
      const conn = await amqp.connect()
      const ch = await conn.channel()
      const q = await ch.queue(env.get('RABBITMQ_ELAASTIC_QUEUE'))
      const e = new ElaasticResourcesService()

      await q.subscribe({ noAck: true }, async (msg) => {
        try {
          if (!msg.body) {
            return
          } else {
            // Convert the Uint8Array to a string using TextDecoder
            const messageString = new TextDecoder().decode(msg.body)
            await e.handleRabbitMessage(messageString)
          }
        } catch (error) {
          console.error('ERROR while processing message:', error)
        }
      })
    } catch (error) {
      console.error('ERROR during AMQP setup:', error)
      error.connection.close()
    }
  }
}

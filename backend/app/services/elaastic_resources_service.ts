import ElaasticResource from '#models/elaastic_resource'
import { DateTime } from 'luxon'

export interface ElaasticMessage {
  action: 'publicize' | 'privatize' | 'delete'
  data: PublicizeResourceInput | PrivatizeResourceInput
}

export interface PrivatizeResourceInput {
  uuid: string
}

export interface PublicizeResourceInput {
  title: string
  owner: string
  last_updated: string
  uuid: string
  link: string
  description?: string
}

export default class ElaasticResourcesService {
  async handleRabbitMessage(message: string) {
    try {
      const parsedMessage = JSON.parse(message)
      const { action, data } = parsedMessage

      if (action === 'publicize') {
        await this.publicizeResource(data)
      } else if (action === 'privatize') {
        await this.privatizeResource(data.uuid)
      } else if (action === 'delete') {
        await this.deleteResource(data.uuid)
      }
    } catch (error) {
      console.error('Failed to handle RabbitMQ message:', error)
    }
  }

  async publicizeResource(resourceData: PublicizeResourceInput) {
    const { title, owner, last_updated, uuid, link, description } = resourceData
    try {
      const resource = await ElaasticResource.query().where('elaastic_uuid', uuid).first()

      // TODO: elaastic is sending last_updated in CEST/CET timezone, we need to convert it to UTC
      const inputZone = 'Europe/Berlin'

      // last_updated will arrive with CEST or CET timezone, so we need to convert it to UTC
      let elaasticUpdatedAt = DateTime.fromSQL(last_updated, { zone: inputZone }).toUTC()

      if (resource) {
        resource.title = title
        resource.author = owner
        resource.elaasticUpdatedAt = elaasticUpdatedAt
        resource.public = true
        resource.link = link
        resource.description = description || null

        await resource.save()
      } else {
        await ElaasticResource.create({
          title,
          link,
          description,
          elaasticUpdatedAt,
          elaasticUUID: uuid,
          author: owner,
          public: true,
        })
      }
    } catch (error) {
      console.error('Failed to publicize resource:', error)
    }
  }

  async privatizeResource(uuid: string) {
    try {
      const resource = await ElaasticResource.query().where('elaastic_uuid', uuid).first()

      if (resource) {
        resource.public = false
        await resource.save()
      } else {
        console.error(`Resource with globalId ${uuid} not found.`)
      }
    } catch (error) {
      console.error('Failed to privatize resource:', error)
    }
  }

  async deleteResource(uuid: string) {
    try {
      const resource = await ElaasticResource.query().where('elaastic_uuid', uuid).first()

      if (resource) {
        await resource.delete()
      } else {
        console.error(`Resource with globalId ${uuid} not found.`)
      }
    } catch (error) {
      console.error('Failed to delete resource:', error)
    }
  }
}

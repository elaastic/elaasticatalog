import ElaasticResource from '#models/elaastic_resource'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'
import { DateTime } from 'luxon'

export default class ElaasticResourceSeeder extends BaseSeeder {
  public async run() {
    const resources = Array.from({ length: 100 }, () => ({
      title: faker.lorem.sentence(), // Random title
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
      author: faker.person.fullName(), // Random name
      link: faker.internet.url(), // Random URL
      public: faker.datatype.boolean(), // Random boolean
      elaasticUUID: faker.string.uuid(), // Random UUID
      elaasticUpdatedAt: DateTime.now(), // Current time
    }))

    // Insert the generated resources into the database
    await ElaasticResource.createMany(resources)
  }
}

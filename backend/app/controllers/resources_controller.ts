import type { HttpContext } from '@adonisjs/core/http'
import ElaasticResource from '#models/elaastic_resource'
import ForgeResourcesService from '#services/forge_resources_service'
import { Resource, Source } from '#models/resource'
// import { ForgeResource } from '#models/forge_resource'
import { convertToResource } from '../utils/convert.js'
import { inject } from '@adonisjs/core'

// TODO : Make resources controller gather all types of resources (Forge, Elaastic)

@inject()
export default class ResourcesController {
  constructor(protected forgeService: ForgeResourcesService) {}

  async index({ request, response }: HttpContext) {
    try {
      const page = request.input('page', 1)
      const perPage = request.input('perPage', 30)
      const searchQuery = request.input('query', '')

      /*
      // const result = await this.forgeService.getProjects(page, perPage, searchQuery)
      // const forgeResources: ForgeResource[] = result.data
      // Convert Forge and Elaastic resources to resources
      const resources: Resource[] = forgeResources.map((project) =>
        convertToResource(project, Source.FORGE)
      )
      */
      const elaastic = await ElaasticResource.query()
        .where('public', true)
        .where((q) => {
          q.where('title', 'LIKE', `%${searchQuery}%`).orWhere('author', 'LIKE', `%${searchQuery}%`)
        })
        .paginate(page, perPage)

      //Convert elaastic resources to resources
      const resources: Resource[] = elaastic
        .all()
        .map((resource) => convertToResource(resource, Source.ELAASTIC))

      // Construct the response
      const paginationInfo = {
        total: elaastic.total,
      }

      return response.json({ data: resources, paginationInfo })
    } catch (error) {
      return response.status(500).json({ message: error.message })
    }
  }

  // async show({ params, response }: HttpContext) {
  //   const resource = await ElaasticResource.findOrFail(params.id)
  //   return response.json(resource)
  // }
}

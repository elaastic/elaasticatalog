import ElaasticResource from '#models/elaastic_resource'
import { ForgeResource } from '#models/forge_resource'
import { Resource, Source, Tag } from '#models/resource'

export const convertToResource = (
  forgeResource: ForgeResource | ElaasticResource,
  source: Source
): Resource => {
  switch (source) {
    case Source.FORGE:
      return convertForgeResource(forgeResource as ForgeResource)
    case Source.ELAASTIC:
      return convertElaasticResource(forgeResource as ElaasticResource)
    default:
      throw new Error('Unknown source')
  }
}

const convertForgeResource = (forgeResource: ForgeResource): Resource => {
  const tags: Tag[] = forgeResource.tag_list || [] // Ensure default value

  return {
    id: forgeResource.id,
    title: forgeResource.name,
    description: forgeResource.description,
    lastUpdated: new Date(forgeResource.last_activity_at),
    author: forgeResource.namespace.name,
    link: forgeResource.web_url,
    tags,
    source: Source.FORGE,
  }
}

const convertElaasticResource = (elaasticResource: ElaasticResource): Resource => {
  const resource: Resource = {
    id: elaasticResource.id,
    title: elaasticResource.title,
    author: elaasticResource.author,
    lastUpdated: elaasticResource.elaasticUpdatedAt.toJSDate(),
    link: elaasticResource.link,
    source: Source.ELAASTIC,
  }

  // Conditionally add 'description' only if it's not null or undefined
  if (elaasticResource.description && elaasticResource.description !== 'null') {
    resource.description = elaasticResource.description
  }

  return resource
}

import ky from 'ky';
import {ForgeResource} from "#models/forge_resource";

interface ForgeReturnType {
  data: ForgeResource[],
  paginationInfo: {
    total: number | null,
  }
}

export default class ForgeResourcesService {
  private kyInstance: typeof ky

  constructor() {
    this.kyInstance = ky.create({
      prefixUrl: 'https://forge.apps.education.fr/',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  async getProjects(page = 1, perPage = 30, searchQuery = ''): Promise<ForgeReturnType> {
    try {
      const response = await this.kyInstance.get('api/v4/projects', {
        searchParams: {
          page: page,
          per_page: perPage,
          search: searchQuery,
          simple: 'true',
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data : ForgeResource[] = await response.json();
      const headers = response.headers;

      return {
        data,
        paginationInfo: {
          total: Number(headers.get('x-total')),
        },
      }
    } catch (error) {
      const errorJson = await error.response.json();
      throw new Error(errorJson.message || 'Failed to fetch projects');
    }
  }
}

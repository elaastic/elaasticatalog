import router from '@adonisjs/core/services/router'
const resourcesController = () => import('#controllers/resources_controller')

router
  .group(() => {
    router.get('/resources', [resourcesController, 'index'])
    // router.get('/resources/:id', [resourcesController, 'show'])
  })
  .prefix('api/v1')

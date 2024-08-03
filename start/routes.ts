/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const PdfGenController = () => import('#controllers/pdf_gens_controller.ts')

router.get('/', async () => {
  return {
    hello: 'worlds',
  }
})

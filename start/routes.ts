/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const pdfGensController = () => import('#controllers/pdf_gens_controller')

router.get('/', async () => {
  return {
    hello: 'worlds',
  }
})

router.get('/docx-template', [pdfGensController, 'createDocxTemplate'])
router.get('/docx-template2', [pdfGensController, 'createDocxTemplate2'])

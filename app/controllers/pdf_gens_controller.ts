import type { HttpContext } from '@adonisjs/core/http'
import { docxtemplates, convertDocxToPdf } from '#services/pdfgenerator_service'
import Subscriber from '#models/subscriber'
import { helloWorld, conditionalTest, loopTest } from '../data/template_data.js'

export default class PdfGensController {
  /* async docxtemplater({ response }: HttpContext) {
    // Take data from database
    const subscriber = Subscriber.query()
    const data = await subscriber.from('subscribers').where('invoice_number', 60000).firstOrFail()

    // Use the data here
    const outPutFile = docxtemplaterToPdf({
      invoice_number: data.invoice_number,
      first_name: data.first_name,
      last_name: data.last_name,
      address: data.address,
      customer_id: data.customer_id,
      service_line: data.service_line,
    })

    response.header(
      'Content-type',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    )
    response.header('Content-disposition', 'attachment; filename=output.docx')
    response.send(outPutFile)
  } */

  async createDocxTemplate({ response }: HttpContext) {
    // Take data from database
    const subscriber = Subscriber.query()
    const data = await subscriber.from('subscribers').where('invoice_number', 60000).firstOrFail()
    try {
      const placeholders = {
        invoice_number: data.$attributes.invoice_number,
        first_name: data.$attributes.first_name,
        last_name: data.$attributes.last_name,
        address: data.$attributes.address,
        customer_id: data.$attributes.customer_id,
        service_line: data.$attributes.service_line,
      }
      const outputPath = await docxtemplates(placeholders, 'input.docx')
      response.download(outputPath)
    } catch (error) {
      response.status(500).send(`${error} Error generating document`)
    }
  }

  async createDocxTemplate2({ request, response }: HttpContext) {
    const query = request.qs()
    let placeholder: any
    let file: string

    switch (query.exampleType) {
      case 'hello-world':
        placeholder = helloWorld
        file = 'hello-world.docx'
        break
      case 'if-else':
        placeholder = conditionalTest
        file = 'conditional.docx'
        break
      case 'loop':
        placeholder = loopTest
        file = 'loop.docx'
        break
      default:
        return response.status(400).send('Invalid exampleType provided')
    }

    try {
      const docxOutputPath = await docxtemplates(placeholder, file)
      const pdfOutputPath = await convertDocxToPdf(docxOutputPath)
      
      // Send both files as attachments
      response.attachment(docxOutputPath)
      response.attachment(pdfOutputPath)
      
      // End the response to send the files
      response.send('')
    }  catch (error) {
      response.status(500).send(`${error} Error generating document`)
    }
  }
}

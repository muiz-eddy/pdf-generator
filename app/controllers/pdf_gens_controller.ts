import type { HttpContext } from '@adonisjs/core/http'
import { docxtemplaterToPdf, docxtemplates } from '#services/pdfgenerator_service'
import Subscriber from '#models/subscriber'

export default class PdfGensController {
  async docxtemplater({ response }: HttpContext) {
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
  }

  async createDocxTemplate({ response }: HttpContext) {
    // Take data from database
    const subscriber = Subscriber.query()
    const data = await subscriber.from('subscribers').where('invoice_number', 60000).firstOrFail()
    console.log(data.$attributes.invoice_number)
    try {
      const placeholders = {
        invoice_number: data.$attributes.invoice_number,
        first_name: data.$attributes.first_name,
        last_name: data.$attributes.last_name,
        address: data.$attributes.address,
        customer_id: data.$attributes.customer_id,
        service_line: data.$attributes.service_line,
      }
      const outputPath = await docxtemplates(placeholders)
      response.download(outputPath)
    } catch (error) {
      response.status(500).send(`${error} Error generating document`)
    }
  }

  async createDocxTemplate2({ response }: HttpContext) {
    // Take data from database

    try {
      const placeholders = {
        invoice_number: 10,
        first_name: 'test',
        last_name: 'test',
        address: 'test',
        customer_id: 'test',
        service_line: 'test',
      }
      const outputPath = await docxtemplates(placeholders)
      response.download(outputPath)
    } catch (error) {
      response.status(500).send(`${error} Error generating document`)
    }
  }
}

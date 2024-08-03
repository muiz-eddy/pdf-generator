import type { HttpContext } from '@adonisjs/core/http'
import { docxtemplaterToPdf } from '#services/pdfgenerator_service'
import Subscriber from '#models/subscriber'

export default class PdfGensController {
  async docxtemplater({ response }: HttpContext) {
    // Take data from database
    const subscriber = Subscriber.query()
    const data = await subscriber
      .from('Dummy_Subscriber')
      .where('invoice_number', 600000)
      .firstOrFail()

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
}

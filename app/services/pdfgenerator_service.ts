import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import fs from 'fs'
import path from 'path'
import { createReport } from 'docx-templates'
import { fileURLToPath } from 'url'

export async function docxtemplaterToPdf({
  invoice_number,
  first_name,
  last_name,
  address,
  customer_id,
  service_line,
}: documentPlaceHolder) {
  // Read input docx file
  const content = fs.readFileSync(path.resolve('./', 'input.docx'), 'binary')

  // Unzip the content of the file
  const zip = new PizZip(content)

  const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true })

  doc.renderAsync({
    invoice_number: invoice_number,
    first_name: first_name,
    last_name: last_name,
    address: address,
    customer_id: customer_id,
    service_line: service_line,
  })

  const buf = doc.getZip().generate({
    type: 'nodebuffer',
    compression: 'DEFLATE',
  })

  return fs.writeFileSync(path.resolve('./', 'output.docx'), buf)
}

export async function docxtemplates(placeholders?: documentPlaceHolder): Promise<string> {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const templatePath = path.resolve(__dirname, '../../public/assets/input.docx')
  const outputPath = path.resolve(__dirname, '../../public/assets/document.docx')

  // Read the template file
  const template = fs.readFileSync(templatePath)

  // Log the placeholders
  console.log(placeholders)

  try {
    // Generate the report
    const report = await createReport({
      template,
      data: placeholders,
      cmdDelimiter: ['{', '}'],
    })

    // Log the report buffer size to ensure it was created
    console.log(`Report generated: ${report.length} bytes`)

    // Write the report to a file
    fs.writeFileSync(outputPath, report)

    return outputPath
  } catch (error) {
    console.error('Error generating the DOCX file:', error)
    throw error
  }
}

/* export async function easyTemplateX({
  invoice_number,
  first_name,
  last_name,
  address,
  customer_id,
  service_line,
}: documentPlaceHolder) {
  const content = fs.readFileSync(path.resolve('input.docx'))
  const data = {
    posts: [
      {
        invoice_number: invoice_number,
        first_name: first_name,
        last_name: last_name,
        address: address,
        customer_id: customer_id,
        service_line: service_line,
      },
    ],
  }
  const handler = new TemplateHandler()
  const doc = await handler.process(content, data)

  fs.writeFileSync('output.docx', doc)
} */

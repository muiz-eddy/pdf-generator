// import Docxtemplater from 'docxtemplater'
// import PizZip from 'pizzip'
import fs from 'node:fs'
import path from 'node:path'
import { createReport } from 'docx-templates'
import { fileURLToPath } from 'node:url'

export async function docxtemplates(
  placeholders: any,
  file: string
): Promise<string> {
  const fileName = fileURLToPath(import.meta.url)
  const dirName = path.dirname(fileName)
  const templatePath = path.resolve(dirName, `../../templates/${file}`)
  const outputPath = path.resolve(dirName, '../../templates/document.docx')

  // Read the template file
  const template = fs.readFileSync(templatePath)

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

/* export async function docxtemplaterToPdf({
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
} */

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

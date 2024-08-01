import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Subscriber from '#models/subscriber'

export default class extends BaseSeeder {
  async run() {
    const startInvoiceNumber = 60000
    const numberOfSubscribers = 50 // Define the number of subscribers you want to create

    const subscribers = []

    for (let i = 0; i < numberOfSubscribers; i++) {
      subscribers.push({
        invoice_number: startInvoiceNumber + i,
        first_name: `FirstName${i}`,
        last_name: `LastName${i}`,
        address: `Address${i}`,
        customer_id: `CustomerId${i}`,
        service_line: `ServiceLine${i}`,
      })
    }

    await Subscriber.createMany(subscribers)
  }
}

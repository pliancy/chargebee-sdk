import { ChargeBee } from './chargebee'

describe('ChargeBee', () => {
    let chargebee: ChargeBee

    beforeEach(() => {
        chargebee = new ChargeBee({ site: 'test', api_key: 'apiKey' })
    })

    it('fails to get a customer by id', async () => {
        const error = new Error('No dice')
        jest.spyOn(chargebee.customer, 'retrieve').mockReturnValue({
            request: (cb: Function) => cb(error, null),
        } as never)
        await expect(chargebee.getCustomerById('CUSTOMER_ID')).rejects.toEqual(error)
    })

    it('gets a customer by id', async () => {
        const customer = { customer: { id: 'CUSTOMER_ID' } }
        jest.spyOn(chargebee.customer, 'retrieve').mockReturnValue({
            request: (cb: Function) => cb(null, { customer }),
        } as never)
        await expect(chargebee.getCustomerById('CUSTOMER_ID')).resolves.toEqual(customer)
    })

    it('fails to get all subscriptions', async () => {
        const error = new Error('No dice')
        jest.spyOn(chargebee.subscription, 'list').mockReturnValue({
            request: (cb: Function) => cb(error, null),
        } as never)
        await expect(chargebee.getSubscriptions()).rejects.toEqual(error)
    })

    it('gets all subscriptions', async () => {
        const subscription = { subscription: { id: 'SUB_ID' } }
        jest.spyOn(chargebee.subscription, 'list').mockReturnValue({
            request: (cb: Function) => cb(null, { list: [{ subscription }] }),
        } as never)
        await expect(chargebee.getSubscriptions()).resolves.toEqual([subscription])
    })

    it('fails to get subscriptions by customerId', async () => {
        const error = new Error('No dice')
        jest.spyOn(chargebee.subscription, 'subscriptions_for_customer').mockReturnValue({
            request: (cb: Function) => cb(error, null),
        } as never)
        await expect(chargebee.getSubscriptionsByCustomerId('customerId')).rejects.toEqual(error)
    })

    it('gets subscriptions by customerId', async () => {
        const subscription = { subscription: { id: 'SUB_ID' } }
        jest.spyOn(chargebee.subscription, 'subscriptions_for_customer').mockReturnValue({
            request: (cb: Function) => cb(null, { list: [{ subscription }] }),
        } as never)
        await expect(chargebee.getSubscriptionsByCustomerId('customerId')).resolves.toEqual([
            subscription,
        ])
        expect(chargebee.subscription.subscriptions_for_customer).toHaveBeenCalledWith(
            'customerId',
            {},
        )
    })

    it('gets subscriptions by customerId with extra filters', async () => {
        const subscription = { subscription: { id: 'SUB_ID' } }
        jest.spyOn(chargebee.subscription, 'subscriptions_for_customer').mockReturnValue({
            request: (cb: Function) => cb(null, { list: [{ subscription }] }),
        } as never)
        await expect(
            chargebee.getSubscriptionsByCustomerId('customerId', { id: { is: 'SUB_ID' } }),
        ).resolves.toEqual([subscription])
        expect(chargebee.subscription.subscriptions_for_customer).toHaveBeenCalledWith(
            'customerId',
            { id: { is: 'SUB_ID' } },
        )
    })

    it('fails to update a subscription', async () => {
        const error = new Error('No dice')
        jest.spyOn(chargebee.subscription, 'update_for_items').mockReturnValue({
            request: (cb: Function) => cb(error, null),
        } as never)
        await expect(chargebee.updateSubscription('subscriptionId', {})).rejects.toEqual(error)
    })

    it('updates a subscription', async () => {
        const subscription = { subscription: { id: 'SUB_ID' } }
        jest.spyOn(chargebee.subscription, 'update_for_items').mockReturnValue({
            request: (cb: Function) => cb(null, { list: [{ subscription }] }),
        } as never)
        await expect(chargebee.updateSubscription('subscriptionId', {})).resolves
        expect(chargebee.subscription.update_for_items).toHaveBeenCalledWith('subscriptionId', {})
    })

    it('fails to get an invoice', async () => {
        const error = new Error('No dice')
        jest.spyOn(chargebee.invoice, 'retrieve').mockReturnValue({
            request: (cb: Function) => cb(error, null),
        } as never)
        await expect(chargebee.getInvoiceById('invoiceId')).rejects.toEqual(error)
    })

    it('gets an invoice', async () => {
        const invoice = { invoice: { id: 'invoiceId' } }
        jest.spyOn(chargebee.invoice, 'retrieve').mockReturnValue({
            request: (cb: Function) => cb(null, invoice),
        } as never)
        await expect(chargebee.getInvoiceById('invoiceId')).resolves.toEqual(invoice.invoice)
    })
})

import { ChargeBee as CChargeBee } from 'chargebee-typescript'
import {
    ListResult,
    Customer,
    Subscription,
    ChargebeeConfig,
    DocumentFilterParams,
    Result,
    Invoice,
} from './chargebee.types'

export class ChargeBee extends CChargeBee {
    constructor(private readonly config: ChargebeeConfig) {
        super()
        this.configure(config)
    }

    async getCustomerById(id: string): Promise<Customer> {
        return new Promise((resolve, reject) => {
            this.customer.retrieve(id).request((error: any, result: Result) => {
                if (error) return reject(error)
                return resolve(result.customer)
            })
        })
    }

    async getSubscriptions(): Promise<Subscription[]> {
        return new Promise((resolve, reject) => {
            this.subscription.list().request((error: any, result: ListResult) => {
                if (error) return reject(error)
                return resolve(result.list.map((r) => r.subscription))
            })
        })
    }

    async getSubscriptionsByCustomerId(
        customerId: string,
        extraFilters?: DocumentFilterParams,
    ): Promise<Subscription[]> {
        return new Promise((resolve, reject) => {
            const filterParams: DocumentFilterParams = {}
            if (extraFilters) {
                for (const filter in extraFilters) {
                    if (extraFilters.hasOwnProperty(filter)) {
                        filterParams[filter] = extraFilters[filter]
                    }
                }
            }
            this.subscription
                .subscriptions_for_customer(customerId, filterParams)
                .request((error: any, result: ListResult) => {
                    if (error) return reject(error)
                    return resolve(result.list.map((r) => r.subscription))
                })
        })
    }

    async getInvoiceById(id: string): Promise<Invoice> {
        return new Promise((resolve, reject) => {
            this.invoice.retrieve(id).request((error: any, result: Result) => {
                if (error) return reject(error)
                return resolve(result.invoice)
            })
        })
    }

    async updateSubscription(
        subscriptionId: string,
        updates: Partial<Subscription> & { end_of_term?: boolean; replace_items_list?: boolean },
    ): Promise<Subscription> {
        return new Promise((resolve, reject) => {
            this.subscription
                .update_for_items(subscriptionId, updates)
                .request((error: any, result: Result) => {
                    if (error) return reject(error)
                    return resolve(result.subscription)
                })
        })
    }
}

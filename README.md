# SDK wrapper for the Chargebee TypeScript SDK

## Why

The [chargebee-typescript](https://github.com/chargebee/chargebee-typescript) library is a bit
unwieldy and exports its types from various places within the codebase. This wrapper exports its
types from the root of the project and converts Chargebee methods that return a `request` to 
simple promises.

## Currently Supported
- Customers
    - `getCustomerById`
- Subscriptions
    - `getSubscriptions`
    - `getSubscriptionsByCustomerId`
    - `updateSubscription`
- Invoices:
    - `getInvoiceById`
  
## Install
```shell
# Yarn
yarn add @pliancy/chargebee-sdk

# npm
npm install @pliancy/chargebee-sdk
```

## Usage

```typescript
// environment defaults to dev. Pass 'prod' as the second argument for producton
import { Invoice } from '@pliancy/chargebee-sdk'

const chargebee = new ChargeBee({ site: 'mySite', api_key: 'myApiKey' })
const invoice: Invoice = await chargebee.getInvoiceById(1)
```

## Test

```bash
yarn test
# or
yarn test.watch
```

# Test Coverage

```bash
yarn test.cov
# then
yarn cov.view
```

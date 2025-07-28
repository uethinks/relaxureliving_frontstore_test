"use server"

import { sdk } from "@lib/config"

export const listCartPaymentMethods = async (regionId: string) => {
  return sdk.store.payment.listPaymentProviders({
    region_id: regionId
  })
  .then(({ payment_providers, count, offset, limit }) => {
    return payment_providers
  })
}

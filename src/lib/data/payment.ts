"use server"

import { sdk } from "@lib/config"
import { getAuthHeaders, getCacheOptions } from "./cookies"
import { HttpTypes } from "@medusajs/types"

export const listCartPaymentMethods = async (regionId: string) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const next = {
    ...(await getCacheOptions("payment_providers")),
  }
  return sdk.store.payment.listPaymentProviders({
    region_id: regionId
  })
  .then(({ payment_providers, count, offset, limit }) => {
    return payment_providers
  })
}

import { isEmpty } from "./isEmpty"

type ConvertToLocaleParams = {
  amount: number
  currency_code: string
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  locale?: string
}

export const convertToLocale = ({
  amount,
  currency_code,
  minimumFractionDigits,
  maximumFractionDigits,
  locale = "en-US",
}: ConvertToLocaleParams) => {
  return currency_code && !isEmpty(currency_code)
    ? new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency_code,
        minimumFractionDigits,
        maximumFractionDigits,
      }).format(amount)
    : amount.toString()
}

/**
 * Formats cart total as currency string
 * @param cart - Cart object with total and currency_code
 * @returns Formatted currency string (e.g., "$1,300.00")
 */
export const formatCartTotal = (cart: any): string => {
  if (!cart?.total) return "$0.00"
  
  const amount = typeof cart.total === 'number' ? cart.total : parseFloat(cart.total)
  const currencyCode = cart.currency_code || 'usd'
  
  return convertToLocale({
    amount,
    currency_code: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    locale: 'en-US'
  })
}

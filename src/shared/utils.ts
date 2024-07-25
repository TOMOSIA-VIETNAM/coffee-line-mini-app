const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export const apiUrl = import.meta.env.VITE_API_BASE_URL

export const xApiKey = import.meta.env.VITE_X_API_KEY

export const toCurrency = (value: number) => formatter.format(value)

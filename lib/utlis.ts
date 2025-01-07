import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
// import { ASSETS_URL, CATALOG_URL } from './constants'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

// // Helper functions
// export const asset = (path: string) => `${ASSETS_URL}/${path}`
// export const storedCatalog = (path: string) => `${CATALOG_URL}/${path}`

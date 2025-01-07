import { Icons } from 'next/dist/lib/metadata/types/metadata-types'

export const favicons: Icons = {
  icon: [
    { url: '/icons/dark-gray.png', media: '(prefers-color-scheme: light)' },
    { url: '/icons/light-beige.png', media: '(prefers-color-scheme: dark)' },
  ],
}

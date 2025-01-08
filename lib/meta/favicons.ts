import { Icons } from 'next/dist/lib/metadata/types/metadata-types'

export const favicons: Icons = {
  icon: [
    { url: '/icons/INN.png', media: '(prefers-color-scheme: light)' },
    { url: '/icons/INN.png', media: '(prefers-color-scheme: dark)' },
  ],
}

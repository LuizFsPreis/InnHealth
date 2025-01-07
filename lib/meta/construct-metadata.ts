import type { Metadata } from 'next'

export const constructMetadata = ({
  title,
  description,
}: {
  title: string
  description: string
}): Metadata => {
  return {
    title: { default: title, template: `%s | ${title}` },
    description,
    icons: [
      { url: '/icons/dark-gray.png', media: '(prefers-color-scheme: light)' },
      { url: '/icons/light-beige.png', media: '(prefers-color-scheme: dark)' },
    ],
    creator: 'Luiz Fernando',
    authors: [
      { name: 'Luiz Fernando de Souza Preis', url: 'https://github.com/SrBaldoino' },
    ],
    keywords: [
      'Teste Innova',
      'Inn Health',
      'GymPass',
      'HealthHub',
      'Saúde',
      'Academia'
    ],
  }
}

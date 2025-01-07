import localFont from 'next/font/local'

// Font: Tw Cen MT
// https://learn.microsoft.com/pt-br/typography/font-list/tw-cen-mt

export const twCenMT = localFont({
  src: [
    { path: '../../public/fonts/Tcm_____.ttf', weight: 'normal' },
    { path: '../../public/fonts/Tcb_____.ttf', weight: 'bold' },
    {
      path: '../../public/fonts/Tcbi____.ttf',
      weight: 'bold',
      style: 'italic',
    },
    {
      path: '../../public/fonts/Tcmi____.ttf',
      weight: 'normal', 
      style: 'italic',
    },
    // { path: '../../../public/fonts/Tccm____.ttf' },
    // { path: '../../../public/fonts/Tccb____.ttf' },
    // { path: '../../../public/fonts/Tcceb.ttf' },
  ],
})

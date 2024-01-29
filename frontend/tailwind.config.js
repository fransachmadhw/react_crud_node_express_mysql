/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        light: {
          ...require('daisyui/src/theming/themes')['light'],
          'base-200': '#fbfbfb',
        },
        dark: {
          ...require('daisyui/src/theming/themes')['dark'],
          'base-200': '#1a1a21',
        },
      },
    ],
  },
};

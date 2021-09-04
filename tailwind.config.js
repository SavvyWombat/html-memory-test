module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
    './src/**/*.vue',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        '1/3': '1fr 3fr'
      },
      gridTemplateRows: {
        layout: 'auto 1fr auto'
      },
      spacing: {
        'lg': '1024px'
      },
      colors: {
        'savvy-gray': {
          '100': '#d5d9e2',
          '200': '#abb3c5',
          '300': '#828da8',
          '400': '#5d6986',
          '500': '#40485c',
          '600': '#353c4d',
          '700': '#2b303d',
          '800': '#20242e',
          '900': '#15181f',
        },
        'savvy-blue': {
          '100': '#f2f6fa',
          '200': '#e6edfa',
          '300': '#d9e5ef',
          '400': '#cddce9',
          '500': '#c0d3e4',
          '600': '#8fb1cf',
          '700': '#5e8fba',
          '800': '#3f6c93',
          '900': '#2a4862',
        },
        'savvy-brown': {
          '100': '#ebd0c3',
          '200': '#d8a186',
          '300': '#c4734a',
          '400': '#8f4f2f',
          '500': '#532e1b',
          '600': '#452617',
          '700': '#371e12',
          '800': '#2a170e',
          '900': '#1c0f09',
        },
        'savvy-red': {
          '100': '#f7ccc6',
          '200': '#ef988d',
          '300': '#e66553',
          '400': '#d9351f',
          '500': '#a02917',
          '600': '#852013',
          '700': '#6b1a0f',
          '800': '#50130c',
          '900': '#350d08',
        }
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['odd'],
    },
  },
  plugins: [],
}

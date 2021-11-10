const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		container: {
			center: true
		},
		colors: {
			plurple: {
				DEFAULT: '#7f3e7e',
				50: '#efcbef',
				100: '#e28de2',
				200: '#cc64ca',
				300: '#b257b0',
				400: '#994b97',
				500: '#7f3e7e',
				600: '#663265',
				700: '#4c254b',
				800: '#331133',
				900: '#250d26'
			},
			seafoam: {
				DEFAULT: '#257f79',
				50: '#a5f2ec',
				100: '#64e2d6',
				200: '#3bccc2',
				300: '#34b2a9',
				400: '#2c9991',
				500: '#257f79',
				600: '#1e6661',
				700: '#164c48',
				800: '#0f3330',
				900: '#071918'
			},
			coral: {
				DEFAULT: '#993f3f',
				50: '#ffc0c0',
				100: '#ed8585',
				200: '#e26161',
				300: '#cc5252',
				400: '#b24949',
				500: '#993f3f',
				600: '#7f3333',
				700: '#602626',
				800: '#511c1c',
				900: '#3d1010'
			},
			almond: {
				DEFAULT: '#b2a59a',
				50: '#fff3eb',
				100: '#f9e5d4',
				200: '#f2dfce',
				300: '#e5d3c3',
				400: '#ccbcae',
				500: '#b2a59a',
				600: '#7f756c',
				700: '#665e57',
				800: '#4c4641',
				900: '#332f2b'
			},
			gray: {
				DEFAULT: '#6b7280',
				50: '#f9fafb',
				100: '#f3f4f6',
				200: '#e5e7eb',
				300: '#d1d5db',
				400: '#9ca3af',
				500: '#6b7280',
				600: '#4b5563',
				700: '#374151',
				800: '#1f2937',
				900: '#111827'
			},
			white: '#ffffff',
			black: '#000000'
		},
		extend: {
			fontFamily: {
				sans: ['Rubik', ...defaultTheme.fontFamily.sans]
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/aspect-ratio'),
		require('@tailwindcss/line-clamp')
	]
};

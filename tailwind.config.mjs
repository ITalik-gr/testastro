/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		colors: {
			'black': '#0C0C0E',
			'white': '#FFFFFF',
			'gray': {
				900: '#161619',
				800: '#26262F',
				700: '#40404F',
				600: '#525266',
				500: '#64647B',
				400: '#80809C',
				300: '#A2A2C1',
				200: '#C5C5E2',
				100: '#E5E5F9',
				50: '#F3F3FF',
				25: '#F7F7FF',
			},
			'error': {
				400: "#F97066",
				500: "#F04438",
			},
			'primary': {
				700: '#4D3499',
				500: '#8057FF',
				400: '#9979FF',
				300: '#B39AFF',
				200: '#CCBCFF',
				100: '#E6DDFF',
				50: '#F2EDFF',
			},
		},
		container: {
			center: true,
			padding: '20px',
		},
		extend: {
      lineHeight: {
        '117': '117%!important',
				'135': '135%',
        '12': '3rem',
				'126': '126%',
      },
			animation: {
        'partners-anim': 'partners-scroll 23s linear infinite;',
      },
			letterSpacing: {
				'027': '-0.027rem',
			},
			screens: {
				'max-2xl': {'max': '1535px'},
				// => @media (max-width: 1535px) { ... }
	
				'max-xl': {'max': '1279px'},
				// => @media (max-width: 1279px) { ... }
	
				'max-lg': {'max': '1023px'},
				// => @media (max-width: 1023px) { ... }
	
				'max-md': {'max': '767px'},
				// => @media (max-width: 767px) { ... }
	
				'max-sm': {'max': '639px'},
				// => @media (max-width: 639px) { ... }
				'1440': {'min': '1440px'},
				'520': {'min': '520px'},
				'410': {'min': '410px'},
			},
		},
	},
	plugins: [
    function ({ addVariant }) {
        addVariant('child', '& > *');
        addVariant('child-hover', '& > *:hover');
				addVariant('last', '& > *:last-child');
				addVariant('four', '& > *:nth-child(4)');
    }
	],
}

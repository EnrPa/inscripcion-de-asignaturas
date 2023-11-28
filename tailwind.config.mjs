/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors:{
				primary1: '#FEDA3F',
				primary2: '#3C3C3B',
				secondary1: '#A4222B',
				secondary2: '#12636B',
				text: '#444242',
				background: '#444242',
			},
			backgroundImage:{
				'crowd-walking': "url('/public/crowd-walking.gif')",
			}
		},
	},
	plugins: [],
}
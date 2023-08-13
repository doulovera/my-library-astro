/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				title: ['"Merriweather"', 'serif']
			},
			screens: {
				'xs': '475px',
			},
		},
	},
	plugins: [],
}

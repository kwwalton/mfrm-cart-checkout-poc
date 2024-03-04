/** @type {import('next').NextConfig} */
const API_URL = process.env.API_URL

const nextConfig = {
    async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `${API_URL}/:path*`,
			},
		]
	},
	images: {
		remotePatterns: [
		  {
			protocol: 'https',
			hostname: 'images-us-prod.cms.commerce.dynamics.com',
			port: '',
			pathname: '/cms/api/czjhmjzmzc/imageFileData/**',
		  },
		],
	  },
}

module.exports = nextConfig

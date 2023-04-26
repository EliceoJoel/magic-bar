/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		GOOGLE_OAUTH_ID: process.env.GOOGLE_OAUTH_ID,
	},
};

module.exports = nextConfig;

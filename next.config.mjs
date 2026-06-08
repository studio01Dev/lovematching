/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    const imageRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.png')
    );

    if (imageRule) {
      imageRule.exclude = /\.(png|jpg|jpeg|gif|webp|ico)$/i;
    }

    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|webp|ico)$/i,
      type: 'asset/resource',
    });

    return config;
  },
};

export default nextConfig;

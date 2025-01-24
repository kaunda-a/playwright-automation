import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'source.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
        inspector: false,
        readline: false,
        electron: false,
        dns: false,
        module: false,
        async_hooks: false,
        'playwright-core/lib/vite/recorder': false,
        bufferutil: false,
        'utf-8-validate': false,
        'playwright-core': false,
        'playwright': false,
      };
    }

    config.module.rules.push(
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack']
      },
      {
        test: /\/playwright-logo\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'static/images/',
              publicPath: '/_next/static/images/',
            },
          },
        ],
      },
      {
        test: /\/assets\/.*\.(js|css)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'static/playwright/',
              publicPath: '/_next/static/playwright/',
            },
          },
        ],
      },
      {
        test: /playwright-core/,
        use: 'null-loader'
      }
    );

    config.resolve.alias['/playwright-logo.svg'] = path.resolve(__dirname, 'node_modules/playwright-core/lib/vite/recorder/playwright-logo.svg');
    config.resolve.modules.push(path.resolve('./'));

    config.externals.push({
      'playwright-core': 'playwright-core',
      'playwright': 'playwright'
    });

    return config;
  },
  generateBuildId: async () => {
    return `build-${Date.now()}`
  },
  // Added ESLint configuration
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

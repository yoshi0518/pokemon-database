import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      sans: ['var(--font-noto-sans-jp)'],
    },
  },
  darkMode: 'class',
  plugins: [],
};

export default config;

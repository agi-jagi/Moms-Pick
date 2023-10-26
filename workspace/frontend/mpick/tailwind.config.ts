import type { Config } from "tailwindcss";
import {nextui} from '@nextui-org/react';

const withMT = require("@material-tailwind/react/utils/withMT");

const config: Config = withMT({
  corePlugins: {
    preflight: true,
  },
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@material-tailwind/react/theme/components**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        sm: "443px", // Change this to your desired value for small screens (sm)
        md: "660px", // Change this to your desired value for medium screens (md)
        lg: "800px", // Change this to your desired value for large screens (lg)
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
});
export default config;

import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    // Carousel responsive classes that might be purged in production
    'pl-2',
    'pl-4', 
    'md:pl-4',
    'md:basis-1/2',
    'lg:basis-1/3',
    'xl:basis-1/4',
    'basis-1/2',
    'basis-1/3', 
    'basis-1/4',
    'left-4',
    'right-4',
    // Grid and flex classes for carousel
    'grid-cols-1',
    'md:grid-cols-2', 
    'lg:grid-cols-3',
    'xl:grid-cols-4',
    'xl:grid-cols-5',
    // Animation and transform classes
    'transition-all',
    'duration-300',
    'hover:-translate-y-1',
    'hover:shadow-lg',
    // Responsive padding classes specifically needed
    'md:pl-4',
    'lg:pl-4',
    'xl:pl-4',
    // Basis classes for responsive layout
    'md:basis-1/2',
    'lg:basis-1/3',
    'xl:basis-1/4',
    // Carousel positioning
    'absolute',
    'relative',
    'inset-0',
    // Flex layout for carousel
    'flex',
    'flex-shrink-0',
    'w-full',
    'overflow-hidden',
    // Mobile-first responsive classes
    'block',
    'hidden',
    'md:block',
    'lg:block'
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

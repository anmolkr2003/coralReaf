import type { Config } from "tailwindcss"
import animatePlugin from "tailwindcss-animate"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "480px",
        md: "768px",
        lg: "1140px",
        xl: "1440px",
      },
    },
    extend: {
      colors: {
        background: "hsl(0, 0%, 97%)",          // #F7F7F7
        foreground: "hsl(0, 0%, 15%)",          // #1F1F1F

        card: {
          DEFAULT: "#ffffff",
          foreground: "hsl(0, 0%, 15%)",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "hsl(0, 0%, 15%)",
        },

        primary: {
          DEFAULT: "#e71318",                  // Souled Store red
          foreground: "#ffffff",
        },
        highlight: "#c11115",                  // Hover variant of red

        secondary: {
          DEFAULT: "#4a4a4a",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#666666",
          foreground: "#1f1f1f",
        },

        accent: {
          DEFAULT: "#ffffff",
          foreground: "#1f1f1f",
        },

        destructive: {
          DEFAULT: "#e71318",
          foreground: "#ffffff",
        },

        border: "hsl(0, 0%, 80%)",              // #CCCCCC
        input: "hsl(0, 0%, 80%)",
        ring: "#e71318",
      },

      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },

      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },

      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "12px",
      },

      boxShadow: {
        soft: "0 4px 14px rgba(0, 0, 0, 0.05)",
        highlight: "0 0 0 3px rgba(231, 19, 24, 0.3)",
      },

      zIndex: {
        1: "1",
        10: "10",
        50: "50",
        100: "100",
        999: "999",
      },

      transitionTimingFunction: {
        "in-out-soft": "cubic-bezier(0.4, 0, 0.2, 1)",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 0.5s ease-out",
      },
    },
  },
  plugins: [animatePlugin],
}

export default config

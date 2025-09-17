import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          hover: "hsl(var(--secondary-hover))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Patriotic color palette
        saffron: {
          DEFAULT: "hsl(var(--saffron))",
          light: "hsl(var(--saffron-light))",
          dark: "hsl(var(--saffron-dark))",
        },
        "patriot-white": "hsl(var(--patriot-white))",
        "patriot-cream": "hsl(var(--patriot-cream))",
        "freedom-green": {
          DEFAULT: "hsl(var(--freedom-green))",
          light: "hsl(var(--freedom-green-light))",
          dark: "hsl(var(--freedom-green-dark))",
        },
        "vintage-gold": "hsl(var(--vintage-gold))",
        "vintage-bronze": "hsl(var(--vintage-bronze))",
        "vintage-sepia": "hsl(var(--vintage-sepia))",
        "vintage-ink": "hsl(var(--vintage-ink))",
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
        decorative: ["var(--font-decorative)"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "rotate-glow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "glow": {
          from: { boxShadow: "0 0 20px hsla(var(--vintage-gold), 0.4)" },
          to: { boxShadow: "0 0 30px hsla(var(--saffron), 0.6)" },
        },
        "slide-up": {
          from: { 
            opacity: "0", 
            transform: "translateY(30px)" 
          },
          to: { 
            opacity: "1", 
            transform: "translateY(0)" 
          },
        },
        "pulse-correct": {
          "0%": { 
            transform: "scale(1)", 
            boxShadow: "0 0 0 0 hsla(var(--freedom-green), 0.4)"
          },
          "70%": { 
            transform: "scale(1.02)", 
            boxShadow: "0 0 0 10px hsla(var(--freedom-green), 0)"
          },
          "100%": { 
            transform: "scale(1)" 
          },
        },
        "shake-wrong": {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-4px)" },
          "40%": { transform: "translateX(4px)" },
          "60%": { transform: "translateX(-3px)" },
          "80%": { transform: "translateX(3px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "rotate-glow": "rotate-glow 20s linear infinite",
        "float": "float 3s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "slide-up": "slide-up 0.6s ease-out",
        "pulse-correct": "pulse-correct 0.7s ease-out",
        "shake-wrong": "shake-wrong 0.42s ease-in-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

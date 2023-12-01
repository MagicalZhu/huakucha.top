const animate = require("tailwindcss-animate")
const typography = require('@tailwindcss/typography')
const { iconsPlugin, getIconCollections } = require("@egoist/tailwindcss-icons")

/**  @tailwindcss/typography */
const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '')
const rem = (px) => `${round(px / 16)}rem`
const em = (px, base) => `${round(px / base)}em`
const hexToRgb = (hex) => {
  hex = hex.replace('#', '')
  hex = hex.length === 3 ? hex.replace(/./g, '$&$&') : hex
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  return `${r} ${g} ${b}`
}

const css = (theme) => {
  return {
    // color
    '--tw-prose-body': theme('colors.gray[500]'),
    '--tw-prose-pre-bg': 'unset',
    // markdown max width
    fontSize: rem(15),
    maxWidth: '98ch',
    p: {
      marginBottom: '5px',
    },
    a: {
      color: 'var(--tw-prose-links)',
      textDecoration: 'underline',
      fontWeight: '500',
    },
    pre: {
      marginTop: 'unset',
      marginBottom: 'unset',
    },
    blockquote: {
      fontStyle: 'italic',
      color: theme('colors.gray[500]'),
      borderLeftWidth: '0.25rem',
      borderLeftColor: 'var(--tw-prose-quote-borders)',
      quotes: '"\\201C""\\201D""\\2018""\\2019"',
    },
    h1: {
      fontSize: em(36, 16),
      marginTop: '0',
      marginBottom: em(32, 36),
    },
    h2: {
      fontSize: em(24, 16),
      marginTop: em(24, 24),
      marginBottom: em(24, 24),
    },
    h3: {
      fontSize: em(20, 16),
      marginTop: em(12, 20),
      marginBottom: em(12, 20),
    },
    h4: {
      marginTop: em(8, 16),
      marginBottom: em(8, 16),
    },
  }
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './index.html',
    './pages/**/*.{ts,tsx,vue}',
    './components/**/*.{ts,tsx,vue}',
    './app/**/*.{ts,tsx,vue}',
    './src/**/*.{ts,tsx,vue}'
    ,
	],

  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    fontFamily: {
      mono: ['IBM Plex Mono'],
      serif: ['Hubot Sans'],
      display: ['poppins']
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: css(theme)
        },
      }),
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    animate,
    typography,
    iconsPlugin({
      collections: getIconCollections(["mdi","ph","prime", "carbon"]),
      scale: 1.2
    }),
  ],
}

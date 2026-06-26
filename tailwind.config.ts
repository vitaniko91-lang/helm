import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Editorial Atelier — warm paper + ink + a single oxblood accent.
        // Deliberate OPPOSITE of the Ollama case (dark/mono/terminal).
        // NO dark base, NO amber, NO green.
        paper: {
          base: '#F4F1EA', // page (warm bone / ivory)
          raised: '#FBFAF6', // cards / raised surfaces (slightly lighter)
          sink: '#ECE7DC', // insets / quiet bands
        },
        ink: {
          DEFAULT: '#14110F', // primary text (near-black, warm)
          soft: '#4A453E', // secondary text
          faint: '#8A8276', // captions / meta
        },
        oxblood: {
          DEFAULT: '#7B2D26', // THE accent — deep warm red (links, rules, CTA)
          soft: '#A8554C', // hover / lighter accent
        },
        line: {
          DEFAULT: 'rgba(20,17,15,0.12)', // hairline rules / borders
          strong: 'rgba(20,17,15,0.22)',
        },
      },
      fontFamily: {
        // Signature high-contrast variable serif for editorial headlines.
        serif: ['Fraunces', 'Georgia', 'serif'],
        // Clean warm grotesk for body / UI.
        sans: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        // Mono technical counterpoint for indices / captions / eyebrows.
        mono: ['"Spline Sans Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
} satisfies Config

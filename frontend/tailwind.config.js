module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: '#1f2937',
        accent: '#033a87',
        contrast: '#396cb3',
        secondary: '',
        success: { background: '#A7F3D0', color: '#10B981' },
        info: { background: '#BFDBFE', color: '#3B82F6' },
        danger: { background: '#FECACA', color: '#EF4444' },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};

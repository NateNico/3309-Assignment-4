module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#1E293B', 
        secondary: '#0EA5E9',
        background: '#F1F5F9',
        textColor: '#111827',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), 
  ],
};


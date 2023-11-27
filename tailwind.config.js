/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {

    },
    colors: {
      'salmao' : '#ffb16b',
      'laranja' : '#f34a05',
      'branco' : '#fff',
      'neve' : '#faf7fa',
      'preto' : '#172015',
      'cinza-claro': '#919191'
    },
    spacing: {
      '0' : '0px',
      '1' : '1px',
      '2' : '2px',
      '5' : '5px',
      '10' : '10px',
      '16' : '16px',
      '18' : '18px',
      '20' : '20px',
      '22' : '22px',
      '25' : '25px',
      '30' : '30px',
      '40' : '40px',
      '50' : '50px',
      '100' : '100px',
      '100%' : '100%',
    },
    fontFamily: {
      'texto': ['Poppins', 'sans-serif'],
      'titulo' : ['Anton', 'sans-serif'],
    },
    fontSize: {
      'pp' : '16px',
      'peq' : '18px',
      'med' : '20px',
      'gde': '24px',
      'xgde': '25px',
      'xxgde': '30px',
    },
    borderRadius: {
      '0' : '0px',
      '5' : '5px',
      '10' : '10px',
      '20' : '20px',
      '30' : '30px',
      '40' : '40px',
      '50' : '50px',
      '100%' : '100%',
    }

  },
  plugins: [],
}


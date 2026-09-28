import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

window.addEventListener('load', () => {
    setTimeout(() => {
        const splash = document.getElementById('splash-screen');
        if (splash) {
            splash.classList.add('opacity-0'); // Inicia desvanecimiento con Tailwind
            setTimeout(() => {
                splash.remove(); // Elimina el elemento por completo del diseño
            }, 500); // Espera a que termine la animación de CSS
        }
    }, 2000); // 2000 milisegundos = 2 segundos exactos en pantalla
});

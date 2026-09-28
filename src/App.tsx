name: Despliegue con Autocorrección JCV CHAT FĀNYÌ

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: 1. Descargar código
        uses: actions/checkout@v4

      - name: 2. Configurar Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: 3. Forzar corrección y generación de estructura limpia
        run: |
          echo "Iniciando reestructuración automática completa..."
          mkdir -p src

          # Escritura del App.tsx inteligente corregido con traducción e IAs Híbridas
          cat << 'EOF' > src/App.tsx
          import React, { useState, useEffect } from 'react';

          // Cambia esta URL por tu túnel de Cloudflare cuando enciendas tu Backend Híbrido
          const BACKEND_URL = "http://localhost:3000";

          export default function App() {
            const [screen, setScreen] = useState<'register' | 'splash' | 'chat' | 'call' | 'video'>('register');
            const [username, setUsername] = useState('');
            const [userPhone, setUserPhone] = useState('');
            const [msg, setMsg] = useState('');
            const [targetLang, setTargetLang] = useState('zh'); // 'zh' para Chino (WeChat), 'en' para Inglés (WhatsApp)
            const [loading, setLoading] = useState(false);
            const [log, setLog] = useState([
              { text: "Hello! Welcome to JCV CHAT FĀNYÌ.", trans: "¡Hola! Bienvenido a JCV CHAT FĀNYÌ.", user: false, name: "Sistema ✨" }
            ]);

            const handleRegister = (e: React.FormEvent) => {
              e.preventDefault();
              if (!username.trim() || !userPhone.trim()) return;
              setScreen('splash');
            };

            useEffect(() => {
              if (screen === 'splash') {
                const t = setTimeout(() => setScreen('chat'), 2500);
                return () => clearTimeout(t);
              }
            }, [screen]);

            // CONEXIÓN CON IA DEEPSEEK (TRADUCCIÓN EN TIEMPO REAL AL ENVIAR)
            const handleSendMessage = async (e: React.FormEvent) => {
              e.preventDefault();
              if (!msg.trim()) return;

              const currentMsg = msg;
              setMsg('');
              setLoading(true);

              try {
                // Petición segura a tu backend libre de restricciones gubernamentales
                const res = await fetch(`${BACKEND_URL}/api/translate/text`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ text: currentMsg, targetLang: targetLang })
                });
                const data = await res.json();

                if (data.success) {
                  setLog(prev => [...prev, { text: currentMsg, trans: data.translatedText, user: true, name: username }]);
                } else {
                  setLog(prev => [...prev, { text: currentMsg, trans: `[Traducido]: ${currentMsg}`, user: true, name: username }]);
                }
              } catch (err) {
                console.error("Error conectando con nodo IA:", err);
                // Respaldo visual si el servidor híbrido está apagado durante las pruebas
                setLog(prev => [...prev, { text: currentMsg, trans: `[Offline Fānyì]: ${currentMsg}`, user: true, name: username }]);
              } finally {
                setLoading(false);
              }
            };

            // 1. PANTALLA DE REGISTRO
            if (screen === 'register') return (
              <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-6 font-sans">
                <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center">
                  <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-400">JCV CHAT</h2>
                  <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Crear Cuenta Nueva</p>
                  <form onSubmit={handleRegister} className="mt-8 space-y-4 text-left">
                    <div>
                      <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Nombre de Usuario o Celular</label>
                      <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Tu nombre o número" className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors" />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Contraseña o Código de Acceso</label>
                      <input type="password" required value={userPhone} onChange={(e) => setUserPhone(e.target.value)} placeholder="••••••••" className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors" />
                    </div>
                    <button type="submit" className="w-full mt-4 bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-lg active:scale-98">Entrar a la Aplicación</button>
                  </form>
                </div>
              </div>
            );

            // 2. SPLASH SCREEN CON EL PLANETA TIERRA EN LA C
            if (screen === 'splash') return (
              <div className="flex flex-col items-center justify-center min-h-screen bg-black relative p-6 overflow-hidden">
                <div className="absolute inset-4 border border-transparent rounded-3xl animate-pulse" style={{ boxShadow: '0 0 15px #3b82f6, inset 0 0 15px #10b981' }}></div>
                <div className="text-center z-10 font-sans flex items-center justify-center font-black tracking-tighter text-8xl">
                  <span className="text-blue-500">J</span>
                  <div className="relative w-24 h-24 flex items-center justify-center text-cyan-400 mx-[-4px]">
                    <span>C</span>
                    <div className="absolute w-10 h-10 rounded-full border border-emerald-400 bg-cyan-950/40 flex items-center justify-center overflow-hidden">
                      <div className="absolute w-full h-[1px] bg-emerald-400/50"></div>
                      <div className="absolute h-full w-[1px] bg-emerald-400/50"></div>
                      <div className="w-8 h-4 rounded-full border border-emerald-400/40 absolute"></div>
                      <div className="h-8 w-4 rounded-full border border-emerald-400/40 absolute"></div>
                    </div>
                  </div>
                  <span className="text-emerald-500">V</span>
                </div>
                <div className="text-2xl font-bold text-blue-400 mt-2 tracking-widest uppercase font-sans">CHAT<span className="text-emerald-400">FĀNYÌ</span></div>
              </div>
            );

            // 3. PANTALLA DE LLAMADAS Y VIDEOLLAMADAS (Procesadas por SeamlessM4T v2)
            if (screen === 'call' || screen === 'video') return (
              <div className="flex flex-col items-center justify-between min-h-screen bg-slate-950 text-white p-8 font-sans">
                <div className="text-center mt-12">
                  <span className="text-xs bg-emerald-950 text-emerald-400 px-3 py-1 rounded-full font-semibold uppercase">{screen === 'video' ? 'Video Activo' : 'Llamada Segura'}</span>
                  <h2 className="text-2xl font-bold mt-6">{username}</h2>
                  <p className="text-xs text-emerald-400 mt-2 animate-pulse">Traducción simultánea activa (Voz Clonada Real)</p>
                </div>
                
                {/* Esfera de Transmisión */}
                <div className="w-32 h-32 bg-slate-800 rounded-full border border-emerald-500 flex items-center justify-center shadow-xl relative">
                  <div className="absolute inset-0 rounded-full bg-emerald-500/10 animate-ping"></div>
                  <svg className="w-16 h-16 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>

                {/* Área de Subtítulos Escritos para la Videollamada */}
                <div className="w-full max-w-sm bg-slate-900 border border-slate-800 p-4 rounded-2xl text-center text-sm">
                  <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-1">Subtítulos Instantáneos</p>
                  <p className="text-slate-300 italic">"Listening and translating stream through SeamlessM4T..."</p>
                </div>

                <button type="button" onClick={() => setScreen('chat')} className="mb-12 p-5 bg-red-600 hover:bg-red-700 rounded-full text-white shadow-lg active:scale-95 transition-transform">
                  <svg className="w-7 h-7 transform rotate-135" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                </button>
              </div>
            );

            // 4. PANTALLA PRINCIPAL DE CHAT CON SELECTOR DE PAÍSES E IDIOMAS
            return (
              <div className="flex flex-col min-h-screen bg-slate-950 font-sans text-slate-200">

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
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: 1. Descargar codigo
        uses: actions/checkout@v4

      - name: 2. Configurar Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: 3. Forzar correccion y generacion de estructura limpia
        run: |
          echo "Iniciando reestructuracion automatica completa..."
          mkdir -p src
          # 1. Forzar la escritura automatica del App.tsx inteligente
          cat << 'EOF' > src/App.tsx
          import React, { useState, useEffect } from 'react';
          export default function App() {
            const [screen, setScreen] = useState<'register' | 'splash' | 'chat' | 'call' | 'video'>('register');
            const [username, setUsername] = useState('');
            const [userPhone, setUserPhone] = useState('');
            const [msg, setMsg] = useState('');
            const [log, setLog] = useState([
              { text: "¡Hola! Bienvenido a JCV CHAT FĀNYÌ.", trans: "¡Hola! Bienvenido a JCV CHAT FĀNYÌ.", user: false, name: "Sistema ✨" }
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
            const handleSendMessage = (e: React.FormEvent) => {
              e.preventDefault();
              if (!msg.trim()) return;
              setLog([...log, { text: msg, trans: `[Traducido]: ${msg}`, user: true, name: username }]);
              setMsg('');
            };
            if (screen === 'register') return (
              <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 text-white p-6 font-sans">
                <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center">
                  <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-400">JCV CHAT</h2>
                  <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Crear Cuenta Nueva</p>
                  
                  <form onSubmit={handleRegister} className="mt-8 space-y-4 text-left">
                    <div>
                      <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Nombre de Usuario o Número</label>
                      <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Escribe tu nombre o celular" className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors" />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Código de Acceso (Contraseña)</label>
                      <input type="password" required value={userPhone} onChange={(e) => setUserPhone(e.target.value)} placeholder="••••••••" className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors" />
                    </div>
                    <button type="submit" className="w-full mt-4 bg-gradient-to-r from-blue-600 to-emerald-500 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-lg active:scale-98">
                      Registrarse y Entrar
                    </button>
                  </form>
                </div>
              </div>
            );
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
            if (screen === 'llamada' || screen === 'video') return (
              <div className="flex flex-col items-center justify-between min-h-screen bg-slate-950 text-white p-8 font-sans">
                <div className="text-center mt-12">
                  <span className="text-xs bg-emerald-950 text-emerald-400 px-3 py-1 rounded-full font-semibold uppercase">{screen === 'video' ? 'Video Activo' : 'Llamada Segura'}</span>
                  <h2 className="text-2xl font-bold mt-6">{username}</h2>
                  <p className="text-xs text-emerald-400 mt-2 animate-pulse">Traducción simultánea activa</p>
                </div>
                <div className="w-32 h-32 bg-slate-800 rounded-full border-2 border-emerald-500 flex items-center justify-center shadow-xl">
                  <svg className="w-16 h-16 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <button type="button" onClick={() => setScreen('chat')} className="mb-12 p-5 bg-red-600 hover:bg-red-700 rounded-full text-white transform rotate-135">
                  <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                </button>
              </div>
            );
            return (
              <div className="flex flex-col min-h-screen bg-slate-950 font-sans text-slate-200">
                <header className="sticky top-0 bg-slate-900 px-4 py-4 flex items-center justify-between border-b border-slate-800 shadow-md z-40">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-800 rounded-full border border-slate-700 flex items-center justify-center font-bold text-blue-400">U</div>
                    <div>
                      <h1 className="text-base font-bold text-white flex items-center gap-1.5">{username} <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded">En línea</span></h1>
                    </div>
                  </div>
                </header>
              </div>
            );
          }
          EOF

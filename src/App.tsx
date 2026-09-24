import React, { useState, useEffect } from 'react';

export default function App() {
  // Control de pantallas: 'splash' (inicio), 'chat' (mensajes), 'call' (llamada), 'video' (videollamada)
  const [screen, setScreen] = useState<'splash' | 'chat' | 'call' | 'video'>('splash');
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([
    { text: "Hello! Welcome to JCV CHAT FĀNYÌ.", translation: "¡Hola! Bienvenido a JCV CHAT FĀNYÌ.", sender: "system" }
  ]);

  // Desaparece la pantalla de inicio neón después de 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => setScreen('chat'), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Función para enviar mensajes
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setChatLog([...chatLog, { text: message, translation: `[Traducido]: ${message}`, sender: 'user' }]);
    setMessage('');
  };

  // 1. PANTALLA DE INICIO (SPLASH SCREEN NEÓN)
  if (screen === 'splash') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black relative p-6 select-none overflow-hidden">
        {/* Borde neón brillante alrededor de la pantalla simulando el celular */}
        <div className="absolute inset-2 border-2 border-transparent rounded-3xl pointer-events-none animate-pulse"
             style={{ boxShadow: '0 0 15px #3b82f6, inset 0 0 15px #10b981, 0 0 5px #a855f7' }}></div>
        
        {/* Contenedor del Logo */}
        <div className="text-center z-10 animate-fade-in">
          <div className="text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-emerald-400 to-emerald-500 font-sans select-none">
            JCV
          </div>
          <div className="mt-2 text-2xl font-bold tracking-widest text-blue-400 font-sans uppercase">
            CHAT<span className="text-emerald-400">FĀNYÌ</span>
          </div>
          <p className="mt-8 text-xs text-gray-500 tracking-widest uppercase animate-pulse">Cargando sistema...</p>
        </div>
      </div>
    );
  }

  // 2. PANTALLA DE LLAMADA DE VOZ O VIDEO INTERNACIONAL
  if (screen === 'call' || screen === 'video') {
    return (
      <div className="flex flex-col items-center justify-between min-h-screen bg-slate-950 text-white p-8 font-sans">
        <div className="text-center mt-12">
          <span className="text-xs bg-emerald-950 text-emerald-400 px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
            {screen === 'video' ? 'Video WebRTC Activo' : 'Conexión Segura'}
          </span>
          <h2 className="text-2xl font-bold mt-6">Mare 🥰</h2>
          <p className="text-sm text-gray-400 mt-2">
            {screen === 'video' ? 'Video llamadas globales instantáneas' : 'Llamada Internacional'}
          </p>
          <p className="text-xs text-emerald-400 mt-1 animate-pulse">Traducción de voz simultánea activa</p>
        </div>

        {/* Avatar central */}
        <div className="relative flex items-center justify-center my-auto">
          <div className="absolute w-40 h-40 bg-emerald-500/10 rounded-full animate-ping"></div>
          <div className="w-32 h-32 bg-slate-800 rounded-full border-2 border-emerald-500 flex items-center justify-center shadow-xl shadow-emerald-500/10">
            <svg className="w-16 h-16 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>

        {/* Panel inferior de control con botón para Finalizar */}
        <div className="flex items-center justify-center gap-6 mb-12">
          <button type="button" className="p-4 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4" /></svg>
          </button>
          
          {/* BOTÓN ROJO PARA FINALIZAR LLAMADA */}
          <button type="button" onClick={() => setScreen('chat')} className="p-5 bg-red-600 hover:bg-red-700 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-red-600/30 text-white">
            <svg className="w-7 h-7 transform rotate-135" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </button>

          <button type="button" className="p-4 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.536 15.536a5 5 0 000-7.072m-2.828 9.9a9 9 0 000-12.728" /></svg>
          </button>
        </div>
      </div>
    );
  }

  // 3. INTERFAZ PRINCIPAL DE CHAT ESTILO WHATSAPP
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 font-sans antialiased text-slate-200 selection:bg-blue-500/30">
      {/* Sub-Header Superior de Seguridad */}
      <div className="w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800 text-[10px] py-1.5 px-4 flex justify-between font-medium tracking-wide text-slate-400 select-none">
        <span className="flex items-center gap-1 text-emerald-400">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span> MÁXIMA SEGURIDAD ANTIVIRUS ACTIVA
        </span>
        <span className="flex items-center gap-1"><span className="text-emerald-400">🔒</span> CIFRADO E2EE</span>
      </div>

      {/* Header Principal */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-slate-800 shadow-md">
        <div className="flex items-center gap-3">
          <button type="button" className="p-1 text-slate-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <div className="w-10 h-10 bg-slate-800 rounded-full border border-slate-700 flex items-center justify-center font-bold text-blue-400 select-none shadow-inner">
            M
          </div>
          <div>
            <h1 className="text-base font-bold text-white flex items-center gap-1.5">
              Mare 🥰 <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded-md font-semibold tracking-wider uppercase">Plan: Pro</span>
            </h1>
            <p className="text-[11px] text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> En línea
            </p>
          </div>
        </div>

        {/* BOTONES DE LLAMADA Y VIDEOLLAMADA */}
        <div className="flex items-center gap-2">
          {/* Botón Llamada de Voz */}
          <button type="button" onClick={() => setScreen('call')} className="p-2 text-slate-300 hover:text-blue-400 hover:bg-slate-800 rounded-full transition-all" title="Llamada de Voz">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.72l.54 3.22a1 1 0 01-.25.83l-2.2 2.2a15.978 15.978 0 006.415 6.415l2.2-2.2a1 1 0 01.83-.25l3.22.54a1 1 0 01.72.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
          {/* Botón Videollamada */}
          <button type="button" onClick={() => setScreen('video')} className="p-2 text-slate-300 hover:text-emerald-400 hover:bg-slate-800 rounded-full transition-all" title="Videollamada">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Área de Mensajes */}
      <main className="flex-1 p-4 space-y-4 overflow-y-auto max-w-3xl w-full mx-auto">
        {chatLog.map((chat, index) => (
          <div key={index} className={`flex flex-col ${chat.sender === 'user' ? 'items-end' : chat.sender === 'system' ? 'items-center' : 'items-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 shadow-md ${
              chat.sender === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : chat.sender === 'system'
                ? 'bg-slate-900 text-slate-400 border border-slate-800 text-xs rounded-xl text-center'
                : 'bg-slate-900 text-slate-100 rounded-tl-none border border-slate-800'
            }`}>
              <p className="text-sm">{chat.text}</p>
              {chat.translation && chat.sender !== 'system' && (
                <p className="text-xs text-blue-200 mt-1 border-t border-blue-500/30 pt-1 italic">{chat.translation}</p>
              )}
              {chat.translation && chat.sender === 'system' && (
                <p className="text-xs text-emerald-400 mt-0.5">{chat.translation}</p>
              )}
            </div>
          </div>
        ))}
      </main>

      {/* Input de Mensajes */}

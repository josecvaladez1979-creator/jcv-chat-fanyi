  // 3. INTERFAZ PRINCIPAL DE CHAT (REPARADA PARA MÓVILES)
  return (
    <div className="flex flex-col h-screen w-full bg-slate-950 font-sans antialiased text-slate-200 selection:bg-blue-500/30 overflow-hidden">
      
      {/* Sub-Header Superior de Seguridad */}
      <div className="w-full bg-slate-900/80 backdrop-blur-md border-b border-slate-800 text-[10px] py-1.5 px-4 flex justify-between font-medium tracking-wide text-slate-400 select-none shrink-0">
        <span className="flex items-center gap-1 text-emerald-400">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span> MÁXIMA SEGURIDAD ANTIVIRUS ACTIVA
        </span>
        <span className="flex items-center gap-1"><span className="text-emerald-400">🔒</span> CIFRADO E2EE</span>
      </div>

      {/* Header Principal Estilo WhatsApp (Se ajustaron las clases de fondo y alineación) */}
      <header className="bg-emerald-600 px-4 py-3 flex items-center justify-between border-b border-emerald-700 shadow-md shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-800 rounded-full border border-emerald-500 flex items-center justify-center font-bold text-white select-none shadow-inner">
            JCV
          </div>
          <div>
            <h1 className="text-sm font-bold text-white flex flex-col sm:flex-row sm:items-center gap-1">
              JCV CHAT FĀNYÌ 
              <span className="text-[9px] w-fit bg-emerald-900/50 text-emerald-200 px-1.5 py-0.5 rounded-md font-semibold tracking-wider uppercase">
                Plan: Pro • 7 días gratis
              </span>
            </h1>
            <p className="text-[11px] text-emerald-200 flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse"></span> En línea
            </p>
          </div>
        </div>

        {/* BOTONES FUNCIONALES */}
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => setScreen('call')} className="p-2 text-white hover:bg-emerald-700 rounded-full transition-all" title="Llamada de Voz">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.72l.54 3.22a1 1 0 01-.25.83l-2.2 2.2a15.978 15.978 0 006.415 6.415l2.2-2.2a1 1 0 01.83-.25l3.22.54a1 1 0 01.72.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
          <button type="button" onClick={() => setScreen('video')} className="p-2 text-white hover:bg-emerald-700 rounded-full transition-all" title="Videollamada">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Área de Mensajes (flex-1 y overflow-y-auto aseguran que el scroll ocurra solo aquí) */}
      <main className="flex-1 p-4 space-y-4 overflow-y-auto w-full max-w-3xl mx-auto">
        {chatLog.map((chat, index) => (
          <div key={index} className={`flex flex-col ${chat.sender === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 shadow-md ${
              chat.sender === 'user' 
                ? 'bg-emerald-600 text-white rounded-tr-none' 
                : 'bg-slate-900 text-slate-100 rounded-tl-none border border-slate-800'
            }`}>
              <p className="text-sm">{chat.text}</p>
              {chat.translation && (
                <p className="text-xs text-emerald-400 mt-1 border-t border-slate-800 pt-1 italic">{chat.translation}</p>
              )}
            </div>
          </div>
        ))}
      </main>

      {/* Input de Mensajes (shrink-0 bloquea que se comprima o desaparezca) */}
      <footer className="bg-slate-900/90 backdrop-blur-md border-t border-slate-800 p-4 shrink-0 pb-6 mbl-safe">
        <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe tu mensaje aquí..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
          />
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-xl transition-colors shadow-md"
          >
            <svg className="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </footer>

    </div>
  );

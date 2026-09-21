import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Lock, Send, Phone, Video, 
  Languages, CreditCard, Sparkles, User, AlertCircle, RefreshCw
} from 'lucide-react';

// 1. ESTRUCTURA DE PRECIOS EXACTA EN MXN
const PRICE_TABLE = {
  FREE: { biweekly: 0, monthly: 0, yearly: 0 },
  PRO: { biweekly: 150, monthly: 299, yearly: 2999 },
  BUSINESS: { biweekly: 399, monthly: 799, yearly: 7999 },
  ENTERPRISE: { biweekly: 799, monthly: 1599, yearly: 15999 },
};

export default function App() {
  // 2. ESTADO INICIAL DEL USUARIO (Inicia en modo PRO de prueba)
  const [user, setUser] = useState({
    name: 'Usuario JCV',
    avatar: 'https://unsplash.com',
    nativeLanguage: 'es',
    targetLanguage: 'en',
    plan: 'PRO' as 'FREE' | 'PRO' | 'BUSINESS' | 'ENTERPRISE',
    trialStartDate: new Date().toISOString()
  });

  const [daysRemaining, setDaysRemaining] = useState(7);
  const [showPaywall, setShowPaywall] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'FREE' | 'PRO' | 'BUSINESS' | 'ENTERPRISE'>('PRO');
  const [selectedCycle, setSelectedCycle] = useState<'biweekly' | 'monthly' | 'yearly'>('monthly');
  const [inputText, setInputText] = useState('');
  const [activeCall, setActiveCall] = useState<{ type: 'voice' | 'video' } | null>(null);

  // HISTORIAL DE CHAT INICIAL
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'remote',
      originalText: 'Hello! Welcome to JCV CHAT FĀNYÌ.',
      translatedText: '¡Hola! Bienvenido a JCV CHAT FĀNYÌ.',
      isMe: false
    }
  ]);

  // CONTADOR LÓGICO DE 7 DÍAS
  useEffect(() => {
    // Aquí puedes simular los días. Si se pone en 0, se degrada a FREE automáticamente.
    if (daysRemaining === 0 && user.plan !== 'FREE') {
      setUser(prev => ({ ...prev, plan: 'FREE' }));
    }
  }, [daysRemaining]);

  // ENVÍO DE MENSAJES + COMPORTAMIENTO FREEMIUM
  const sendMessage = () => {
    if (!inputText.trim()) return;

    const newMsg = {
      id: Date.now().toString(),
      sender: 'me',
      originalText: inputText,
      translatedText: user.plan !== 'FREE' ? `[Qwen 99%]: ${inputText} (Traducido)` : undefined,
      isMe: true
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    // Réplica simulada del extranjero
    setTimeout(() => {
      const reply = {
        id: (Date.now() + 1).toString(),
        sender: 'remote',
        originalText: 'Testing global secure connection without filters.',
        translatedText: user.plan !== 'FREE' ? 'Probando conexión segura global sin filtros.' : undefined,
        isMe: false
      };
      setMessages(prev => [...prev, reply]);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 antialiased">
      
      {/* DISEÑO EXCLUSIVO MÓVIL ESTILO SMARTPHONE */}
      <div className="w-full max-w-md h-[820px] bg-slate-900 rounded-[40px] shadow-2xl border-[6px] border-slate-800 overflow-hidden flex flex-col relative">
        
        {/* ANTIVIRUS & ANTI-HACKERS GLOBAL STATUS */}
        <div className="bg-black/40 px-4 py-1.5 border-b border-slate-800 flex justify-between items-center text-[10px] text-slate-400">
          <div className="flex items-center gap-1 text-emerald-400 font-bold">
            <ShieldCheck size={12} />
            <span>MÁXIMA SEGURIDAD ANTIVIRUS ACTIVA</span>
          </div>
          <div className="flex items-center gap-1 text-cyan-400">
            <Lock size={10} />
            <span>EXTREMO A EXTREMO (E2EE)</span>
          </div>
        </div>

        {/* CABECERA (FUSIÓN WECHAT + WHATSAPP) */}
        <div className="bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 px-4 py-3 text-white flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-3">
            <img src={user.avatar} className="w-9 h-9 rounded-full object-cover border border-white/20" alt="Profile" />
            <div>
              <h1 className="text-xs font-black tracking-wider">JCV CHAT FĀNYÌ</h1>
              <div className="flex items-center gap-1.5 text-[9px] opacity-90">
                <span className="bg-black/30 px-1 py-0.5 rounded font-extrabold text-amber-300">PLAN: {user.plan}</span>
                <span>• {daysRemaining > 0 ? `${daysRemaining} días gratis` : 'Modo Restringido'}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setActiveCall({ type: 'voice' })} className="p-1.5 hover:bg-white/15 rounded-full"><Phone size={16} /></button>
            <button onClick={() => setActiveCall({ type: 'video' })} className="p-1.5 hover:bg-white/15 rounded-full"><Video size={16} /></button>
            <button onClick={() => setShowPaywall(true)} className="bg-amber-400 text-slate-950 p-1.5 rounded-full font-bold shadow-md"><CreditCard size={14} /></button>
          </div>
        </div>

        {/* AREA DE CHAT */}
        <div className="flex-1 bg-slate-900/95 p-4 overflow-y-auto space-y-3">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs shadow-md relative ${msg.isMe ? 'bg-teal-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-100 rounded-tl-none'}`}>
                <p>{msg.originalText}</p>
                
                {msg.translatedText ? (
                  <div className="mt-1.5 pt-1 border-t border-white/10 text-[11px] text-cyan-200 font-medium flex items-center gap-1">
                    <Languages size={10} />
                    <span>{msg.translatedText}</span>
                  </div>
                ) : (
                  !msg.isMe && (
                    <button 
                      onClick={() => setShowPaywall(true)} 
                      className="mt-2 w-full bg-slate-900 hover:bg-black text-amber-400 text-[10px] font-bold py-1 px-2 rounded border border-amber-400/20 flex items-center justify-center gap-1"
                    >
                      <Sparkles size={10} />
                      Desbloquear traducción por $150
                    </button>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        {/* INPUT DE MENSAJE */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex gap-2">
          <input 
            type="text" 
            placeholder={user.plan === 'FREE' ? "Mensajes sin traducción..." : "Traducción por Qwen activa..."}
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            className="flex-1 bg-slate-900 rounded-full px-4 py-2 text-xs text-white border border-slate-700 focus:outline-none focus:border-cyan-500"
          />
          <button onClick={sendMessage} className="bg-teal-600 text-white p-2 rounded-full"><Send size={14} /></button>
        </div>

        {/* SIMULADOR DE CONTROL / EXPIRACIÓN RÁPIDA */}
        <div className="absolute bottom-16 left-3">
          <button 
            onClick={() => setDaysRemaining(0)} 
            className="bg-rose-600/80 hover:bg-rose-600 text-[9px] px-2 py-0.5 rounded-full text-white font-mono"
          >
            <RefreshCw size={8} className="inline mr-1" /> Terminar Trial
          </button>
        </div>

        {/* MODAL DE PLANES Y MONETIZACIÓN (PAYWALL) */}
        {showPaywall && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-xs z-50 flex flex-col justify-end">
            <div className="bg-slate-950 border-t border-amber-400 rounded-t-3xl p-4 max-h-[80%] overflow-y-auto space-y-3 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-black text-amber-400 flex items-center gap-1.5">
                  <Sparkles size={16} /> MONETIZACIÓN FREEMIUM
                </h3>
                <button onClick={() => setShowPaywall(false)} className="text-xs text-slate-400">Cerrar</button>
              </div>

              {/* SELECTOR CICLO DE PAGO */}
              <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 text-[10px]">
                {(['biweekly', 'monthly', 'yearly'] as const).map(c => (
                  <button 
                    key={c} onClick={() => setSelectedCycle(c)}
                    className={`py-1 rounded font-bold capitalize ${selectedCycle === c ? 'bg-amber-400 text-slate-950' : 'text-slate-400'}`}
                  >
                    {c === 'biweekly' ? '15 días' : c === 'monthly' ? 'Mensual' : 'Anual (-2 meses)'}
                  </button>
                ))}
              </div>

              {/* LOS 3 PLANES COMERCIALES */}
              <div className="space-y-1.5">
                {(['FREE', 'PRO', 'BUSINESS', 'ENTERPRISE'] as const).map(p => (
                  <div 
                    key={p} onClick={() => setSelectedPlan(p)}
                    className={`p-2.5 rounded-xl border cursor-pointer transition flex justify-between items-center ${selectedPlan === p ? 'border-amber-400 bg-amber-400/5' : 'border-slate-800 bg-slate-900'}`}
                  >
                    <div className="text-left">
                      <span className="text-xs font-black block">{p}</span>
                      <span className="text-[9px] text-slate-400">
                        {p === 'FREE' && 'Básico sin traducción global.'}
                        {p === 'PRO' && 'Texto Qwen 99% + Grupos.'}
                        {p === 'BUSINESS' && 'Notas de voz y llamadas con tu voz.'}
                        {p === 'ENTERPRISE' && 'Video en vivo + API Empresa.'}
                      </span>
                    </div>

import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Lock, Send, Phone, Video, 
  Languages, CreditCard, Sparkles, User, RefreshCw
} from 'lucide-react';

const PRICE_TABLE = {
  FREE: { biweekly: 0, monthly: 0, yearly: 0 },
  PRO: { biweekly: 150, monthly: 299, yearly: 2999 },
  BUSINESS: { biweekly: 399, monthly: 799, yearly: 7999 },
  ENTERPRISE: { biweekly: 799, monthly: 1599, yearly: 15999 },
};

export default function App() {
  const [user, setUser] = useState({
    name: 'Usuario JCV',
    avatar: 'https://unsplash.com',
    plan: 'PRO' as 'FREE' | 'PRO' | 'BUSINESS' | 'ENTERPRISE'
  });

  const [daysRemaining, setDaysRemaining] = useState(7);
  const [showPaywall, setShowPaywall] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'FREE' | 'PRO' | 'BUSINESS' | 'ENTERPRISE'>('PRO');
  const [selectedCycle, setSelectedCycle] = useState<'biweekly' | 'monthly' | 'yearly'>('monthly');
  const [inputText, setInputText] = useState('');
  const [activeCall, setActiveCall] = useState<boolean>(false);
  const [messages, setMessages] = useState([
    { id: '1', sender: 'remote', originalText: 'Hello! Welcome to JCV CHAT FĀNYÌ.', translatedText: '¡Hola! Bienvenido a JCV CHAT FĀNYÌ.', isMe: false }
  ]);

  useEffect(() => {
    if (daysRemaining === 0 && user.plan !== 'FREE') {
      setUser(prev => ({ ...prev, plan: 'FREE' }));
    }
  }, [daysRemaining]);

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

    setTimeout(() => {
      const reply = {
        id: (Date.now() + 1).toString(),
        sender: 'remote',
        originalText: 'Testing global secure connection without filters.',
        translatedText: user.plan !== 'FREE' ? 'Probando conexión segura global sin filtros.' : undefined,
        isMe: false
      };
      setMessages(prev => [...prev, reply]);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-2 antialiased">
      <div className="w-full max-w-md h-[780px] bg-slate-900 rounded-[36px] shadow-2xl border-[4px] border-slate-800 overflow-hidden flex flex-col relative">
        
        {/* SEGURIDAD */}
        <div className="bg-black/40 px-4 py-1.5 border-b border-slate-800 flex justify-between items-center text-[9px] text-slate-400">
          <div className="flex items-center gap-1 text-emerald-400 font-bold">
            <ShieldCheck size={11} />
            <span>MÁXIMA SEGURIDAD ANTIVIRUS ACTIVA</span>
          </div>
          <div className="flex items-center gap-1 text-cyan-400">
            <Lock size={9} />
            <span>EXTREMO A EXTREMO (E2EE)</span>
          </div>
        </div>

        {/* CABECERA */}
        <div className="bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 px-4 py-2.5 text-white flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <img src={user.avatar} className="w-8 h-8 rounded-full object-cover" alt="Profile" />
            <div>
              <h1 className="text-xs font-black tracking-wider">JCV CHAT FĀNYÌ</h1>
              <div className="flex items-center gap-1 text-[9px] opacity-90">
                <span className="bg-black/30 px-1 py-0.2 rounded font-extrabold text-amber-300">PLAN: {user.plan}</span>
                <span>• {daysRemaining > 0 ? `${daysRemaining} días gratis` : 'Modo Básico'}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <button onClick={() => setActiveCall(true)} className="p-1 hover:bg-white/10 rounded-full"><Phone size={14} /></button>
            <button onClick={() => setActiveCall(true)} className="p-1 hover:bg-white/10 rounded-full"><Video size={14} /></button>
            <button onClick={() => setShowPaywall(true)} className="bg-amber-400 text-slate-950 p-1.5 rounded-full font-bold shadow-sm"><CreditCard size={12} /></button>
          </div>
        </div>

        {/* CHAT CHANNELS */}
        <div className="flex-1 bg-slate-900/95 p-3 overflow-y-auto space-y-2.5">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-xl px-3 py-1.5 text-xs shadow-sm ${msg.isMe ? 'bg-teal-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-100 rounded-tl-none'}`}>
                <p>{msg.originalText}</p>
                {msg.translatedText ? (
                  <div className="mt-1 pt-0.5 border-t border-white/10 text-[10px] text-cyan-200 flex items-center gap-1">
                    <Languages size={9} />
                    <span>{msg.translatedText}</span>
                  </div>
                ) : (
                  !msg.isMe && (
                    <button onClick={() => setShowPaywall(true)} className="mt-1.5 w-full bg-slate-950 text-amber-400 text-[9px] font-bold py-0.5 px-1.5 rounded border border-amber-400/20 flex items-center justify-center gap-1">
                      <Sparkles size={9} /> Desbloquear traducción por $150
                    </button>
                  )
                )}
              </div>
            </div>
          ))}
        </div>

        {/* INPUT BAR */}
        <div className="p-2 bg-slate-950 border-t border-slate-800 flex gap-2">
          <input 
            type="text" 
            placeholder={user.plan === 'FREE' ? "Mensajes sin traducción..." : "Traducción por Qwen activa..."}
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            className="flex-1 bg-slate-900 rounded-full px-3 py-1 text-xs text-white border border-slate-700 focus:outline-none focus:border-cyan-500"
          />
          <button onClick={sendMessage} className="bg-teal-600 text-white p-1.5 rounded-full"><Send size={12} /></button>
        </div>

        {/* MOCK CONTROLLER */}
        <div className="absolute bottom-14 left-3">
          <button onClick={() => setDaysRemaining(0)} className="bg-rose-600/70 text-[8px] px-1.5 py-0.5 rounded-full text-white">
            <RefreshCw size={8} className="inline mr-0.5" /> Terminar Trial
          </button>
        </div>

        {/* PAYWALL MODAL */}
        {showPaywall && (
          <div className="absolute inset-0 bg-black/80 z-50 flex flex-col justify-end">
            <div className="bg-slate-950 border-t border-amber-400 rounded-t-2xl p-4 max-h-[85%] overflow-y-auto space-y-3 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-black text-amber-400 flex items-center gap-1">
                  <Sparkles size={12} /> JCV CHAT FĀNYÌ MONETIZACIÓN
                </h3>
                <button onClick={() => setShowPaywall(false)} className="text-[10px] text-slate-400">Cerrar</button>
              </div>

              <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded border border-slate-800 text-[9px] text-center">
                {(['biweekly', 'monthly', 'yearly'] as const).map(c => (
                  <button key={c} onClick={() => setSelectedCycle(c)} className={`py-0.5 rounded ${selectedCycle === c ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400'}`}>
                    {c === 'biweekly' ? '15 días' : c === 'monthly' ? 'Mensual' : 'Anual'}
                  </button>
                ))}
              </div>

              <div className="space-y-1">
                {(['FREE', 'PRO', 'BUSINESS', 'ENTERPRISE'] as const).map(p => (
                  <div key={p} onClick={() => setSelectedPlan(p)} className={`p-2 rounded-lg border text-left flex justify-between items-center ${selectedPlan === p ? 'border-amber-400 bg-amber-400/5' : 'border-slate-800 bg-slate-900'}`}>
                    <div>
                      <span className="text-[11px] font-black block">{p}</span>
                      <span className="text-[8px] text-slate-400 block">
                        {p === 'FREE' && 'Básico sin traducción.'}
                        {p === 'PRO' && 'Texto Qwen 99% + Grupos.'}
                        {p === 'BUSINESS' && 'Notas de voz y llamadas con tu voz.'}
                        {p === 'ENTERPRISE' && 'Video en vivo + API Empresa.'}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-amber-300">${PRICE_TABLE[p][selectedCycle]}</span>
                  </div>
                ))}
              </div>

              <div className="p-2 bg-slate-900 rounded text-[8px] text-slate-400 space-y-0.5 border border-slate-800">
                <span className="font-bold text-slate-300 block">Pasarelas Soportadas:</span>
                <p>• México: Mercado Pago Suscripciones (Frecuencia: 15 días)</p>
                <p>• Global: Stripe Billing (`15 days`) y PayPal Billing SDK</p>
              </div>

              <button onClick={() => { setUser(prev => ({ ...prev, plan: selectedPlan })); setShowPaywall(false); }} className="w-full bg-amber-400 text-slate-950 font-black text-xs py-2 rounded-lg">
                Confirmar Configuración de Plan
              </button>
            </div>
          </div>
        )}

        {/* CALL MODAL */}
        {activeCall && (
          <div className="absolute inset-0 bg-slate-950 z-50 flex flex-col justify-between p-6 items-center text-white">
            <div className="my-auto text-center space-y-2">

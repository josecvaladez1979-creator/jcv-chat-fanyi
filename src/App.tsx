import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, Send, Phone, Video, Languages, CreditCard, Sparkles, User, RefreshCw } from 'lucide-react';

const PRICES = {
  FREE: { biweekly: 0, monthly: 0, yearly: 0 },
  PRO: { biweekly: 150, monthly: 299, yearly: 2999 },
  BUSINESS: { biweekly: 399, monthly: 799, yearly: 7999 },
  ENTERPRISE: { biweekly: 799, monthly: 1599, yearly: 15999 }
};

export default function App() {
  const [user, setUser] = useState({ name: 'Usuario JCV', avatar: 'https://unsplash.com', plan: 'PRO' as 'FREE' | 'PRO' | 'BUSINESS' | 'ENTERPRISE' });
  const [days, setDays] = useState(7);
  const [paywall, setPaywall] = useState(false);
  const [plan, setPlan] = useState<'FREE' | 'PRO' | 'BUSINESS' | 'ENTERPRISE'>('PRO');
  const [cycle, setCycle] = useState<'biweekly' | 'monthly' | 'yearly'>('monthly');
  const [text, setText] = useState('');
  const [call, setCall] = useState(false);
  const [msgs, setMsgs] = useState([{ id: '1', me: false, txt: 'Hello! Welcome to JCV CHAT FĀNYÌ.', tr: '¡Hola! Bienvenido a JCV CHAT FĀNYÌ.' }]);

  useEffect(() => { if (days === 0 && user.plan !== 'FREE') setUser(p => ({ ...p, plan: 'FREE' })); }, [days]);

  const send = () => {
    if (!text.trim()) return;
    setMsgs(p => [...p, { id: Date.now().toString(), me: true, txt: text, tr: user.plan !== 'FREE' ? `[Qwen 99%]: ${text} (Traducido)` : undefined }]);
    setText('');
    setTimeout(() => {
      setMsgs(p => [...p, { id: (Date.now()+1).toString(), me: false, txt: 'Testing global secure connection.', tr: user.plan !== 'FREE' ? 'Probando conexión segura global.' : undefined }]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-2 text-white font-sans selection:bg-teal-500">
      <div className="w-full max-w-md h-[760px] bg-slate-900 rounded-[36px] shadow-2xl border-4 border-slate-800 overflow-hidden flex flex-col relative">
        <div className="bg-black/40 px-4 py-1.5 border-b border-slate-800 flex justify-between text-[9px] text-slate-400">
          <div className="flex items-center gap-1 text-emerald-400 font-bold"><ShieldCheck size={11} /><span>MÁXIMA SEGURIDAD ANTIVIRUS ACTIVA</span></div>
          <div className="flex items-center gap-1 text-cyan-400"><Lock size={9} /><span>CIFRADO E2EE</span></div>
        </div>
        <div className="bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 px-4 py-2.5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2">
            <img src={user.avatar} className="w-8 h-8 rounded-full object-cover" alt="U" />
            <div>
              <h1 className="text-xs font-black tracking-wider">JCV CHAT FĀNYÌ</h1>
              <div className="flex items-center gap-1 text-[9px] opacity-95">
                <span className="bg-black/30 px-1 rounded font-extrabold text-amber-300">PLAN: {user.plan}</span>
                <span>• {days > 0 ? `${days} días gratis` : 'Modo Básico'}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <button onClick={() => setCall(true)} className="p-1 hover:bg-white/10 rounded-full"><Phone size={14} /></button>
            <button onClick={() => setCall(true)} className="p-1 hover:bg-white/10 rounded-full"><Video size={14} /></button>
            <button onClick={() => setPaywall(true)} className="bg-amber-400 text-slate-950 p-1.5 rounded-full font-bold shadow-sm"><CreditCard size={12} /></button>
          </div>
        </div>
        <div className="flex-1 bg-slate-900/95 p-3 overflow-y-auto space-y-2.5">
          {msgs.map(m => (
            <div key={m.id} className={`flex ${m.me ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-xl px-3 py-1.5 text-xs shadow-sm ${m.me ? 'bg-teal-600 text-white rounded-tr-none' : 'bg-slate-800 text-slate-100 rounded-tl-none'}`}>
                <p>{m.txt}</p>
                {m.tr ? (
                  <div className="mt-1 pt-0.5 border-t border-white/10 text-[10px] text-cyan-200 flex items-center gap-1"><Languages size={9} /><span>{m.tr}</span></div>
                ) : (!m.me && (
                  <button onClick={() => setPaywall(true)} className="mt-1.5 w-full bg-slate-950 text-amber-400 text-[9px] font-bold py-0.5 px-1.5 rounded border border-amber-400/20 flex items-center justify-center gap-1"><Sparkles size={9} /> Desbloquear traducción por \$150</button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="p-2 bg-slate-950 border-t border-slate-800 flex gap-2">
          <input type="text" placeholder={user.plan === 'FREE' ? "Mensajes sin traducción..." : "Traducción por Qwen activa..."} value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} className="flex-1 bg-slate-900 rounded-full px-3 py-1 text-xs text-white border border-slate-700 focus:outline-none focus:border-cyan-500" />
          <button onClick={send} className="bg-teal-600 text-white p-1.5 rounded-full"><Send size={12} /></button>
        </div>
        <div className="absolute bottom-14 left-3">
          <button onClick={() => setDays(0)} className="bg-rose-600/70 text-[8px] px-1.5 py-0.5 rounded-full text-white"><RefreshCw size={8} className="inline mr-0.5" /> Terminar Trial</button>
        </div>
        {paywall && (
          <div className="absolute inset-0 bg-black/80 z-50 flex flex-col justify-end">
            <div className="bg-slate-950 border-t border-amber-400 rounded-t-2xl p-4 max-h-[85%] overflow-y-auto space-y-3 text-white">
              <div className="flex justify-between items-center"><h3 className="text-xs font-black text-amber-400 flex items-center gap-1"><Sparkles size={12} /> JCV CHAT FĀNYÌ MONETIZACIÓN</h3><button onClick={() => setPaywall(false)} className="text-[10px] text-slate-400">Cerrar</button></div>
              <div className="grid grid-cols-3 gap-1 bg-slate-900 p-1 rounded border border-slate-800 text-[9px] text-center">
                {(['biweekly', 'monthly', 'yearly'] as const).map(c => (<button key={c} onClick={() => setCycle(c)} className={`py-0.5 rounded ${selectedCycle === c ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400'}`}>{c === 'biweekly' ? '15 días' : c === 'monthly' ? 'Mensual' : 'Anual'}</button>))}
              </div>
              <div className="space-y-1">
                {(['FREE', 'PRO', 'BUSINESS', 'ENTERPRISE'] as const).map(p => (
                  <div key={p} onClick={() => setPlan(p)} className={`p-2 rounded-lg border text-left flex justify-between items-center ${selectedPlan === p ? 'border-amber-400 bg-amber-400/5' : 'border-slate-800 bg-slate-900'}`}>
                    <div><span className="text-[11px] font-black block">{p}</span><span className="text-[8px] text-slate-400 block">{p === 'FREE' ? 'Básico sin traducción.' : p === 'PRO' ? 'Texto Qwen 99% + Grupos.' : p === 'BUSINESS' ? 'Notas de voz y llamadas con tu voz.' : 'Video en vivo + API Empresa.'}</span></div>
                    <span className="text-xs font-bold text-amber-300">\${PRICES[p][cycle]}</span>
                  </div>
                ))}
              </div>
              <div className="p-2 bg-slate-900 rounded text-[8px] text-slate-400 border border-slate-800"><span className="font-bold text-slate-300 block">Pasarelas Soportadas:</span><p>• México: Mercado Pago Suscripciones (15 días) | • Global: Stripe Billing y PayPal</p></div>
              <button onClick={() => { setUser(p => ({ ...p, plan: plan })); setPaywall(false); }} className="w-full bg-amber-400 text-slate-950 font-black text-xs py-2 rounded-lg">Confirmar Configuración de Plan</button>
            </div>
          </div>
        )}
        {call && (
          <div className="absolute inset-0 bg-slate-950 z-50 flex flex-col justify-between p-6 items-center text-white">
            <div className="my-auto text-center space-y-2">
              <div className="w-16 h-16 bg-teal-600 rounded-full mx-auto flex items-center justify-center animate-pulse"><User size={24} /></div>
              <h4 className="text-xs font-bold">Llamada Internacional</h4>
              <p className="text-[9px] text-emerald-400">Traducción de voz simultánea activa</p>
            </div>
            <button onClick={() => setCall(false)} className="w-full bg-rose-600 text-xs py-2 rounded-lg font-bold">Colgar</button>
          </div>
        )}
      </div>
    </div>
  );
}

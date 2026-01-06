
import React, { useState, useRef, useEffect } from 'react';
import { generateBoltResponseStream } from '../services/geminiService';
import { ChatMessage, Step } from '../types';

interface ChatSidebarProps {
  isOpen: boolean;
  currentFiles: any[];
  onStepsReady: (steps: Step[]) => Promise<void>;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({ isOpen, currentFiles, onStepsReady }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'مرحباً! أنا بولت العربي. اطلب مني أي تطبيق وسأقوم ببرمجته أمامك فوراً.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const stream = await generateBoltResponseStream(userMsg, currentFiles);
      let fullContent = "";
      
      // ننتظر أول جزء من البيانات للبدء بالعرض
      for await (const chunk of stream) {
        fullContent += chunk.text;
      }

      const result = JSON.parse(fullContent || "{}");
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: result.explanation || "تم معالجة الطلب.", 
        steps: result.steps 
      }]);

      if (result.steps) {
        await onStepsReady(result.steps);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: 'عذراً، حدث خطأ أثناء الاتصال. تأكد من مفتاح API.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <aside className="w-[440px] flex flex-col bg-[#050505] border-l border-white/5 z-40 transition-all duration-300">
      <div className="h-14 flex items-center px-6 border-b border-white/5 bg-black/20 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_12px_#10b981]"></div>
            <div className="absolute inset-0 w-3 h-3 bg-emerald-500 rounded-full animate-ping opacity-25"></div>
          </div>
          <span className="font-bold text-sm tracking-tight text-white">بولت العربي <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded ml-2">سريع</span></span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-start' : 'items-end'}`}>
            <div className={`max-w-[95%] p-4 rounded-2xl text-[13px] leading-relaxed transition-all ${
              msg.role === 'user' ? 'bg-white/5 border border-white/10 text-gray-200 shadow-sm' : 'bg-indigo-600/10 border border-indigo-500/20 text-indigo-50 shadow-indigo-500/5 shadow-lg'
            }`}>
              <div className="whitespace-pre-wrap">{msg.content}</div>
              
              {msg.steps && (
                <div className="mt-4 space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                  {msg.steps.map((step, si) => (
                    <div key={si} className="flex items-center gap-3 p-3 bg-black/40 rounded-xl border border-white/5 group hover:border-indigo-500/40 transition-all cursor-default">
                      <div className="w-6 h-6 flex items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                      </div>
                      <div className="flex-1">
                        <div className="text-[11px] font-bold text-gray-200">{step.title}</div>
                        <div className="text-[9px] text-gray-500 group-hover:text-gray-400 transition-colors">{step.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex flex-col items-end gap-2 animate-pulse">
             <div className="h-4 w-32 bg-white/5 rounded-lg"></div>
             <div className="h-20 w-full bg-white/5 rounded-2xl border border-white/10"></div>
          </div>
        )}
      </div>

      <div className="p-6 bg-[#050505] border-t border-white/5">
        <div className="relative group">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
            placeholder="مثال: اصنع تطبيق مهام (Todo App) عصري..."
            className="w-full bg-[#0a0a0a] border border-white/10 group-hover:border-indigo-500/40 rounded-2xl p-4 pl-14 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none h-28 custom-scrollbar placeholder-gray-600 shadow-inner text-white"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute left-3 bottom-3 p-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-800 text-white rounded-xl transition-all shadow-xl active:scale-95 flex items-center justify-center"
          >
            {isLoading ? (
               <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
               <svg className="w-5 h-5 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            )}
          </button>
        </div>
        <p className="mt-3 text-[9px] text-gray-600 text-center tracking-widest uppercase font-bold">Turbo Engine: Gemini 3 Flash</p>
      </div>
    </aside>
  );
};

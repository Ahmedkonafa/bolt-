
import React, { useState } from 'react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'share' | 'google'>('share');
  
  if (!isOpen) return null;

  const projectUrl = window.location.href;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('تم النسخ بنجاح!');
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-2xl bg-[#0d0d0d] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-500/10">
        <div className="flex border-b border-white/5">
          <button 
            onClick={() => setActiveTab('share')}
            className={`flex-1 py-4 text-xs font-black transition-all ${activeTab === 'share' ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            رابط سريع
          </button>
          <button 
            onClick={() => setActiveTab('google')}
            className={`flex-1 py-4 text-xs font-black transition-all ${activeTab === 'google' ? 'bg-emerald-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            التشغيل على جوجل (Firebase)
          </button>
        </div>

        <div className="p-10">
          {activeTab === 'share' ? (
            <div className="animate-in slide-in-from-right-4 duration-300">
              <h2 className="text-2xl font-black text-white mb-4 tracking-tighter">🚀 شارك الرابط فوراً</h2>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">أرسل هذا الرابط لصديقك ليدخل معك الآن ويجرب البرمجة بالذكاء الاصطناعي.</p>
              
              <div className="bg-black/50 border border-white/5 rounded-2xl p-4 flex items-center gap-3 mb-10 shadow-inner">
                <input readOnly value={projectUrl} className="bg-transparent flex-1 text-xs text-indigo-400 font-mono outline-none truncate" />
                <button onClick={() => copyToClipboard(projectUrl)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg active:scale-95">نسخ</button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="text-[10px] text-gray-500 mb-1 font-black uppercase">الخطوة 1</div>
                  <div className="text-xs text-gray-300">انسخ الرابط أعلاه وأرسله في واتساب أو تليجرام.</div>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="text-[10px] text-gray-500 mb-1 font-black uppercase">الخطوة 2</div>
                  <div className="text-xs text-gray-300">بمجرد دخول صديقك، سيتمكن من طلب تعديلات.</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-in slide-in-from-left-4 duration-300">
              <h2 className="text-2xl font-black text-white mb-4 tracking-tighter">☁️ تشغيل الموقع على جوجل</h2>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">لجعل موقعك متاحاً للأبد عبر خدمة Firebase من جوجل، اتبع الخطوات البسيطة التالية:</p>
              
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 items-start">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-sm font-black shrink-0">1</div>
                  <div>
                    <div className="text-xs font-bold text-white mb-1">تثبيت أدوات جوجل</div>
                    <code className="text-[10px] bg-black p-1 rounded text-emerald-400">npm install -g firebase-tools</code>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 items-start">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-sm font-black shrink-0">2</div>
                  <div>
                    <div className="text-xs font-bold text-white mb-1">تسجيل الدخول</div>
                    <code className="text-[10px] bg-black p-1 rounded text-emerald-400">firebase login</code>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 items-start">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-sm font-black shrink-0">3</div>
                  <div>
                    <div className="text-xs font-bold text-white mb-1">الرفع على خوادم جوجل</div>
                    <code className="text-[10px] bg-black p-1 rounded text-emerald-400">firebase deploy</code>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                 <p className="text-[10px] text-amber-500 leading-relaxed font-bold">ملاحظة: تحتاج إلى إنشاء مشروع في Firebase Console أولاً لتتمكن من النشر.</p>
              </div>
            </div>
          )}

          <button 
            onClick={onClose}
            className="w-full mt-10 bg-white/5 hover:bg-white/10 text-gray-300 py-4 rounded-2xl text-sm font-black transition-all border border-white/5"
          >
            إغلاق النافذة
          </button>
        </div>
      </div>
    </div>
  );
};

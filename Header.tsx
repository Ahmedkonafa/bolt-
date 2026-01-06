
import React from 'react';
import { TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  toggleSidebar: () => void;
  onPublish: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, toggleSidebar, onPublish }) => {
  return (
    <header className="h-14 bg-[#0d0d0d] border-b border-white/5 flex items-center justify-between px-6 z-20 shadow-2xl">
      <div className="flex items-center gap-6">
        <button 
          onClick={toggleSidebar}
          className="p-2.5 hover:bg-white/5 rounded-xl text-gray-400 transition-all active:scale-95"
          title="فتح/إغلاق القائمة"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-indigo-500/20 group-hover:rotate-12 transition-transform">
            B
          </div>
          <h1 className="text-sm font-black bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent hidden sm:block tracking-tighter uppercase">
            Bolt Arabic
          </h1>
        </div>
      </div>

      <div className="flex bg-white/5 backdrop-blur-md rounded-xl p-1 border border-white/5 shadow-inner">
        <button 
          onClick={() => setActiveTab(TabType.CODE)}
          className={`px-5 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeTab === TabType.CODE 
              ? 'bg-indigo-600 text-white shadow-xl' 
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          الكود
        </button>
        <button 
          onClick={() => setActiveTab(TabType.PREVIEW)}
          className={`px-5 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeTab === TabType.PREVIEW 
              ? 'bg-indigo-600 text-white shadow-xl' 
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          المعاينة
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={onPublish}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-xl text-xs font-black transition-all shadow-lg shadow-emerald-500/20 active:scale-95 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>
          نشر المشروع
        </button>
        <div className="w-9 h-9 rounded-full border-2 border-indigo-500/30 p-0.5 overflow-hidden hidden md:block">
          <img className="w-full h-full rounded-full object-cover" src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
        </div>
      </div>
    </header>
  );
};

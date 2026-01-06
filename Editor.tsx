
import React from 'react';
import { FileNode } from '../types';

interface EditorProps {
  file: FileNode | null;
  onChange: (content: string) => void;
}

export const Editor: React.FC<EditorProps> = ({ file, onChange }) => {
  if (!file) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-700 bg-black">
        <div className="w-24 h-24 mb-6 opacity-10 animate-pulse">
           <svg fill="currentColor" viewBox="0 0 24 24"><path d="M13 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V9l-7-7zm0 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z"/></svg>
        </div>
        <p className="text-[10px] font-black tracking-[0.2em] uppercase text-indigo-500/50">انتظار اختيار ملف</p>
      </div>
    );
  }

  const lines = (file.content || '').split('\n');

  return (
    <div className="flex-1 flex flex-col overflow-hidden font-mono bg-black">
      <div className="flex bg-[#050505] h-10 border-b border-white/5 items-center px-4">
        <div className="flex items-center gap-3 bg-black px-5 h-full border-t border-indigo-500 text-[10px] font-bold text-gray-200">
          <span className="w-2 h-2 rounded-full bg-blue-500/50 animate-pulse"></span>
          {file.name.toUpperCase()}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-12 bg-[#050505] text-[#222] text-right pr-4 pt-6 select-none border-l border-white/5 text-[9px] font-black">
          {lines.map((_, i) => (
            <div key={i} className="leading-6">{String(i + 1).padStart(2, '0')}</div>
          ))}
        </div>

        <textarea
          value={file.content}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent p-6 text-[13px] leading-6 outline-none resize-none text-gray-300 custom-scrollbar whitespace-pre overflow-x-auto ltr-content selection:bg-indigo-500/30"
          spellCheck={false}
          dir="ltr"
          style={{ 
            fontFamily: '"JetBrains Mono", "Fira Code", monospace',
            tabSize: 2
          }}
        />
      </div>

      <style>{`
        .ltr-content { direction: ltr !important; text-align: left !important; }
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
      `}</style>
    </div>
  );
};


import React, { useState, useMemo, useEffect } from 'react';
import { FileTree } from './components/FileTree';
import { Editor } from './components/Editor';
import { ChatSidebar } from './components/ChatSidebar';
import { Header } from './components/Header';
import { ShareModal } from './components/ShareModal';
import { FileNode, TabType, Step } from './types';

const INITIAL_FILES: FileNode[] = [
  {
    path: 'App.tsx',
    name: 'App.tsx',
    type: 'file',
    language: 'typescript',
    content: `import React from 'react';\n\nexport default function App() {\n  return (\n    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 text-center">\n      <div className="w-24 h-24 bg-indigo-600 rounded-3xl rotate-12 mb-8 flex items-center justify-center shadow-2xl shadow-indigo-500/50">\n         <span className="text-4xl font-black -rotate-12">B</span>\n      </div>\n      <h1 className="text-5xl font-black mb-4 tracking-tighter">بولت العربي</h1>\n      <p className="text-gray-400 max-w-md leading-relaxed text-lg font-light">مرحباً بك في أسرع بيئة تطوير عربية ذكية. اطلب أي تطبيق في الدردشة وسأقوم ببنائه لك في ثوانٍ.</p>\n    </div>\n  );\n}`
  },
  {
    path: 'index.html',
    name: 'index.html',
    type: 'file',
    language: 'html',
    content: `<!DOCTYPE html><html lang="ar" dir="rtl"><body><div id="root"></div></body></html>`
  }
];

export default function App() {
  const [files, setFiles] = useState<FileNode[]>(INITIAL_FILES);
  const [activeFile, setActiveFile] = useState<FileNode | null>(INITIAL_FILES[0]);
  const [activeTab, setActiveTab] = useState<TabType>(TabType.CODE);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>(['[Bolt] Arabic Turbo Engine Started...', '[Bolt] Ready for your instructions.']);

  const addTerminalLine = (line: string) => {
    setTerminalLines(prev => [...prev.slice(-100), `> ${line}`]);
  };

  const handlePublish = () => {
    addTerminalLine("[Google Cloud] Connecting to Firebase project...");
    setTimeout(() => addTerminalLine("[Build] Optimizing assets for production..."), 500);
    setTimeout(() => addTerminalLine("[Cloud] Project initialized successfully! Opening guide..."), 1200);
    setTimeout(() => {
      setIsShareModalOpen(true);
    }, 1500);
  };

  const executeSteps = async (steps: Step[]) => {
    for (const step of steps) {
      addTerminalLine(`[Turbo] Processing: ${step.title}...`);
      if (step.type === 'file' && step.path) {
        setFiles(prev => {
          const existingIdx = prev.findIndex(f => f.path === step.path);
          const newFile: FileNode = {
            path: step.path || '',
            name: step.path.split('/').pop() || '',
            type: 'file',
            content: step.content || '',
            language: step.path.split('.').pop() || 'typescript'
          };
          if (existingIdx >= 0) {
            const updated = [...prev];
            updated[existingIdx] = newFile;
            if (activeFile?.path === step.path) setActiveFile(newFile);
            return updated;
          }
          return [...prev, newFile];
        });
      } else if (step.type === 'shell') {
        addTerminalLine(`[Shell] ${step.content}`);
      }
      addTerminalLine(`[Done] ${step.title} OK.`);
    }
    if (steps.some(s => s.type === 'file')) setActiveTab(TabType.PREVIEW);
  };

  const previewSrc = useMemo(() => {
    const htmlFile = files.find(f => f.name === 'index.html')?.content || '<div id="root"></div>';
    const appContent = files.find(f => f.name === 'App.tsx')?.content || '';
    const cleanedCode = appContent
      .replace(/import.*;/g, '')
      .replace(/export default function/g, 'function')
      .replace(/export function/g, 'function');

    return `
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
        <head>
          <script src="https://cdn.tailwindcss.com"></script>
          <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@400;700&display=swap" rel="stylesheet">
          <style>
            body { font-family: 'IBM Plex Sans Arabic', sans-serif; background: #000; color: white; margin: 0; }
          </style>
        </head>
        <body>
          <div id="root"></div>
          <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
          <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
          <script type="text/babel">
            ${cleanedCode}
            const root = ReactDOM.createRoot(document.getElementById('root'));
            root.render(<App />);
          </script>
        </body>
      </html>
    `;
  }, [files]);

  return (
    <div className="flex flex-col h-screen bg-[#000] text-gray-300 overflow-hidden font-sans">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        onPublish={handlePublish}
      />
      
      <div className="flex flex-1 overflow-hidden relative">
        <ChatSidebar 
          isOpen={isSidebarOpen} 
          currentFiles={files} 
          onStepsReady={executeSteps}
        />

        <main className="flex-1 flex flex-col min-w-0 border-r border-white/5">
          <div className="flex-1 flex overflow-hidden">
            <div className="w-64 bg-[#050505] border-l border-white/5 hidden xl:block overflow-y-auto custom-scrollbar">
              <div className="p-4 flex items-center justify-between border-b border-white/5 h-12 bg-black/50 backdrop-blur-md">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                  المستكشف
                </span>
              </div>
              <FileTree nodes={files} onSelect={setActiveFile} activeFileName={activeFile?.name} />
            </div>

            <div className="flex-1 flex flex-col bg-[#050505]">
              {activeTab === TabType.CODE ? (
                <Editor file={activeFile} onChange={(c) => setFiles(prev => prev.map(f => f.path === activeFile?.path ? {...f, content: c} : f))} />
              ) : (
                <div className="flex-1 bg-white relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-indigo-500/20 z-10 animate-pulse"></div>
                  <iframe className="w-full h-full" title="Preview" srcDoc={previewSrc} />
                </div>
              )}
            </div>
          </div>

          <div className="h-44 bg-[#000] border-t border-white/5 font-mono text-[10px] p-5 overflow-y-auto custom-scrollbar shadow-2xl">
            <div className="flex items-center gap-3 mb-3 text-gray-600 border-b border-white/5 pb-2">
              <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
              <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
              <span className="ml-2 font-bold uppercase tracking-widest text-[9px]">Arabic Console Output</span>
            </div>
            {terminalLines.map((line, i) => (
              <div key={i} className="mb-1 flex gap-2">
                <span className="text-indigo-500 font-bold opacity-50">➜</span> 
                <span className={line.includes('Error') ? 'text-red-400' : 'text-emerald-400/80'}>{line}</span>
              </div>
            ))}
          </div>
        </main>
      </div>

      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
    </div>
  );
}

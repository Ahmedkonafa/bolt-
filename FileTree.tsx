
import React from 'react';
import { FileNode } from '../types';

interface FileTreeProps {
  nodes: FileNode[];
  onSelect: (node: FileNode) => void;
  activeFileName?: string;
  depth?: number;
}

export const FileTree: React.FC<FileTreeProps> = ({ nodes, onSelect, activeFileName, depth = 0 }) => {
  return (
    <div className="flex flex-col">
      {nodes.map((node, i) => (
        <div key={i}>
          <button
            onClick={() => onSelect(node)}
            className={`w-full flex items-center gap-2 px-4 py-1.5 text-sm transition-colors group ${
              activeFileName === node.name ? 'bg-indigo-600/20 text-indigo-400' : 'hover:bg-gray-800 text-gray-400'
            }`}
            style={{ paddingRight: `${(depth + 1) * 1}rem` }}
          >
            {node.type === 'folder' ? (
              <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            )}
            <span className="truncate">{node.name}</span>
          </button>
          {node.children && (
            <FileTree 
              nodes={node.children} 
              onSelect={onSelect} 
              activeFileName={activeFileName} 
              depth={depth + 1} 
            />
          )}
        </div>
      ))}
    </div>
  );
};

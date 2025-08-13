'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Undo,
  Redo,
  Type
} from 'lucide-react';

interface TextEditorProps {
  value?: string;
  onChange?: (e: { target: { value: string } }) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

const TextEditor: React.FC<TextEditorProps> = ({
  value = '',
  onChange,
  placeholder = 'Nhập nội dung...',
  className = '',
  disabled = false,
  required = false
}) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [history, setHistory] = useState<string[]>([value]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const editorRef = useRef<HTMLDivElement>(null);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value;
      updateWordCount(value);
    }
  }, [value]);

  const updateWordCount = (content: string) => {
    const textContent = content.replace(/<[^>]*>/g, '');
    setWordCount(textContent.length);
  };

  const addToHistory = (newValue: string) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newValue);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const newValue = history[newIndex];
      if (editorRef.current) {
        editorRef.current.innerHTML = newValue;
        if (onChange) {
          onChange({ target: { value: newValue } });
        }
        updateWordCount(newValue);
      }
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      const newValue = history[newIndex];
      if (editorRef.current) {
        editorRef.current.innerHTML = newValue;
        if (onChange) {
          onChange({ target: { value: newValue } });
        }
        updateWordCount(newValue);
      }
    }
  };

  const executeCommand = (command: string, value?: string) => {
    // Ensure editor is focused before executing command
    if (editorRef.current) {
      editorRef.current.focus();
      
      // Small delay to ensure focus is set
      setTimeout(() => {
        try {
          const success = document.execCommand(command, false, value);
          console.log(`Command ${command} executed:`, success);
          
          if (editorRef.current && onChange) {
            const content = editorRef.current.innerHTML;
            onChange({ target: { value: content } });
            addToHistory(content);
            updateWordCount(content);
          }
        } catch (error) {
          console.error(`Error executing command ${command}:`, error);
        }
      }, 10);
    }
  };

  const handleBold = (e: React.MouseEvent) => {
    e.preventDefault();
    executeCommand('bold');
  };
  
  const handleItalic = (e: React.MouseEvent) => {
    e.preventDefault();
    executeCommand('italic');
  };
  
  const handleUnderline = (e: React.MouseEvent) => {
    e.preventDefault();
    executeCommand('underline');
  };
  
  const handleHeading = (e: React.MouseEvent) => {
    e.preventDefault();
    executeCommand('formatBlock', 'h3');
  };

  const handleBulletList = (e: React.MouseEvent) => {
    e.preventDefault();
    executeCommand('insertUnorderedList');
  };
  
  const handleNumberedList = (e: React.MouseEvent) => {
    e.preventDefault();
    executeCommand('insertOrderedList');
  };
  
  const handleAlignLeft = (e: React.MouseEvent) => {
    e.preventDefault();
    executeCommand('justifyLeft');
  };
  
  const handleAlignCenter = (e: React.MouseEvent) => {
    e.preventDefault();
    executeCommand('justifyCenter');
  };
  
  const handleAlignRight = (e: React.MouseEvent) => {
    e.preventDefault();
    executeCommand('justifyRight');
  };

  const toolbarButtons = [
    { icon: Bold, onClick: handleBold, tooltip: 'Bold (Ctrl+B)', command: 'bold' },
    { icon: Italic, onClick: handleItalic, tooltip: 'Italic (Ctrl+I)', command: 'italic' },
    { icon: Underline, onClick: handleUnderline, tooltip: 'Underline (Ctrl+U)', command: 'underline' },
    { icon: Type, onClick: handleHeading, tooltip: 'Heading', command: 'heading' },
    { icon: List, onClick: handleBulletList, tooltip: 'Bullet List', command: 'list' },
    { icon: ListOrdered, onClick: handleNumberedList, tooltip: 'Numbered List', command: 'orderedList' },
    { icon: AlignLeft, onClick: handleAlignLeft, tooltip: 'Align Left', command: 'alignLeft' },
    { icon: AlignCenter, onClick: handleAlignCenter, tooltip: 'Align Center', command: 'alignCenter' },
    { icon: AlignRight, onClick: handleAlignRight, tooltip: 'Align Right', command: 'alignRight' },
  ];

  const isCommandActive = (command: string) => {
    try {
      switch (command) {
        case 'bold':
          return document.queryCommandState('bold');
        case 'italic':
          return document.queryCommandState('italic');
        case 'underline':
          return document.queryCommandState('underline');
        case 'list':
          return document.queryCommandState('insertUnorderedList');
        case 'orderedList':
          return document.queryCommandState('insertOrderedList');
        case 'alignLeft':
          return document.queryCommandState('justifyLeft');
        case 'alignCenter':
          return document.queryCommandState('justifyCenter');
        case 'alignRight':
          return document.queryCommandState('justifyRight');
        default:
          return false;
      }
    } catch {
      return false;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'b':
          e.preventDefault();
          executeCommand('bold');
          break;
        case 'i':
          e.preventDefault();
          executeCommand('italic');
          break;
        case 'u':
          e.preventDefault();
          executeCommand('underline');
          break;
        case 'z':
          if (e.shiftKey) {
            e.preventDefault();
            handleRedo();
          } else {
            e.preventDefault();
            handleUndo();
          }
          break;
        case 'y':
          e.preventDefault();
          handleRedo();
          break;
      }
    }
  };

  const handleInput = () => {
    if (editorRef.current && onChange) {
      const content = editorRef.current.innerHTML;
      onChange({ target: { value: content } });
      updateWordCount(content);
      
      setTimeout(() => {
        addToHistory(content);
      }, 1000);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  return (
    <div className={`border border-slate-600 rounded-lg bg-slate-700 ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 border-b border-slate-600 bg-slate-800 rounded-t-lg">
        <div className="flex items-center gap-1">
          {/* Formatting buttons */}
          {toolbarButtons.map(({ icon: Icon, onClick, tooltip, command }, index) => (
            <button
              key={index}
              type="button"
              onMouseDown={(e) => e.preventDefault()} // Prevent losing focus
              onClick={onClick}
              disabled={disabled}
              className={`h-8 w-8 p-0 rounded text-slate-300 hover:text-white hover:bg-slate-600 transition-colors ${
                isCommandActive(command) ? 'bg-slate-600 text-white' : ''
              } disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
              title={tooltip}
            >
              <Icon className="w-4 h-4" />
            </button>
          ))}
          
          <div className="w-px h-6 bg-slate-600 mx-2" />
          
          {/* History buttons */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleUndo}
            disabled={disabled || historyIndex <= 0}
            className="h-8 w-8 p-0 rounded text-slate-300 hover:text-white hover:bg-slate-600 disabled:opacity-50 flex items-center justify-center transition-colors"
            title="Undo (Ctrl+Z)"
          >
            <Undo className="w-4 h-4" />
          </button>
          
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleRedo}
            disabled={disabled || historyIndex >= history.length - 1}
            className="h-8 w-8 p-0 rounded text-slate-300 hover:text-white hover:bg-slate-600 disabled:opacity-50 flex items-center justify-center transition-colors"
            title="Redo (Ctrl+Y)"
          >
            <Redo className="w-4 h-4" />
          </button>
        </div>

        {/* Preview toggle and stats */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">
            {wordCount} ký tự
          </span>
          <button
            type="button"
            onClick={() => setIsPreviewMode(!isPreviewMode)}
            className="text-xs text-slate-300 hover:text-white hover:bg-slate-600 px-3 py-1 rounded transition-colors"
          >
            {isPreviewMode ? 'Chỉnh sửa' : 'Xem trước'}
          </button>
        </div>
      </div>

      {/* Editor/Preview Area */}
      <div className="relative">
        {isPreviewMode ? (
          <div 
            className="min-h-[200px] p-4 text-slate-300 prose prose-invert max-w-none editor-preview"
            dangerouslySetInnerHTML={{ __html: value }}
          />
        ) : (
          <div
            ref={editorRef}
            contentEditable={!disabled}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            className="min-h-[200px] p-4 text-white focus:outline-none resize-none editor-content"
            style={{
              minHeight: '200px',
              maxHeight: '400px',
              overflowY: 'auto'
            }}
            data-placeholder={placeholder}
            suppressContentEditableWarning={true}
          />
        )}
      </div>

      {/* Footer with tips */}
      <div className="px-4 py-2 border-t border-slate-600 bg-slate-800 rounded-b-lg">
        <div className="flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Rich Text Editor - Định dạng trực tiếp khi gõ
          </div>
          <div className="text-xs text-slate-500">
            Ctrl+B: Bold | Ctrl+I: Italic | Ctrl+U: Underline | Ctrl+Z: Undo
          </div>
        </div>
      </div>

      <style jsx>{`
        .editor-content:empty:before {
          content: attr(data-placeholder);
          color: #94a3b8;
          pointer-events: none;
        }
        
        .editor-content h3,
        .editor-preview h3 {
          font-size: 1.125rem !important;
          font-weight: 600 !important;
          margin: 0.5rem 0 !important;
          color: white !important;
          line-height: 1.4 !important;
        }
        
        .editor-content ul, 
        .editor-content ol,
        .editor-preview ul,
        .editor-preview ol {
          margin: 0.5rem 0 !important;
          padding-left: 1.5rem !important;
          color: white !important;
        }
        
        .editor-content ul,
        .editor-preview ul {
          list-style-type: disc !important;
        }
        
        .editor-content ol,
        .editor-preview ol {
          list-style-type: decimal !important;
        }
        
        .editor-content li,
        .editor-preview li {
          margin: 0.25rem 0 !important;
          display: list-item !important;
          color: white !important;
          line-height: 1.5 !important;
        }
        
        .editor-content strong,
        .editor-preview strong {
          font-weight: bold !important;
          color: white !important;
        }
        
        .editor-content em,
        .editor-preview em {
          font-style: italic !important;
          color: white !important;
        }
        
        .editor-content u,
        .editor-preview u {
          text-decoration: underline !important;
          color: white !important;
        }

        /* Ensure list bullets and numbers are visible */
        .editor-content ul li::marker,
        .editor-preview ul li::marker {
          color: #94a3b8 !important;
        }
        
        .editor-content ol li::marker,
        .editor-preview ol li::marker {
          color: #94a3b8 !important;
        }

        /* Fix for alignment */
        .editor-content[style*="text-align: left"],
        .editor-preview [style*="text-align: left"] {
          text-align: left !important;
        }
        
        .editor-content[style*="text-align: center"],
        .editor-preview [style*="text-align: center"] {
          text-align: center !important;
        }
        
        .editor-content[style*="text-align: right"],
        .editor-preview [style*="text-align: right"] {
          text-align: right !important;
        }
      `}</style>
    </div>
  );
};

export default TextEditor;

import { useRef } from 'react';
import Editor, { Monaco, loader } from '@monaco-editor/react';

// Configure Monaco loader to use a dark theme immediately
loader.init().then(monaco => {
  monaco.editor.defineTheme('slide-hub-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'keyword', foreground: 'e78a53' },
      { token: 'string', foreground: 'a5b4fc' },
      { token: 'comment', foreground: '555560' },
      { token: 'function', foreground: 'dd9f80' },
      { token: 'variable', foreground: 'c1c1c1' },
    ],
    colors: {
      'editor.background': '#1a191d',
      'editor.foreground': '#c1c1c1',
      'editor.lineHighlightBackground': '#222222',
      'editorCursor.foreground': '#e78a53',
      'editor.selectionBackground': '#4b3022',
      'scrollbarSlider.background': '#333333',
      'scrollbarSlider.hoverBackground': '#444444',
      'scrollbarSlider.activeBackground': '#555555',
    }
  });
  monaco.editor.setTheme('slide-hub-dark');
});

interface CodeEditorProps {
  value: string;
  onChange?: (value: string | undefined) => void;
  height?: string;
  className?: string;
  language?: string;
}

// Dark loading placeholder to prevent white flash
function DarkLoader() {
  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      background: '#1a191d',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#555560',
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '0.9rem'
    }}>
      {/* Empty - no text to avoid any flash */}
    </div>
  );
}

export function CodeEditor({ 
  value, 
  onChange, 
  height = "60vh", 
  className = "", 
  language = "javascript" 
}: CodeEditorProps) {
  const monacoRef = useRef<Monaco | null>(null);

  const handleEditorDidMount = (_: any, monaco: Monaco) => {
    monacoRef.current = monaco;
    // Theme is already set globally, but ensure it's applied
    monaco.editor.setTheme('slide-hub-dark');
  };

  // Stop propagation of key events to prevent slide navigation
  const stopPropagation = (e: React.KeyboardEvent) => {
    e.stopPropagation();
  };

  return (
    <div 
      className={className} 
      style={{ height, overflow: 'hidden', background: '#1a191d' }}
      onKeyDown={stopPropagation}
    >
      <Editor
        height="100%"
        defaultLanguage={language}
        language={language}
        theme="vs-dark"
        value={value}
        onChange={onChange}
        onMount={handleEditorDidMount}
        loading={<DarkLoader />}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'JetBrains Mono', monospace",
          wordWrap: 'on',
          padding: { top: 16, bottom: 16 },
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          renderLineHighlight: 'all',
          hideCursorInOverviewRuler: true,
          overviewRulerBorder: false,
          overviewRulerLanes: 0,
        }}
      />
    </div>
  );
}

import { useRef } from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  height?: string;
  className?: string;
  language?: string;
}

export function MarkdownEditor({ value, onChange, height = "60vh", className = "", language = "markdown" }: MarkdownEditorProps) {
  const monacoRef = useRef<Monaco | null>(null);

  const handleEditorDidMount = (_: any, monaco: Monaco) => {
    monacoRef.current = monaco;

    // Define the theme to match the app
    monaco.editor.defineTheme('slide-hub-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'keyword', foreground: 'e78a53' },
        { token: 'string', foreground: 'a5b4fc' },
        { token: 'comment', foreground: '555560' },
      ],
      colors: {
        'editor.background': '#1a191d',
        'editor.foreground': '#c1c1c1',
        'editor.lineHighlightBackground': '#222222',
        'editorCursor.foreground': '#e78a53',
        'editor.selectionBackground': '#4b3022',
      }
    });

    monaco.editor.setTheme('slide-hub-dark');

    // Only register snippets if we are in markdown mode ?
    // Actually keep it simple.
    monaco.languages.registerCompletionItemProvider('markdown', {
      provideCompletionItems: (model: editor.ITextModel, position: any) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn,
        };

        return {
          suggestions: [
            {
              label: 'compare-snippet',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: [
                '```compare',
                '// 🟢 Bad Code',
                '${1:function bad() {}}',
                '===',
                '// 🟢 Good Code',
                '${2:function good() {}}',
                '```'
              ].join('\n'),
              documentation: 'Insert a code comparison block',
              range: range,
            },
            {
              label: 'slide-header',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: [
                '---',
                '',
                '## ${1:Slide Title}',
                '',
                '${2:Content...}'
              ].join('\n'),
              documentation: 'Insert a new slide separator and header',
              range: range,
            },
            {
              label: 'notes-block',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: [
                '<!-- notes:',
                '${1:Speaker notes go here...}',
                '-->'
              ].join('\n'),
              documentation: 'Insert speaker notes',
              range: range,
            }
          ]
        };
      }
    });
  };

  return (
    <div className={className} style={{ height, border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
      <Editor
        height="100%"
        defaultLanguage={language}
        value={value}
        onChange={onChange}
        onMount={handleEditorDidMount}
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
        }}
      />
    </div>
  );
}

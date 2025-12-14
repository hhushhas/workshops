import { useState, memo } from 'react';
import { CodeEditor } from './CodeEditor';
import { Copy, Check } from 'lucide-react';

interface ComparisonBlockProps {
  content: string;
}

const CopyButton = memo(function CopyButton({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button className="copy-btn" onClick={handleCopy} title="Copy Code">
      {copied ? <Check size={16} color="var(--accent)" /> : <Copy size={16} />}
    </button>
  );
});

const LANGUAGES = [
  { id: 'typescript', label: 'TypeScript' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'go', label: 'Go' },
  { id: 'python', label: 'Python' },
  { id: 'css', label: 'CSS' },
  { id: 'html', label: 'HTML' },
  { id: 'json', label: 'JSON' },
  { id: 'rust', label: 'Rust' },
  { id: 'tsx', label: 'TSX' },
  { id: 'jsx', label: 'JSX' },
];

interface EditorPaneProps {
  initialCode: string;
}

const EditorPane = memo(function EditorPane({ initialCode }: EditorPaneProps) {
  const [code, setCode] = useState(initialCode);
  const [language, setLanguage] = useState('typescript');

  return (
    <div className="comparison-editor-wrapper">
      <div className="editor-toolbar">
         <div className="lang-selector-wrapper">
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="lang-select"
            >
              {LANGUAGES.map(lang => (
                <option key={lang.id} value={lang.id}>{lang.label}</option>
              ))}
            </select>
         </div>
         <CopyButton content={code} />
      </div>
      <CodeEditor 
        value={code} 
        onChange={(val) => setCode(val || '')}
        language={language}
        className="comparison-editor"
        height="100%"
      />
    </div>
  );
});

export const ComparisonBlock = memo(function ComparisonBlock({ content }: ComparisonBlockProps) {
  // Parse content ONCE on mount - use state initializer
  const [parts] = useState(() => {
    const cleanContent = content.replace(/\n$/, '');
    const splitParts = cleanContent.split(/\n={3,}\n/);
    return splitParts.length > 0 ? splitParts.map(p => p.trim()) : ['// No content'];
  });

  return (
    <div className="code-comparison">
      {parts.map((part, idx) => (
        <EditorPane key={idx} initialCode={part} />
      ))}
    </div>
  );
});

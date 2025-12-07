import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Slide } from '../utils/markdownParser';
import '../styles/slides.css';

interface SlideViewerProps {
  slide: Slide | undefined;
  slideIndex: number;
}

export function SlideViewer({ slide, slideIndex }: SlideViewerProps) {
  if (!slide) {
    return (
      <div className="slide-container">
        <div className="slide-content">
          <div className="slide-inner">
            <h1>No slides loaded</h1>
            <p>Add a Markdown file to public/slides/ to get started.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="slide-container">
      <div className="slide-content">
        <div className="slide-inner" key={slideIndex}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              code({ className, children }) {
                const match = /language-(\w+)/.exec(className || '');
                const inline = !match;
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={oneDark as any}
                    language={match[1]}
                    PreTag="div"
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {slide.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}

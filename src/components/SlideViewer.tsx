import { useMemo, memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Slide } from '../utils/markdownParser';
import { ComparisonBlock } from './ComparisonBlock';
import '../styles/slides.css';

interface SlideViewerProps {
  slide: Slide | undefined;
  slideIndex: number;
}

// Extract code content from markdown code block
function extractCompareContent(markdown: string): string | null {
  const match = markdown.match(/```compare\n([\s\S]*?)```/);
  return match ? match[1] : null;
}

function extractCompareImgContent(markdown: string): string[] | null {
  const match = markdown.match(/```compare-img\n([\s\S]*?)```/);
  if (!match) return null;
  return match[1].split(/\n={3,}\n/);
}

export const SlideViewer = memo(function SlideViewer({ slide, slideIndex }: SlideViewerProps) {
  // Memoize comparison detection and content extraction
  const comparisonData = useMemo(() => {
    if (!slide) return { isComparison: false, isImgComparison: false, content: null, imgParts: null };
    
    const isComparison = slide.content.includes('```compare') && !slide.content.includes('```compare-img');
    const isImgComparison = slide.content.includes('```compare-img');
    
    return {
      isComparison,
      isImgComparison,
      content: isComparison ? extractCompareContent(slide.content) : null,
      imgParts: isImgComparison ? extractCompareImgContent(slide.content) : null,
    };
  }, [slide]);

  // Memoize ReactMarkdown components to prevent recreation
  const markdownComponents = useMemo(() => ({
    pre: ({ children }: any) => <pre className="default-pre">{children}</pre>,
    code({ className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      const inline = !match;

      return !inline && match ? (
        <div className="code-block-wrapper" style={{ margin: 0, boxShadow: 'none', border: 'none', borderRadius: 0 }}>
          <div className="code-header">
            <div className="window-dots">
              <div className="dot dot-red" />
              <div className="dot dot-yellow" />
              <div className="dot dot-green" />
            </div>
            <span className="code-label">{match[1].toUpperCase()}</span>
          </div>
          <SyntaxHighlighter
            style={oneDark as any}
            language={match[1]}
            PreTag="div"
            customStyle={{ margin: 0, border: 'none', background: 'transparent' }}
            showLineNumbers={true}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  }), []);

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

  const { isComparison, isImgComparison, content, imgParts } = comparisonData;

  // For CODE COMPARISON slides - render ComparisonBlock DIRECTLY, not through ReactMarkdown
  if (isComparison && content) {
    return (
      <div className="slide-container">
        <div className="slide-content full-width">
          <div className="slide-inner comparison-mode">
            <ComparisonBlock content={content} key={`compare-${slideIndex}`} />
          </div>
        </div>
      </div>
    );
  }

  // For IMAGE COMPARISON slides - render directly
  if (isImgComparison && imgParts) {
    return (
      <div className="slide-container">
        <div className="slide-content full-width">
          <div className="slide-inner comparison-mode">
            <div className="code-comparison">
              {imgParts.map((part: string, idx: number) => {
                const match = part.match(/\((.*?)\)/);
                const src = match ? match[1] : '';
                
                if (!src) return <div key={idx} style={{color: 'red'}}>Invalid Image</div>;

                return (
                  <div key={idx} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    background: '#000',
                    height: '100%',
                    overflow: 'hidden'
                  }}>
                    <img 
                      src={src} 
                      alt="Comparison" 
                      style={{ 
                        maxWidth: '100%', 
                        maxHeight: '100%', 
                        objectFit: 'contain', 
                        borderRadius: '0',
                        margin: 0 
                      }} 
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // For REGULAR slides - use ReactMarkdown
  return (
    <div className="slide-container">
      <div className="slide-content">
        <div className="slide-inner">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={markdownComponents}
          >
            {slide.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
});

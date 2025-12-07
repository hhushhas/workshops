import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import '../styles/slides.css';

export function SlideViewer( { slide, slideIndex, totalSlides } ) {
    if ( !slide ) {
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
                <div className="slide-inner" key={ slideIndex }>
                    <ReactMarkdown
                        remarkPlugins={ [ remarkGfm ] }
                        components={ {
                            code( { node, inline, className, children, ...props } ) {
                                const match = /language-(\w+)/.exec( className || '' );
                                return !inline && match ? (
                                    <SyntaxHighlighter
                                        style={ oneDark }
                                        language={ match[ 1 ] }
                                        PreTag="div"
                                        { ...props }
                                    >
                                        { String( children ).replace( /\n$/, '' ) }
                                    </SyntaxHighlighter>
                                ) : (
                                    <code className={ className } { ...props }>
                                        { children }
                                    </code>
                                );
                            },
                        } }
                    >
                        { slide.content }
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}

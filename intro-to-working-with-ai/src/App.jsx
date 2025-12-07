import { useState, useCallback } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { useSlideParser } from './hooks/useSlideParser';
import { useKeyboardNav } from './hooks/useKeyboardNav';
import { SlideViewer } from './components/SlideViewer';
import { SlideNavigation } from './components/SlideNavigation';
import { PresenterMode } from './components/PresenterMode';
import { ThemeToggle } from './components/ThemeToggle';
import './styles/index.css';
import './styles/slides.css';

function SlideApp() {
  const { slides, loading, error, reload } = useSlideParser( '/slides/example.md' );
  const [ currentSlide, setCurrentSlide ] = useState( 0 );
  const [ presenterMode, setPresenterMode ] = useState( false );
  const [ showMenu, setShowMenu ] = useState( false );

  const navigate = useCallback( ( index ) => {
    if ( index >= 0 && index < slides.length ) {
      setCurrentSlide( index );
      setShowMenu( false );
    }
  }, [ slides.length ] );

  const goNext = useCallback( () => {
    navigate( currentSlide + 1 );
  }, [ currentSlide, navigate ] );

  const goPrev = useCallback( () => {
    navigate( currentSlide - 1 );
  }, [ currentSlide, navigate ] );

  const togglePresenter = useCallback( () => {
    setPresenterMode( p => !p );
  }, [] );

  const toggleMenu = useCallback( () => {
    setShowMenu( m => !m );
  }, [] );

  useKeyboardNav( {
    onNext: goNext,
    onPrev: goPrev,
    onTogglePresenter: togglePresenter,
    onToggleMenu: toggleMenu,
  } );

  if ( loading ) {
    return <div className="slide-loading">Loading slides...</div>;
  }

  if ( error ) {
    return (
      <div className="slide-error">
        <h2>Failed to load slides</h2>
        <p>{ error }</p>
        <button onClick={ reload }>Try Again</button>
      </div>
    );
  }

  if ( slides.length === 0 ) {
    return (
      <div className="slide-error">
        <h2>No slides found</h2>
        <p>Add a Markdown file to public/slides/example.md</p>
      </div>
    );
  }

  if ( presenterMode ) {
    return (
      <PresenterMode
        slides={ slides }
        currentSlide={ currentSlide }
        onNavigate={ navigate }
        onClose={ togglePresenter }
      />
    );
  }

  return (
    <>
      <ThemeToggle />
      <SlideViewer
        slide={ slides[ currentSlide ] }
        slideIndex={ currentSlide }
        totalSlides={ slides.length }
      />
      <SlideNavigation
        currentSlide={ currentSlide }
        totalSlides={ slides.length }
        onNavigate={ navigate }
        onTogglePresenter={ togglePresenter }
        onToggleMenu={ toggleMenu }
        showMenu={ showMenu }
        slides={ slides }
      />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <SlideApp />
    </ThemeProvider>
  );
}

export default App;

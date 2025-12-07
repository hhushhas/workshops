import { useEffect, useCallback } from 'react';

export function useKeyboardNav( { onNext, onPrev, onTogglePresenter, onToggleMenu } ) {
    const handleKeyDown = useCallback( ( e ) => {
        // Ignore if user is typing in an input
        if ( e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' ) {
            return;
        }

        switch ( e.key ) {
            case 'ArrowRight':
            case 'ArrowDown':
            case ' ':
            case 'PageDown':
                e.preventDefault();
                onNext?.();
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                onPrev?.();
                break;
            case 'p':
            case 'P':
                e.preventDefault();
                onTogglePresenter?.();
                break;
            case 'm':
            case 'M':
                e.preventDefault();
                onToggleMenu?.();
                break;
            case 'f':
            case 'F':
                e.preventDefault();
                toggleFullscreen();
                break;
            case 'Escape':
                if ( document.fullscreenElement ) {
                    document.exitFullscreen();
                }
                break;
            default:
                break;
        }
    }, [ onNext, onPrev, onTogglePresenter, onToggleMenu ] );

    useEffect( () => {
        window.addEventListener( 'keydown', handleKeyDown );
        return () => window.removeEventListener( 'keydown', handleKeyDown );
    }, [ handleKeyDown ] );
}

function toggleFullscreen() {
    if ( !document.fullscreenElement ) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

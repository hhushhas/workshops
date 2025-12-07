import { useEffect, useCallback } from 'react';

interface UseKeyboardNavProps {
  onNext?: () => void;
  onPrev?: () => void;
  onFirst?: () => void;
  onLast?: () => void;
  onTogglePresenter?: () => void;
  onToggleMenu?: () => void;
  onToggleBottomBar?: () => void;
  onToggleNotes?: () => void;
  onToggleTime?: () => void;
  onToggleHelp?: () => void;
  onToggleZenMode?: () => void;
  onToggleControls?: () => void;
}

export function useKeyboardNav({ 
  onNext, 
  onPrev, 
  onFirst,
  onLast,
  onTogglePresenter, 
  onToggleMenu,
  onToggleBottomBar,
  onToggleNotes,
  onToggleTime,
  onToggleHelp,
  onToggleZenMode,
  onToggleControls,
}: UseKeyboardNavProps) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Ignore if user is typing in an input
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
      return;
    }

    switch (e.key) {
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
      case 'b':
      case 'B':
        e.preventDefault();
        onToggleBottomBar?.();
        break;
      case 'n':
      case 'N':
        e.preventDefault();
        onToggleNotes?.();
        break;
      case 't':
      case 'T':
        e.preventDefault();
        onToggleTime?.();
        break;
      case '?':
        e.preventDefault();
        onToggleHelp?.();
        break;
      case 'z':
      case 'Z':
        e.preventDefault();
        onToggleZenMode?.();
        break;
      case 'c':
      case 'C':
        e.preventDefault();
        onToggleControls?.();
        break;
      case 'Home':
        e.preventDefault();
        onFirst?.();
        break;
      case 'End':
        e.preventDefault();
        onLast?.();
        break;
      case 'f':
      case 'F':
        e.preventDefault();
        toggleFullscreen();
        break;
      case 'Escape':
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
        break;
      default:
        break;
    }
  }, [onNext, onPrev, onFirst, onLast, onTogglePresenter, onToggleMenu, onToggleBottomBar, onToggleNotes, onToggleTime, onToggleHelp, onToggleZenMode, onToggleControls]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

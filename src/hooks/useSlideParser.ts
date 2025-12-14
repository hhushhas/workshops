import { useState, useEffect, useCallback } from 'react';
import { parseMarkdownSlides, Slide } from '../utils/markdownParser';

interface UseSlideParserReturn {
  slides: Slide[];
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
}

export function useSlideParser(slidePath: string = '/slides/example.md'): UseSlideParserReturn {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSlides = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(slidePath);
      if (!response.ok) {
        throw new Error(`Failed to load slides: ${response.status}`);
      }
      
      const markdown = await response.text();
      const parsed = parseMarkdownSlides(markdown);
      setSlides(parsed);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setSlides([]);
    } finally {
      setLoading(false);
    }
  }, [slidePath]);

  useEffect(() => {
    loadSlides();
  }, [loadSlides]);

  return { slides, loading, error, reload: loadSlides };
}

import { useState, useEffect, useCallback } from 'react';
import { parseMarkdownSlides } from '../utils/markdownParser';

export function useSlideParser( slidePath = '/slides/example.md' ) {
    const [ slides, setSlides ] = useState( [] );
    const [ loading, setLoading ] = useState( true );
    const [ error, setError ] = useState( null );

    const loadSlides = useCallback( async () => {
        try {
            setLoading( true );
            setError( null );

            const response = await fetch( slidePath );
            if ( !response.ok ) {
                throw new Error( `Failed to load slides: ${ response.status }` );
            }

            const markdown = await response.text();
            const parsed = parseMarkdownSlides( markdown );
            setSlides( parsed );
        } catch ( err ) {
            setError( err.message );
            setSlides( [] );
        } finally {
            setLoading( false );
        }
    }, [ slidePath ] );

    useEffect( () => {
        loadSlides();
    }, [ loadSlides ] );

    return { slides, loading, error, reload: loadSlides };
}

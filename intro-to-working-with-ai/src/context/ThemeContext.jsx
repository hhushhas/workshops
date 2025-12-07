import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider( { children } ) {
    const [ theme, setTheme ] = useState( () => {
        const saved = localStorage.getItem( 'slideTheme' );
        return saved || 'dark';
    } );

    const [ fontSize, setFontSize ] = useState( () => {
        const saved = localStorage.getItem( 'slideFontSize' );
        return saved || 'medium';
    } );

    const [ accentColor, setAccentColor ] = useState( () => {
        const saved = localStorage.getItem( 'slideAccent' );
        return saved || '#6366f1';
    } );

    useEffect( () => {
        localStorage.setItem( 'slideTheme', theme );
        document.documentElement.setAttribute( 'data-theme', theme );
    }, [ theme ] );

    useEffect( () => {
        localStorage.setItem( 'slideFontSize', fontSize );
        const scale = fontSize === 'small' ? 0.85 : fontSize === 'large' ? 1.2 : 1;
        document.documentElement.style.setProperty( '--font-scale', scale );
    }, [ fontSize ] );

    useEffect( () => {
        localStorage.setItem( 'slideAccent', accentColor );
        document.documentElement.style.setProperty( '--accent', accentColor );
    }, [ accentColor ] );

    const toggleTheme = () => setTheme( t => t === 'dark' ? 'light' : 'dark' );

    return (
        <ThemeContext.Provider value={ {
            theme,
            setTheme,
            toggleTheme,
            fontSize,
            setFontSize,
            accentColor,
            setAccentColor,
        } }>
            { children }
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext( ThemeContext );
    if ( !context ) {
        throw new Error( 'useTheme must be used within ThemeProvider' );
    }
    return context;
}

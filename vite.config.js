import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig( {
  plugins: [ react(), {
    name: 'fs-api',
    configureServer( server ) {
      server.middlewares.use( '/api', async ( req, res, next ) => {
        if ( req.method === 'POST' ) {
          const url = req.url; // e.g., /save or /create
          let body = '';
          req.on( 'data', chunk => body += chunk );
          req.on( 'end', async () => {
            try {
              const { filename, content } = JSON.parse( body );
              const fs = await import( 'fs' );
              const path = await import( 'path' );

              // Ensure we are only writing to public/slides
              const targetPath = path.resolve( __dirname, 'public/slides', filename );

              if ( !targetPath.includes( 'public/slides' ) ) {
                throw new Error( 'Invalid path' );
              }

              if ( url === '/create' ) {
                if ( fs.existsSync( targetPath ) ) {
                  res.statusCode = 409;
                  res.end( JSON.stringify( { error: 'File already exists' } ) );
                  return;
                }
              }

              fs.writeFileSync( targetPath, content );
              res.setHeader( 'Content-Type', 'application/json' );
              res.end( JSON.stringify( { success: true, path: `/slides/${ filename }` } ) );
            } catch ( err ) {
              console.error( err );
              res.statusCode = 500;
              res.end( JSON.stringify( { error: err.message } ) );
            }
          } );
        } else {
          next();
        }
      } );
    }
  } ],
} )

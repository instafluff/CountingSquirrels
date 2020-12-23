require( "dotenv" ).config();
const fs = require( "fs" );
const Web = require( "webwebweb" );
const ComfyJS = require( "comfy.js" );
let counts = {};
if( fs.existsSync( "counts.json" ) ) {
    counts = JSON.parse( fs.readFileSync( "counts.json" ).toString() );
}
ComfyJS.onCommand = ( user, command, message, flags, extra ) => {
    if( command === "squirrel" ) {
        counts[ "squirrel" ] = ( counts[ "squirrel" ] || 0 ) + 1;
    }
    if( command === "savethesquirrels" ) {
        fs.writeFileSync( "counts.json", JSON.stringify( counts ) );
    }
};
ComfyJS.onChat = ( user, message, flags, self, extra ) => {
    counts[ "chat" ] = ( counts[ "chat" ] || 0 ) + 1;
};
ComfyJS.Init( "instafluff" );
Web.APIs[ "/" ] = ( qs, body, opts ) => {
    return counts;
};
Web.APIs[ "/chat" ] = ( qs, body, opts ) => {
    return counts[ "chat" ].toString();
};
Web.APIs[ "/squirrels" ] = ( qs, body, opts ) => {
    return counts[ "squirrel" ].toString();
};
Web.Run( process.env.PORT || 9000 );
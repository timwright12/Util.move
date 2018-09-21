import UtilityMove from '../../assets/js/UtilityMove.js';

UtilityMove( {
    el: document.getElementById( 'one' ),
    appendTo: document.getElementById( 'wrap' ),
    minWidth: 800,

    useMatchMedia: true,
    mediaQuery: '(min-width: 800px) and (min-height: 700px), (orientation: portrait)',
} );
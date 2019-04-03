import UtilityMove from '../../assets/js/UtilityMove.js';

UtilityMove( {
	el: document.getElementById( 'one' ),
	appendTo: document.getElementById( 'wrap' ),
	minWidth: 800,
	useMatchMedia: true,
	mediaQuery: '(min-width: 800px)',
} );

UtilityMove( {
	el: document.getElementById( 'dd' ),
	appendTo: document.getElementById( 'wrap' ),
	minWidth: 800,
	useMatchMedia: true,
	mediaQuery: '(max-width: 800px)',
} );

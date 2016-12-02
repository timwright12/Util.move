/**
 * @file A plugin to help elements around the DOM
 * @author Tim Wright
 * @license MIT
 * @example Util.move({ 'el' : doc.getElementById( 'one' ), 'appendTo' : doc.getElementById( 'wrap' ), 'minWidth' : 800 });
 * @todo Add `height` option
 * @todo Add a `callback` function option
 */

( function ( w, doc ) {

  'use strict';

  /**
   * Setting the global namespace of Util if it's not set already
   * @namespace Util
   */
  if ( 'object' !== typeof window.Util ) {
    window.Util = {};
  }

  /** @function
   * @name Util.debounce
   * @memberof Util
   * @description Utility method for debouncing the resize event
   * @param {function} func
   * @param {number} wait
   * @param {object} immediate
   * @example var myEfficientFn = debounce(function() { things to do }, 250);
   * @example  window.addEventListener( 'resize', myEfficientFn );
   */
  Util.debounce = function ( func, wait, immediate ) {

    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if ( !immediate ) {
          func.apply( context, args );
        }
      };
      var callNow = immediate && !timeout;
      clearTimeout( timeout );
      timeout = setTimeout( later, wait );
      if ( callNow ) {
        func.apply( context, args );
      }
    };

  }; // Util.debounce();

  /** @function
   * @name Util.move
   * @memberof Util
   * @description The main plugin method that moves DOM elements
   * @param {object} options.el
   * @param {object} options.before
   * @param {object} options.after
   * @param {object} options.appendTo
   * @param {object} options.prependTo
   * @param {number} options.minWidth
   * @param {number} options.refreshRate
   */
  Util.move = function ( options ) {

    // Add an accessibility message to the body to let screen reader users know that the HTMl may shift
    var a11yEl = doc.createElement( 'div' );

    // Fill out the element
    a11yEl.setAttribute( 'id', 'move-helper-text' );
    a11yEl.innerHTML = 'Some areas of this page may shift around if you resize the browser window. Be sure to check heading and document order.';
    a11yEl.style.position = 'absolute';
    a11yEl.style.top = '-999em';
    a11yEl.style.left = '-999em';

    // Insert this element into the DOM
    doc.body.appendChild( a11yEl );

    // Point to the message
    doc.body.setAttribute( 'aria-describedby', 'move-helper-text' );

    // Setting default options
    var defaults = {
      'el'          : null,
      'before'      : null,
      'after'       : null,
      'appendTo'    : null,
      'prependTo'   : null,
      'minWidth'    : null,
      'refreshRate' : 200
    };

    // Setting and caching some variables
    var i;
    var stop = false;
    var viewport = doc.documentElement.clientWidth;
    var storeOriginalParent = options.el.parentNode;
    var storeOriginalSibling = options.el.nextSibling;

    // Map all default settings to user defined options
    for ( i = 0; i < defaults.length; i = i + 1 ) {

      if ( typeof options[i] === "undefined" ) {

        options[i] = defaults[i];

      }

    } // for

    /** @function
     * @name elMove
     * @description The movement action of the DOM elements based on the style called
     */
    var elMove = function() {

	    if ( options.el ) {

	      if ( options.before ) {

	        options.before.parentNode.insertBefore( options.el, options.before );

	      } else if ( options.after ) {

	        options.after.parentNode.insertBefore( options.el, options.after.nextSibling );

	      } else if ( options.prependTo ) {

	        options.prependTo.insertBefore( options.el, options.prependTo.firstChild );

	      } else if ( options.appendTo ) {

	         options.appendTo.appendChild( options.el );

	      }

	    } // if options.*

      stop = true;

    }; // elMove()

    /** @function
     * @name elReset
     * @description Reset the element to its original position
     */
    var elReset = function() {

      // If there's no nextSibling, it was the last element, so lets just append to the parent
      if ( storeOriginalSibling ) {

        storeOriginalParent.insertBefore( options.el, storeOriginalSibling );

      } else {

        storeOriginalParent.appendChild( options.el );

      }

      // Set stop to false so this method doesn't call over and over
      stop = false;

    } // elReset();

    if ( options.minWidth ) {

      // Move the element if the screen is larger than the px value
	    if ( doc.documentElement.clientWidth > options.minWidth && stop === false ) { // large screen

        elMove();

	    } else if ( doc.documentElement.clientWidth <= options.minWidth) { // small screen

        elReset();

	    }

      // Add a listener to move the element when the screensize is larger than the px value, debouce it so it doesn't clog up the main thread
	    w.addEventListener( 'resize', this.debounce( function() {

        if ( doc.documentElement.clientWidth > options.minWidth && stop === false ) { // large screen

          elMove();

        } else if ( doc.documentElement.clientWidth <= options.minWidth && stop === true ) { // small screen

          elReset();

        }

      }, options.refreshRate ) );

    } else {

      // Move the element independently of the screen size
	    elMove();

    } // if / else

  }; // Util.move()

} )( this, this.document );

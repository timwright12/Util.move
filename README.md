# Util.move
A plugin to help elements around the DOM

```
  import UtilityMove from '/path/to/UtilityMove.js';

  UtilityMove( {
    'el'       : doc.getElementById( 'one' ),
    'appendTo' : doc.getElementById( 'wrap' ),
    // 'before'      : null,
    // 'after'       : null,
    // 'prependTo'   : null,
    'minWidth' : 800,
    'refreshRate' : 100
  } );
```

If you're not using ES6, you don't need the `import`, just include the script
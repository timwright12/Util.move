# Util.move
A plugin to help elements around the DOM

```
npm install utilitymove --save
```


```
  import UtilityMove from '/path/to/UtilityMove.js';

  UtilityMove( {
    'el'       : document.getElementById( 'one' ),
    'appendTo' : document.getElementById( 'wrap' ),
    // 'before'      : null,
    // 'after'       : null,
    // 'prependTo'   : null,
    'minWidth' : 800,
    'refreshRate' : 100
  } );
```

If you're not using ES6, you don't need the `import`, just include the script
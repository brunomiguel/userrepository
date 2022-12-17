# cerebro-tools

> Library package for [Cerebro](http://www.cerebroapp.com) app plugin developers, that includes most used functions

## Documentation
### Memoize

```js
const { memoize } = require('cerebro-tools');

const fetchResults = memoize(() => {
  // Your long running function
})
```

Use `memoize` function from `cerebro-tools` for your long-running functions, like API-requests.

Under the hood it just uses [memoizee](https://github.com/medikoo/memoizee). Check their documentation for more details.

### Search

```js
const { search } = require('cerebro-tools');

// Filter your results array
const results = search(arr, 'something', (el) => el.key);

// Display filtered results
display(results);
```

Simple function to search in your collection:

`search = (items, term, toString = (item) => item) => {}`

Where
* `items` – your array;
* `term` – search term;
* `toString` – function to convert your collection item to string.

## Related

- [Cerebro](http://github.com/KELiON/cerebro) – main repo for Cerebro app;
- [Memoizee](https://github.com/medikoo/memoizee) – Complete memoize/cache solution for JavaScript.

## License

MIT © [Alexandr Subbotin](http://asubbotin.ru)

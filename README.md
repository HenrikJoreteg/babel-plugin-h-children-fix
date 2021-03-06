# babel-plugin-h-children-fix

![](https://img.shields.io/npm/dm/babel-plugin-h-children-fix.svg)![](https://img.shields.io/npm/v/babel-plugin-h-children-fix.svg)![](https://img.shields.io/npm/l/babel-plugin-h-children-fix.svg)

Allows use of standard babel JSX tools with virtual-dom/h

I wanted to use virtual-dom's ["hyperscript"](https://github.com/Matt-Esch/virtual-dom/blob/master/virtual-hyperscript/README.md) but write it using regular JSX syntax.

Standard Babel plugins as of 6.0+ have great tools for JSX, including the ability to specify a "pragma" to use instead of `React.createElement` (which is the default). You simply `npm install babel-plugin-transform-react-jsx` and specify the pragma. Docs for [that are here](http://babeljs.io/docs/plugins/transform-react-jsx/).

I assumed I could just specify `h` as a pragma and be done. 

Only issue is `React.createElement` expects child elements as addtional arguments: `React.createElement('div', null, childOne, childTwo)` while `h` expects `h('div', null, [childOne, childTwo])` (note the last argument is an array of children.

This is a babel plugin to be ran *after* the "official" one that simply replaces any instance of a "callExpression" that has a name of `h` and has three or more arguments, with a version that gathers the `children` as an array passed as the third argument.

Note that this is not exensively tested and it's a *naive* and *simple* replacement. Any `h()` call with more than 3 arguments is affected whether it's actually virtual dom's `h` or not.

That's it!

## just kidding! One, tiny little thing...

It's kind of odd to have to `import h from 'virtual-dom/h'` at the top of a file containing JSX, especially if you then *never actually use it within your file*. So, as of version `1.1.0+` this plugin will also automatically insert that import statement for you if the file contains JSX and doesn't have `h` defined at the module level.

## example

npm install both of them:

```
npm install babel-plugin-transform-react-jsx babel-plugin-h-children-fix
```

Now if your `.babelrc` file looks like this:


```json
{
  "presets": ["es2015"],
  "plugins": [
    ["transform-react-jsx", {"pragma": "h"}],
    "h-children-fix"
  ]
}
```

The `babel-plugin-transform-react-jsx` firt turns this:

```js
export default () => (
	<ul>
		<li>one</li>
		<li>two</li>
	</ul>
)
```

into something roughly like this:

```js
export default () => (
	h('ul', null, h('li', null, 'one'), h('li', null, 'two'))
)
```

and this plugin subsequently turns the above, into:

```js
export default () => (
	h('ul', null, [
		h('li', null, 'one'),
		h('li', null, 'two')
	])
)
```

## install

```
npm install babel-plugin-h-children-fix
```

## credits

If you like this follow [@HenrikJoreteg](http://twitter.com/henrikjoreteg) on twitter.

## changelog

- `1.1.0` auto import `h` if not defined, added basic test, now uses standard style and enforcement thereof.
- `1.0.1` doc update
- `1.0.0` initial release

## license

[MIT](http://mit.joreteg.com/)


# screeps-utils [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]
> utilities for the game screeps

## Introduction
This module aims to provide easy to use utility functionality while still being highly configurable.
It is written with EcmaScript 2015 features in mind.

## Installation

There are two options for installing screeps-utils.

1. Copy and paste [dist/screeps-utils.js][dist-url] to your project
2. Install it with npm and use a bundler like webpack. `$ npm install --save screeps-utils`

## Usage
Require the module at the top of you `main.js` and enable it.

```js
const utils = require('screeps-utils');

utils.enable();
```

Some utilities might require to be called every tick, therefor you'll have to call the `tick` function in your main loop.
```js
module.exports.loop = function() {
  utils.tick();
  // your code goes here
}
```

## Configuration
This module is highly configurable, you can disable utilities or alter their behaviour by passing different options.
For more details check out the [documentation][docs-url].  

## License
[GPL-3.0][license-url]

[npm-image]: https://badge.fury.io/js/screeps-utils.svg
[npm-url]: https://npmjs.org/package/screeps-utils
[daviddm-image]: https://david-dm.org/PostCrafter/screeps-utils.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/PostCrafter/screeps-utils

[license-url]: LICENSE.md
[dist-url]: dist/screeps-utils.js
[docs-url]: doc/README.md

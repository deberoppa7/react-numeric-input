# react-numeric-input

Number input component with more flexible options very easy to use.

> 

[![NPM](https://img.shields.io/npm/v/react-numeric-input.svg)](https://www.npmjs.com/package/react-numeric-input) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


## Installation 
```sh
npm install @deberoppa/react-numeric-input --save
```

Add it to your script like this:
```js
// es6
import RNI from '@deberoppa/react-numeric-input';
```

## Usage
#### Basic usage:
```jsx
<RNI/>
// Or to add class:
<RNI className="my-custom-class1"/>
```

#### Common usage:
Most of the time you will need to specify min, max, value and step like the native numeric input.
```jsx
<RNI min={0} max={100} step={5} value={60}/>
```

#### Floats usage :
You can use step and precision props to make the input working with floating point numbers.
```jsx
<RNI step={0.25} precision={2} value={30.25}/>
```

#### Mobile mode :
In the mobile the input must change display so the click on the buttons will be comfortable.
```jsx
<RNI mobile={true}/>
```

#### Adding prefix or suffix to the output:
You can add prefix or suffix to the value like this:
```jsx
// Prefix
<RNI prefix="$" value={30} /> // output:  $30
// Suffix
<RNI suffix="€" value={40}/> // output : 40€
```

#### Custom format:
You can add you custom format to the value.
```jsx
function myCustomFormat(number) {
    return '$$' + number + '$$';
}
<RNI value={40} format={myCustomFormat}/> // output: $$40$$
```


#### ReadOnly or Disabled input
**readOnly** : The value cannot be updated by button's click or text entry. ( The input is only a display )<br/>
**disabled** : Disable the input.
```jsx
// readOnly
<RNI readOnly /> 
// disabled
<RNI disabled />
```

## Props
Name              | Type                                | Default
------------------|-------------------------------------|:-------:
**value**         |`number` or `string`                 |`""` which converts to 0
**min**           |`number`                             |`Number.MIN_SAFE_INTEGER`
**max**           |`number`                             |`Number.MAX_SAFE_INTEGER`
**step**          |`number`                             | 1
**precision**     |`number`                             | 0
**prefix**        |`string`                             | ''
**sufix**         |`string`                             | ''
**format**        |`function`                           | null
**className**     |`string`                             | none
**readOnly**      |`true`, `false`                      | false
**disabled**      |`true`, `false`                      | false
**mobile**        |`true`, `false`                      | false

<br/>
<br/>

## Events

**onChange** - Event handler when the input's value changed

```jsx
function onChangeHandler(valuer) {
    console.log(value)
}
<RNI value={9} onChange={onChangeHandler}/>
```

<br/>
<br/>


## Contributors
This project was bootstrapped with [create-react-library](https://github.com/transitive-bullshit/create-react-library).


## License

MIT © [deberoppa7](https://github.com/deberoppa7)

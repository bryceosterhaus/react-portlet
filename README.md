# React.js in Liferay Portal 7

This portlet integrates React.js into Liferay portal by using *react-js* module to import react and react-dom.

Using this method we are able to utilize Liferay's built in es6 transpiler for React. Only thing needed to properly transpile jsx is adding a `.babelrc` with a preset of 'react' and including `babel-preset-react` in our `package.json`
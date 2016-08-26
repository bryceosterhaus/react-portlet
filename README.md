# React.js in Liferay Portal 7

##Pain points:
  * Currently unable to use Liferay's transpiler to build our App (at least not yet). This is due to relying on AMD type modules.
  * Haven't figured out how to properly get hot-module-replacement to work with webpack's dev server and Liferay due to the resource paths from *liferay-amd-loader*. This results in a much slower development process. (Biggest pain point, IMO)

##Steps for creating a Portlet that uses React.js

  1. Create a Portlet skeleton using the Blade CLI.  More information on this can be found here: https://dev.liferay.com/develop/tutorials/-/knowledge_base/7-0/creating-modules-with-blade-cli.  For this tutorial I chose to create a module from the 'portlet' template.  Your command should look something like the following `blade create name-of-portlet`

  2. Once you have a portlet skeleton, we can start creating the extra infrastructure we will need for React. Lets create the following files in our portlet.
    * package.json
    * webpack.config.js

  3. Install webpack via npm and then we need to configure our webpack.config.js so that we can properly build our application when we call `blade deploy`. This should be a normal webpack configuration, nothing special needs to be done for Liferay specifically.
	* Using babel and babel-presets is entirely up to the developer. For our case we will use babel as our loader, and a few babel presets for react and es2015.

  4. Now that we have webpack configured, we need to make sure it gets called when we deploy the module.  Inside our `build.gradle` we create a task of type `ExecuteNodeTask`, that depends on the `npmInstall` task, and calls webpack directly. Ideally we would want to use a task of type `ExecuteNpmScript` and run webpack through that, as of now I was unable to get the task of type `ExecuteNpmScript` working but more research can be done to get this working properly.

  5. Now lets create a simple React Todo application.  Please see `js/src/components/Todo.js`. Now we should set the app initializing function to the window at our webpack entry point `main.js`.

  6. Now with a proper webpack configuration, when it is built, the resulting bundle file should be compiled to `js/dist/bundle.js`. Now lets include that resource in `HelloReactPortlet.java` by adding `"com.liferay.portlet.footer-portlet-javascript=/js/dist/bundle.js"`,

  7. Finally, in our `view.jsp` we can initialize our app by calling `window.app(some-node-here)`.

  Now you should be able to build any sort of react application while using webpack. As far as webpack configuration and component file structure, that is up to you. The only Liferay dependency here is that we include the bundle.js as a script, and modify our `build.gradle` to package our application on deploy.

## Further research
  * Front-end routing via `react-router` and how that works with Liferay's SPA engine, Senna.js.
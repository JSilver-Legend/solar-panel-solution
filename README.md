# Solpaneler
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) or CRA. At the bottom of this readme you find the relevant react script commands, from the CRA readme, used to *build and run this project*.

## Setup and dependencies

* React
* [Ant design](https://ant.design/). A popular React components library, used for some components and for the icons. Look over this page, [Ant design in CRA](https://ant.design/docs/react/use-with-create-react-app), to understand what configs I have done in this project.
* [Redux](https://redux.js.org/introduction/getting-started/), [Redux persist](https://redux.js.org/introduction/getting-started/) and [redux-observable](https://redux-observable.js.org/). Redux is used for global state management. Redux persist is used to store the Redux store in LocalStorage (in the browser). Redux-observable is a Redux middleware based on [RxJS](https://rxjs-dev.firebaseapp.com/). It uses a powerful streaming api and is based on the Reactive programming paragdim. To learn more look at [This Video](https://www.youtube.com/watch?v=AslncyG8whg&t=8s). You could, for example, use the bounce function to wait x seconds before doing an API call or cancel request using the *take_until* function.
* [@react-google-maps/api](https://www.npmjs.com/package/@react-google-maps/api) is a maintained, newer, version of the popular, but sadly, unmaintained react-google-maps. 
* Jest and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro). Jest is configured internally by CRA as the default test runner. React Testing Library is the framework used to create the tests. 
* Sass modules. 

## Project layout

* *components/pages* contain the Apps pages and the components only used on a certain page. These components are usually connected to the redux store.
* *components/common* contain components used on several pages.
* */state* contain the Redux state of the application. The Redux store uses a 'ducks' file structure. The state is connected to the pages of the application.
* */services* contain all logic related to, for example, communicating with the API. Various utils are also located within services. 

## Note
1. All redux-observable logic is put in the epic files in the ducks folders. 
2. All state is stored in LocalStorage using redux-persist.
3. Note that the api calls are observables, i.e. they have the $ sign.
4. Dependencies, such as the Google maps api service and api service, are injected into the epics in the store.js file. This makes testing much easier.
5. Epics are tested using something called marble testing, if you are wondering what the -a means. You can read up on it in the [RxJS docs](https://rxjs-dev.firebaseapp.com/guide/testing/marble-testing)
6. The form on *Contact Seller* is from Simpli Form and is mounted using Vue (the simpli-form script is located in public/index.html). This means you have NO CONTROL over the lifecycle of the simpli-form component. This is the reason there is so much special things going on in Contact Seller. We need to make sure the simpli-form component has mounted before we can add values to its form inputs. This is done in the only way I imagine possible, using the document loaded callback. It could be possible to write your own Vue wrapper around simpli-form, and pass the redux values as props to that Vue container.

## An example of redux-observable in use
```javascript
  action$.pipe(
    ofType(SEARCH_ADDRESS),
    filter(action => action.payload !== "" && action.payload),
    debounceTime(500),
    switchMap(action =>
      from(googleApiService.searchAddress(action.payload)).pipe(
        catchError(error => of([])), // Return empty array on promise rejection
        map(addresses => searchAddressSuccess(addresses))
      )
    )
  );
```

When SEARCH_ADDRESS is commited, this epic run. First if the payload is empty, nothing will happen. Then a *debounce* will run, this means that the call will halt for 500ms. If a new call comes after 300ms, the previous call will be cancelled and the stop time will be reset to 500ms. This will limit the api-calls to the Google Maps Api in a way that is easy, compared to implementing the same in non-reactive programming. 

The switchMap will always switch to the last call. An observable will be created from a Promise using the *RxJS from()* method and the call to the Google maps api will run. If the Google service returns an error, the epic will be resolved with an empty array, otherwise the successful result will set using the searchAddressSuccess action.

## Todo

* Increase test coverage.
* Put all SASS styles in a common file, for example, theme.scss.
* Build using some CI solution and automate testing before deployment.
* Look over naming in the application. For example, result should be renamed to *estimate*, which is more appropiate.
* Consider using [Reselect](https://github.com/reduxjs/reselect) to use memorized selectors. This will increase performance for selectors.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

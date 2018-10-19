# Have you taken your pills?
> Simple PWA app that helps you to remember about your daily pills ;)

![./demo.gif]

## Available Scripts
Project scaffolded using create-react-app so scripts are available via react-scripts:

### `npm start`
Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`
Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`
Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [create-react-app documentation](https://github.com/facebook/create-react-app) for more information.

## App configuration
In `config.js` file you can set:
1. **pillCategories** array of strings representing types of pills you take (e.g. if you take some pills twice a day you can have "morning" and "evening" categories)
2. **days** how many days would you like to edit (e.g. if you would like to set the status of pill only from today and yesterday set it to 2)

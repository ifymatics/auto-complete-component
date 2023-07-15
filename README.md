# auto-complete-component

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### Available instruction on how to get data source

### `npm run server` this is used to start a json-server

Copy http://localhost:3005/cityNames as the backend url.\

The url will server as the backend url for fetching list of city names.\
Some code that will help to fetch data from the json-server in App.ts were commented.\
You may use the mockData.json as your data source, so there would be no need of running the json-server if you choose to do so.

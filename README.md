
## Example: Use flowmap.gl with Mapbox

Based on [this deck.gl example](https://github.com/uber/deck.gl/tree/8.1-release/examples/get-started/pure-js/mapbox).

Uses [Webpack](https://github.com/webpack/webpack) to bundle files and serves it
with [webpack-dev-server](https://webpack.js.org/guides/development/#webpack-dev-server).

## Usage

To run this example, you need a [Mapbox access token](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/). You can either set an environment variable:

```bash
export MapboxAccessToken=<mapbox_access_token>
```

Or set `mapboxgl.accessToken` directly in `app.js`.

Other options can be found at [using with Mapbox GL](../../../../docs/get-started/using-with-mapbox-gl.md).

To install dependencies:

```bash
npm install
# or
yarn
```

Commands:
* `npm start` is the development target, to serves the app and hot reload.
* `npm run build` is the production target, to create the final bundle and write to disk.

const {RoutingContext} = require( 'react-router' );
const ejs = require( 'ejs' );
const React = require( 'react' );
const ReactDOMServer = require( 'react-dom/server' );
const {Provider} = require( 'react-redux' );

const _renderComponents = (props, store) => {
  return ReactDOMServer.renderToString(
    <Provider store={store}>
      <RoutingContext {...props} />
    </Provider>
  );
};

export default (renderProps, indexHtml, store) => {
  return new Promise((resolve, reject) => {
    let output = _renderComponents(renderProps, store);
    resolve(
      ejs.render(indexHtml, {
        reactOutput: output,
        store: JSON.stringify(store)
      })
    );
  });
};


/**
 * Created by mobinni on 12/01/16.
 */
import ejs from 'ejs';
import webpackMw from '../middleware/webpack';
import storeBuilder from '../client/src/store/storeBuilder';

const store = storeBuilder();

export default function (callback) {
  webpackMw.query('index.html', function (err, body) {
    if (err) console.log(err);
    let output = ejs.render(body, {
      reactOutput: '',
      store: '{}'
    });
    callback(output);
  });
}
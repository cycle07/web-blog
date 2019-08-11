/**
 * 入口文件
 */
import { log } from 'util/debug-tool';

import { render } from 'react-dom';
import fp from 'lodash/fp';

// import 'helpers/highlight/styles/arta.css';
// import 'helpers/highlight/highlight.pack.js';

import Main from 'component';

import { Provider } from 'mobx-react';

import storeData from 'mobx-data';
import lang from 'config/lang';

const { store, action, computed } = storeData;

render(
  <Provider
    {...store}
    {...fp.mapKeys(key => `${key}Action`)(action)}
    {...fp.mapKeys(key => `${key}Computed`)(computed)}
  >
    <Main lang={lang} />
  </Provider>,
  document.getElementById('app-main')
);

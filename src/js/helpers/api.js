/**
 * 请求体
 */
import createUrl from 'util/create-url-params';
import config from 'config/config';
import _ from 'lodash';

const { url: host, key, version, auth } = config;
// export const helperFn = ({
//   param = {},
//   param2 = {},
//   method = 'posts',
//   type = 'browse'
// }) =>
//   new Promise((resolve, reject) => {
//     helpers[method][type](
//       {
//         ...param
//       },
//       {
//         ...param2
//       }
//     )
//       .then(post => {
//         resolve(post);
//       })
//       .catch(err => {
//         reject(err);
//       });
//   });

export default async ({ method = 'posts', type = 'browse', param = {} }) => {
  if (!window.fetch && Systemjs) {
    await Systemjs.import('fetch');
  }
  let slugId = '';
  if (type === 'read') {
    slugId = _.get(param, ['id']) || _.get(param, ['slug']);
  }
  const { fetch } = window;
  const reqUrl = createUrl(
    { ...param, key },
    `${host}/ghost/api/${version}/${auth}/${method}/${slugId}`
  );
  const _promise = new Promise((resolve, reject) => {
    fetch(reqUrl, {
      method: 'GET',
      header: {
        'Content-Type': 'application/json, text/plain, */*',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(isOK => isOK.json())
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
  return _promise;
};

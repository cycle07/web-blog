/**
 * 请求体
 */
import api from 'config/config';

export default (param, method = 'posts', type = 'browse') =>
  new Promise((resolve, reject) => {
    api[method][type]({
      ...param
    })
      .then(post => {
        resolve(post);
      })
      .catch(err => {
        reject(err);
      });
  });

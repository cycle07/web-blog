/**
 * 此文件写项目相关配置
 */

// import GhostContentAPI from '@tryghost/content-api';

const config = {
  url: 'http://localhost:2368', // local
  // url: 'http://192.168.193.102:30303', // Dev
  // key: '2c1313db0fb9508c2a899a8a0a', // MacbookLocal
  key: '632f329b701c72e361d841f43a', //E470Local
  // key: '4c2edb645ad2e49196af664243', // MacUbuntu
  auth: 'content',
  version: 'v2'
};

// export default new GhostContentAPI(config);
export default config;

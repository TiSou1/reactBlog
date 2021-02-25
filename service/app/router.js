'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
//路由主入口
module.exports = app => {
  require('./router/default')(app);
  require('./router/admin')(app);
};

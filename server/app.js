const Koa = require('koa');
const router = require('./routes');
const koaBody = require("koa-bodyparser");
require("./db");

const app = new Koa();
app.use(koaBody());
app.use(router.allowedMethods());
app.use(router.routes());


module.exports = app;
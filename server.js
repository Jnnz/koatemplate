const koa = require('koa');
const app = new koa();
const logger = require('koa-logger');
const responseTime = require('koa-response-time');
const router = require('./routes');
const json = require('koa-json');

const PORT = process.env.PORT || 3000;

app.use(responseTime());
app.use(logger());
app.use(json());
app.use(router.routes());
app.use(router.allowedMethods());

app.use(async function(ctx, next) {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.type = 'json';
        ctx.body = { error: err.message };
        ctx.app.emit('error', err, ctx);
    }
});

app.on('error', (err) => {
    if (process.env.NODE_ENV != 'test') {
        console.error(err.message);
    }
});

app.use(async function pageNotFound(ctx, next) {
    try {
        await next();
        if (ctx.status === 404) {
            ctx.status = 404;
            ctx.body = 'Not found';
        }
    } catch (err) {
        throw new Error(err);
    }
});


if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log('Server listening on port: ' + PORT);
    });
}

module.exports = app;

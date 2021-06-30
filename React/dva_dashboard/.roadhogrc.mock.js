
export default {
    "/api": {
        "target": "http://jsonplaceholder.typicode.com/",
        "changeOrigin": true,
        "pathRewrite": { "^/api": "" }
    }
};

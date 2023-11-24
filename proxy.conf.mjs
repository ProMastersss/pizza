const PROXY_CONFIG = {
  "/api/**": {
    "target": "http://localhost:3000",
    "pathRewrite": {"^/api" : ""},
    "secure": false,
    "logLevel": "debug",
  }
}


export default PROXY_CONFIG;

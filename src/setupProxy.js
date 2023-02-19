const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  const contentfulBaseUrl = `https://cdn.contentful.com/spaces/${process.env.REACT_APP_CONTENTFUL_SPACE_ID}/environments/${process.env.REACT_APP_CONTENTFUL_ENVIRONMENT_ID}`;

  app.use(
    "/assets/:assetId",
    createProxyMiddleware({
      target: contentfulBaseUrl,
      changeOrigin: true,
      onProxyReq: (proxyReq) => {
        proxyReq.path += `?access_token=${process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN}`;
      }
    })
  );

  app.use(
    "/entries/:entryId",
    createProxyMiddleware({
      target: contentfulBaseUrl,
      changeOrigin: true,
      onProxyReq: (proxyReq) => {
        proxyReq.path += `?access_token=${process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN}`;
      }
    })
  );

  app.use(
    "/entries",
    createProxyMiddleware({
      target: contentfulBaseUrl,
      changeOrigin: true,
      onProxyReq: (proxyReq) => {
        proxyReq.path += `&access_token=${process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN}&content_type=blogPost&order=-sys.createdAt`;
      }
    })
  );
};

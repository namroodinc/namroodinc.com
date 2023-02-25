const contentful = require("contentful");

module.exports = function (app) {
  const client = contentful.createClient({
    accessToken: process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN,
    environment: process.env.REACT_APP_CONTENTFUL_ENVIRONMENT_ID,
    space: process.env.REACT_APP_CONTENTFUL_SPACE_ID
  });

  app.get("/api/contentful/assets", (req, res) => {
    client
      .getAssets()
      .then((response) => res.json(response))
      .catch(console.error);
  });

  app.get("/api/contentful/blogPostList", (req, res) => {
    client
      .getEntries({
        content_type: "blogPost",
        skip: req.query.skip,
        limit: req.query.limit
      })
      .then((response) => res.json(response))
      .catch(console.error);
  });

  app.get("/api/contentful/blogPost/:blogPostId", (req, res) => {
    client
      .getEntry(req.params.blogPostId)
      .then((response) => res.json(response))
      .catch(console.error);
  });

  app.get("/api/contentful/tags", (req, res) => {
    client
      .getTags()
      .then((response) => res.json(response.items))
      .catch(console.error);
  });
};

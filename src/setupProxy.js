const contentful = require("contentful");
const Papa = require("papaparse");
const fs = require("fs");
const path = require("path");

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

  app.get(
    "/api/contentful/blogPostList/:skip/:limit/:sortOrder",
    (req, res) => {
      client
        .getEntries({
          content_type: "blogPost",
          skip: req.params.skip,
          limit: req.params.limit,
          order: req.params.sortOrder // "-sys.createdAt"
        })
        .then((response) => res.json(response))
        .catch(console.error);
    }
  );

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

  app.get("/api/static/:sport/teams/:sortOrder", (req, res) => {
    const { sport } = req.params;
    const { skip, limit, sortOrder } = req.query;

    const data = fs.readFileSync(
      path.join(
        __dirname,
        `./packages/pitchgen/api/static/${sport}/teams/teams.csv`
      ),
      "utf8"
    );

    const parsedData = Papa.parse(data, {
      header: true,
      skipEmptyLines: true
    });

    const { data: teamsData } = parsedData;

    const sortedTeamsData = teamsData.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name > b.name ? 1 : -1;
      } else {
        return a.name < b.name ? 1 : -1;
      }
    });

    const slicedTeamsData = sortedTeamsData.slice(skip, limit);

    console.log(slicedTeamsData);

    res.json(slicedTeamsData);
  });
};

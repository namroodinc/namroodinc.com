const contentful = require("contentful");
const Papa = require("papaparse");
const fs = require("fs");
const path = require("path");

const papaParseOptions = {
  delimiter: ",",
  dynamicTyping: true,
  header: true,
  transformHeader: (h) => h.trim()
};

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
    const { sortOrder } = req.query;

    const data = fs.readFileSync(
      path.join(
        __dirname,
        `./packages/pitchlab/api/static/${sport}/teams/teams.csv`
      ),
      "utf8"
    );

    const parsedData = Papa.parse(data, papaParseOptions);

    const { data: teamsData } = parsedData;

    const sortedTeamsData = teamsData.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.fullName < b.fullName ? 1 : -1;
      } else {
        return a.fullName > b.fullName ? 1 : -1;
      }
    });

    res.json(sortedTeamsData);
  });

  app.get("/api/static/:sport/team/:teamId", (req, res) => {
    const { sport, teamId } = req.params;

    const data = fs.readFileSync(
      path.join(
        __dirname,
        `./packages/pitchlab/api/static/${sport}/teams/teams.csv`
      ),
      "utf8"
    );

    const parsedTeamsData = Papa.parse(data, papaParseOptions);

    const { data: teamsData } = parsedTeamsData;

    const team = teamsData.find((team) => team.teamId === teamId);

    const playersData = fs.readFileSync(
      path.join(
        __dirname,
        `./packages/pitchlab/api/static/${sport}/team/${teamId}.csv`
      ),
      "utf8"
    );

    const parsedPlayersData = Papa.parse(playersData, papaParseOptions);

    const { data: players } = parsedPlayersData;

    res.json({ ...team, players });
  });

  app.get("/api/static/:sport/:dataLayerType/:id", (req, res) => {
    const { sport, dataLayerType, id } = req.params;

    const data = fs.readFileSync(
      path.join(
        __dirname,
        `./packages/pitchlab/api/static/${sport}/${dataLayerType}/${id}.csv`
      ),
      "utf8"
    );

    const parsedData = Papa.parse(
      data,
      dataLayerType === "perceivedThreat"
        ? { ...papaParseOptions, header: false }
        : papaParseOptions
    );

    const { data: heatmapData } = parsedData;

    res.json({ data: heatmapData, dataLayerType });
  });
};

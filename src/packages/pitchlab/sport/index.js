import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { usePitchLabStore } from "../stores";
import Table from "../../../components/table";
import PlayingArea from "../PlayingArea";

const Sport = observer(() => {
  const heatMapStore = usePitchLabStore("heatMapStore");
  const teamsStore = usePitchLabStore("teamsStore");

  const { teams } = teamsStore;
  const { sport } = useParams();

  const mapLayer = "heatMap"; // could be "heatMap" or "perceivedThreat"

  useEffect(() => {
    teamsStore.fetchTeams(sport);
  }, [teamsStore, sport]);

  useEffect(() => {
    heatMapStore.fetchHeatMap(sport, mapLayer, "02");
  }, [heatMapStore, sport]);

  if (!teams) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{sport}</h1>
      <Table
        columns={["Team", "Stadium (capacity)"]}
        rows={teams.map((team) => [
          <Link to={`/packages/pitchlab/${sport}/team/${team.teamId}`}>
            {team.fullName}
          </Link>,
          `${team.stadium} (${team.stadiumCapacity.toLocaleString()})`
        ])}
      />

      <PlayingArea
        strokeColor="#fbfbfb"
        dataLayer={heatMapStore.heatMapData}
        isLandscape={false}
        sport={sport}
        showGrid
      />
      <PlayingArea
        fillColor={"#ccc"}
        fullPitchView={false}
        strokeColor="#fbfbfb"
        dataLayer={heatMapStore.heatMapData}
        showGrid
        sport={sport}
      />
    </div>
  );
});

Sport.propTypes = {};

Sport.defaultProps = {};

export default Sport;

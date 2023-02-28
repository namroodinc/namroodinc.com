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

  useEffect(() => {
    teamsStore.fetchTeams(sport);
  }, [teamsStore, sport]);

  useEffect(() => {
    heatMapStore.fetchHeatMap(sport, "perceivedThreat");
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
        heatMapData={heatMapStore.heatMapData}
        isHorizontal={false}
      />
      <PlayingArea
        strokeColor="#fbfbfb"
        heatMapData={heatMapStore.heatMapData}
        showGrid
      />
    </div>
  );
});

Sport.propTypes = {};

Sport.defaultProps = {};

export default Sport;

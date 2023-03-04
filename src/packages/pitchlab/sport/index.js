import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { usePitchLabStore } from "../stores";
import Table from "../../../components/table";
import PlayingArea from "../PlayingArea";

import styles from "./styles.module.scss";
import Columns from "../../../components/columns";

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
    <main role="main" className={styles.contentDisplay}>
      <Columns numberOfColumns={1}>
        <h1 className={styles.capitalize}>{sport}</h1>

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
      </Columns>
    </main>
  );
});

Sport.propTypes = {};

Sport.defaultProps = {};

export default Sport;

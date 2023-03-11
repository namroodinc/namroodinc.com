import React, { useEffect, useMemo } from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { usePitchLabStore } from "../stores";

import styles from "./styles.module.scss";
import Columns from "../../../components/columns";
import SportSoccer from "./Soccer";
import SportBasketball from "./Basketball";

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
    heatMapStore.fetchHeatMap(sport, mapLayer, "03");
  }, [heatMapStore, sport]);

  if (!teams) {
    return <div>Loading...</div>;
  }

  const content = useMemo(() => {
    switch (sport) {
      case "soccer":
        return <SportSoccer />;
      case "basketball":
        return <SportBasketball />;
      default:
        return <div>{sport} not available</div>;
    }
  }, [sport]);

  return (
    <main role="main" className={styles.contentDisplay}>
      <Columns numberOfColumns={1}>
        <h1 className={styles.capitalize}>{sport}</h1>
        {content}
      </Columns>
    </main>
  );
});

Sport.propTypes = {};

Sport.defaultProps = {};

export default Sport;

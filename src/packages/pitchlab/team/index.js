import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { usePitchLabStore } from "../stores";

import Columns from "../../../components/columns";
import PlayingArea from "../PlayingArea";

import styles from "./styles.module.scss";

const Team = observer((props) => {
  const teamsStore = usePitchLabStore("teamsStore");

  const { teamInFormation, isLoading, team } = teamsStore;
  const { sport, teamId } = useParams();

  useEffect(() => {
    teamsStore.fetchTeam(sport, teamId);
  }, [teamsStore, sport, teamId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main role="main" className={styles.contentDisplay}>
      <Columns numberOfColumns={1}>
        <h1>{team.fullName}</h1>

        {team.logo && (
          <img
            className={styles.contentDisplayLogo}
            src={team.logo}
            alt={`${team.fullName} logo`}
          />
        )}

        <span className={styles.contentDisplayAdditionalInfo}>
          {team.stadium} ({team.stadiumCapacity.toLocaleString()} capacity).{" "}
          {team.cityBasedIn}, {team.countryBasedIn}.
        </span>

        <PlayingArea
          fullPitchView={false}
          sport={sport}
          showPlayerNames
          teams={[
            {
              ...team,
              players: teamInFormation
            }
          ]}
        />

        <PlayingArea
          sport={sport}
          showPlayerNames
          teams={[
            {
              ...team,
              players: teamInFormation
            },
            {
              ...team,
              players: teamInFormation
            }
          ]}
          isLandscape={false}
        />
      </Columns>
    </main>
  );
});

Team.propTypes = {};

Team.defaultProps = {};

export default Team;

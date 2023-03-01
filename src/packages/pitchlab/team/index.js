import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { usePitchLabStore } from "../stores";
import PlayingArea from "../PlayingArea";

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
    <div>
      <div>{team.fullName}</div>
      <div>{team.stadium}</div>
      <div>{team.stadiumCapacity}</div>

      <PlayingArea
        sport={sport}
        teams={[
          {
            players: teamInFormation
          }
        ]}
      />

      <PlayingArea
        sport={sport}
        teams={[
          {
            players: teamInFormation
          },
          {
            players: teamInFormation
          }
        ]}
        isLandscape={false}
      />
    </div>
  );
});

Team.propTypes = {};

Team.defaultProps = {};

export default Team;

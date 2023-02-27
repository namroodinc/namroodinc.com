import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { useStore } from "../../../stores";
import Table from "../../../components/table";

const Sport = observer(() => {
  const teamsStore = useStore("teamsStore");
  const { teams } = teamsStore;
  const { sport } = useParams();

  useEffect(() => {
    teamsStore.fetchTeams(sport);
  }, [teamsStore, sport]);

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
    </div>
  );
});

Sport.propTypes = {};

Sport.defaultProps = {};

export default Sport;

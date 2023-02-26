import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useStore } from "../../../stores";

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
      <table>
        <thead>
          <tr>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => {
            return (
              <tr key={team.teamId}>
                <td>{team.fullName}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
});

Sport.propTypes = {};

Sport.defaultProps = {};

export default Sport;

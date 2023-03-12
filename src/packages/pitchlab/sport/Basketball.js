import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { usePitchLabStore } from "../stores";
// import propTypes from "prop-types";
import Table from "../../../components/table";

// import { playingAreaConfig } from "./utils";

// this file imports PlayingArea and showcases all the different ways soccer can be used

const SportBasketball = observer(() => {
  const teamsStore = usePitchLabStore("teamsStore");

  const { teams } = teamsStore;
  const { sport } = useParams();

  useEffect(() => {
    teamsStore.fetchTeams(sport);
  }, [teamsStore, sport]);

  if (!teams) {
    return <div>Loading...</div>;
  }
  return (
    <>
      SportBasketball
      <>
        Show a pitch where you can make basic changes, i.e. change background
        colour, make it horizontal etc
      </>
      <Table
        columns={["Team", "Stadium (capacity)"]}
        rows={teams.map((team) => [
          <Link to={`/packages/pitchlab/${sport}/team/${team.teamId}`}>
            <img
              src={team.logo}
              alt={`${team.fullName} logo`}
              style={{ width: "2rem", height: "2rem" }}
            />{" "}
            {team.fullName}
          </Link>,
          `${team.stadium} (${team.stadiumCapacity.toLocaleString()})`
        ])}
      />
    </>
  );
});

SportBasketball.propTypes = {};

SportBasketball.defaultProps = {};

export default SportBasketball;

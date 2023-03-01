import { action, computed, makeObservable, observable } from "mobx";

export class TeamsStore {
  teamFormation = {
    config: [1, 4, 4, 2],
    configPositionTypes: ["GK", "DF", "MF", "FW"]
  };
  isLoading = true;
  team = {
    players: []
  };
  teams = [];

  constructor() {
    makeObservable(this, {
      teamFormation: observable,
      isLoading: observable,
      team: observable,
      teams: observable,
      fetchTeam: action,
      teamInFormation: computed,
      fetchTeams: action,
      resetTeam: action,
      resetTeams: action
    });
  }

  fetchTeam = async (sport, teamId) => {
    this.isLoading = true;
    const url = `/api/static/${sport}/team/${teamId}`;
    const response = await fetch(url);
    const data = await response.json();
    this.isLoading = false;

    this.team = data;
  };

  // todo - this is a bit of a mess, but it works for now
  get teamInFormation() {
    const { config, configPositionTypes } = this.teamFormation;
    const { players } = this.team;

    const playersInFormation = [];

    config.forEach((configPositionType, i) => {
      const positionType = configPositionTypes[i];
      const playersForPositionType = players.filter(
        (player) => player.position === positionType
      );

      const playersForPositionTypeInFormation = [];

      for (let i = 0; i < configPositionType; i++) {
        playersForPositionTypeInFormation.push(
          playersForPositionType[i % playersForPositionType.length]
        );
      }

      playersInFormation.push(playersForPositionTypeInFormation);
    });

    return playersInFormation;
  }

  fetchTeams = async (sport, sortOrder = "asc") => {
    const url = `/api/static/${sport}/teams/${sortOrder}`;
    const response = await fetch(url);
    const data = await response.json();

    this.teams = data;
  };

  resetTeam = () => {
    this.team = {
      players: []
    };
  };

  resetTeams = () => {
    this.teams = [];
  };
}

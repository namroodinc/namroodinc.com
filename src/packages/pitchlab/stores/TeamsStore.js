import { action, makeObservable, observable } from "mobx";

export class TeamsStore {
  team = {
    players: []
  };
  teams = [];

  constructor() {
    makeObservable(this, {
      team: observable,
      teams: observable,
      fetchTeam: action,
      fetchTeams: action,
      resetTeam: action,
      resetTeams: action
    });
  }

  fetchTeam = async (sport, teamId) => {
    const url = `/api/static/${sport}/team/${teamId}`;
    const response = await fetch(url);
    const data = await response.json();

    this.team = data;
  };

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

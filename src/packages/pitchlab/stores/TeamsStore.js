import { action, computed, makeObservable, observable } from "mobx";

export class TeamsStore {
  isLoading = true;
  team = {
    formation: [],
    players: []
  };
  teams = [];

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      team: observable,
      teams: observable,
      fetchTeam: action,
      fetchTeams: action,
      resetTeam: action,
      resetTeams: action,
      teamInFormation: computed
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

  fetchFormation = async (sport, formationId) => {
    this.isLoading = true;
    const url = `/api/static/${sport}/formation/${formationId}`;
    const response = await fetch(url);
    const data = await response.json();
    this.isLoading = false;

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
      formation: [],
      players: []
    };
  };

  resetTeams = () => {
    this.teams = [];
  };

  // todo - this is a bit of a mess, but it works for now
  get teamInFormation() {
    // map through team formation and return a player matching the position and only use the player once
    let players = [];
    this.team.formation.forEach((position) => {
      const player = this.team.players.find((player) => {
        return (
          player.position === position.position &&
          !players.find((_player) => _player.lastName === player.lastName)
        );
      });
      if (player) {
        players.push({
          ...player,
          x: position.x,
          y: position.y
        });
      }
    });

    return players;
  }
}

// // adding comments with some useful bits here

// Note: The positions listed in the CSV file for basketball teams are as follows:

// PG: Point guard
// SG: Shooting guard
// SF: Small forward
// PF: Power forward
// C: Center

// note: for soccer
// Note: DF stands for defender, FW stands for forward, and MF stands for midfielder.

// Note that the position column follows the following acronyms:

// GK: goalkeeper
// DF: defender
// MF: midfielder
// FW: forward.
export const basketballFormations = [
  {
    config: [5],
    configPositionTypes: ["C"],
    name: "5-out",
    description:
      "This is a formation that features five players on the perimeter and one player in the post. The five players on the perimeter are usually split into two pairs of point guards and shooting guards and two pairs of small forwards and power forwards. The center is usually the tallest player on the team and is responsible for scoring points in the paint."
  },
  {
    config: [4, 1],
    configPositionTypes: ["C"],
    name: "4-out",
    description:
      "This is a formation that features four players on the perimeter and two players in the post. The four players on the perimeter are usually split into two pairs of point guards and shooting guards and two pairs of small forwards and power forwards. The two players in the post are usually the tallest players on the team and are responsible for scoring points in the paint."
  },
  {
    config: [3, 2],
    configPositionTypes: ["C"],
    name: "3-out",
    description:
      "This is a formation that features three players on the perimeter and three players in the post. The three players on the perimeter are usually split into two pairs of point guards and shooting guards and two pairs of small forwards and power forwards. The three players in the post are usually the tallest players on the team and are responsible for scoring points in the paint."
  },
  {
    config: [2, 3],
    configPositionTypes: ["C"],
    name: "2-out",
    description:
      "This is a formation that features two players on the perimeter and four players in the post. The two players on the perimeter are usually split into two pairs of point guards and shooting guards and two pairs of small forwards and power forwards. The four players in the post are usually the tallest players on the team and are responsible for scoring points in the paint."
  },
  {
    config: [1, 4],
    configPositionTypes: ["C"],
    name: "1-out",
    description:
      "This is a formation that features one player on the perimeter and five players in the post. The one player on the perimeter is usually split into two pairs of point guards and shooting guards and two pairs of small forwards and power forwards. The five players in the post are usually the tallest players on the team and are responsible for scoring points in the paint."
  }
];

export const basketballPositions = [
  {
    acronym: "PG",
    name: "Point Guard",
    description:
      "The point guard is the player who controls the ball and directs the offense. They are usually the fastest player on the team and are responsible for setting up the team's offense."
  },
  {
    acronym: "SG",
    name: "Shooting Guard",
    description:
      "The shooting guard is the player who is responsible for shooting the ball. They are usually the second fastest player on the team and are responsible for scoring points."
  },
  {
    acronym: "SF",
    name: "Small Forward",
    description:
      "The small forward is the player who is responsible for defending the opposing team's shooting guard. They are usually the third fastest player on the team and are responsible for scoring points."
  },
  {
    acronym: "PF",
    name: "Power Forward",
    description:
      "The power forward is the player who is responsible for defending the opposing team's small forward. They are usually the fourth fastest player on the team and are responsible for scoring points."
  },
  {
    acronym: "C",
    name: "Center",
    description:
      "The center is the player who is responsible for defending the opposing team's power forward. They are usually the slowest player on the team and are responsible for scoring points."
  }
];

export const soccerFormations = [
  {
    config: [1, 4, 4, 2],
    configPositionTypes: ["GK", "DF", "MF", "FW"],
    name: "4-4-2",
    description:
      "This is one of the most common soccer formations. It features four defenders, four midfielders, and two forwards. The midfielders are usually split into two pairs of defensive and attacking midfielders. The two forwards typically play together as a strike partnership."
  },
  {
    config: [1, 4, 3, 3],
    configPositionTypes: ["GK", "DF", "MF", "FW"],
    name: "4-3-3",
    description:
      "In this formation, there are four defenders, three midfielders, and three forwards. The three forwards typically consist of a center forward and two wingers. The wingers are responsible for providing width to the team's attack."
  },
  {
    config: [1, 3, 5, 2],
    configPositionTypes: ["GK", "DF", "MF", "FW"],
    name: "3-5-2",
    description:
      "This is a formation that features three defenders, five midfielders, and two forwards. The midfield is composed of three central midfielders and two wing-backs. This formation allows for a strong defensive presence and a lot of midfield control."
  },
  {
    config: [1, 4, 2, 3],
    configPositionTypes: ["GK", "DF", "MF", "FW"],
    name: "4-2-3-1",
    description:
      "This formation is often used by teams looking to control the midfield. It features four defenders, two holding midfielders, three attacking midfielders, and one forward. The attacking midfielders often play in a more advanced position than the holding midfielders, and are responsible for creating goal-scoring opportunities."
  },
  {
    config: [1, 3, 4, 3],
    configPositionTypes: ["GK", "DF", "MF", "FW"],
    name: "3-4-3",
    description:
      "This is a formation that features three defenders, four midfielders, and three forwards. The midfielders are split into two pairs of central midfielders and two wing-backs. The wing-backs are responsible for providing width to the team's attack."
  },
  {
    config: [1, 5, 4, 1],
    configPositionTypes: ["GK", "DF", "MF", "FW"],
    name: "4-5-1",
    description:
      "This formation features four defenders, five midfielders, and one forward. The midfielders are split into two pairs of central midfielders and two wing-backs. The wing-backs are responsible for providing width to the team's attack."
  },
  {
    config: [1, 4, 3, 2],
    configPositionTypes: ["GK", "DF", "MF", "FW"],
    name: "4-3-1-2",
    description:
      "This formation features four defenders, three midfielders, one defensive midfielder, and two forwards. The midfielders are split into two pairs of central midfielders and two wing-backs. The wing-backs are responsible for providing width to the team's attack."
  },
  {
    config: [1, 4, 1, 4],
    configPositionTypes: ["GK", "DF", "MF", "FW"],
    name: "4-1-4-1",
    description:
      "This formation features four defenders, one defensive midfielder, four attacking midfielders, and one forward. The midfielders are split into two pairs of central midfielders and two wing-backs. The wing-backs are responsible for providing width to the team's attack."
  }
];

export const soccerPositions = [
  {
    acronym: "GK",
    name: "Goalkeeper",
    description:
      "The goalkeeper is the player who is responsible for defending the goal."
  },
  {
    acronym: "DF",
    name: "Defender",
    description:
      "The defender is the player who is responsible for defending the opposing team's forwards. They are usually the second slowest player on the team and are responsible for scoring points."
  },
  {
    acronym: "MF",
    name: "Midfielder",
    description:
      "The midfielder is the player who is responsible for controlling the ball and directing the offense. They are usually the third slowest player on the team and are responsible for scoring points."
  },
  {
    acronym: "FW",
    name: "Forward",
    description:
      "The forward is the player who is responsible for shooting the ball. They are usually the fastest player on the team and are responsible for scoring goals."
  }
];

const manchesterUnitedPlayers_95_96 = [
  [
    {
      name: "Peter Schmeichel",
      number: 1,
      position: "GK"
    }
  ],
  [
    {
      name: "Ronny Johnsen",
      number: 5,
      position: "LB"
    },
    {
      name: "Steve Bruce",
      number: 3,
      position: "CB"
    },
    {
      name: "Paul Parker",
      number: 4,
      position: "CB"
    },
    {
      name: "Gary Neville",
      number: 2,
      position: "RB"
    }
  ],
  [
    {
      name: "David Beckham",
      number: 6,
      position: "RM"
    },
    {
      name: "Roy Keane",
      number: 8,
      position: "CM"
    },
    {
      name: "Nicky Butt",
      number: 16,
      position: "CM"
    }
  ],
  [
    {
      name: "Ryan Giggs",
      number: 11,
      position: "LM"
    }
  ],
  [
    {
      name: "Eric Cantona",
      number: 7,
      position: "ST"
    },
    {
      name: "Andy Cole",
      number: 9,
      position: "ST"
    }
  ]
];

const chelseaPlayers_04_05 = [
  [
    {
      name: "Petr Čech",
      number: 1,
      position: "GK"
    }
  ],
  [
    {
      name: "Ashley Cole",
      number: 3,
      position: "LB"
    },
    {
      name: "John Terry",
      number: 26,
      position: "CB"
    },
    {
      name: "Ricardo Carvalho",
      number: 5,
      position: "CB"
    },
    {
      name: "Paulo Ferreira",
      number: 2,
      position: "RB"
    }
  ],
  [
    {
      name: "Michael Essien",
      number: 24,
      position: "CM"
    }
  ],
  [
    {
      name: "Arjen Robben",
      number: 10,
      position: "LM"
    },
    {
      name: "Frank Lampard",
      number: 8,
      position: "CM"
    },
    {
      name: "Joe Cole",
      number: 7,
      position: "RM"
    }
  ],
  [
    {
      name: "Didier Drogba",
      number: 11,
      position: "ST"
    }
  ],
  [
    {
      name: "Andriy Shevchenko",
      number: 9,
      position: "ST"
    }
  ]
];

const manchesterUnited = {
  manager: "Sir Alex Ferguson",
  name: "Manchester United",
  fullName: "Manchester United Football Club",
  stadium: {
    name: "Old Trafford",
    capacity: 76212
  },
  facts: [
    "Manchester United is the most successful club in English football, having won 20 league titles, 12 FA Cups, 5 League Cups, 21 FA Community Shields, 2 UEFA Champions Leagues, 1 UEFA Europa League, 1 UEFA Cup Winners' Cup, 1 UEFA Super Cup, 3 Intercontinental Cups and 1 FIFA Club World Cup.",
    "Manchester United was formed in 1878 as Newton Heath LYR Football Club by the Carriage and Wagon department of the Lancashire and Yorkshire Railway depot at Newton Heath. The club changed its name to Manchester United in 1902 and moved to Old Trafford in 1910.",
    "Manchester United has the highest average home attendance in English football, and the second-highest average attendance in European football, behind Real Madrid."
  ],
  players: manchesterUnitedPlayers_95_96.map((players, index) => ({
    index,
    players
  })),
  colors: {
    primary: "#DA291C",
    secondary: "#FFFFFF"
  },
  captain: {
    name: "Eric Cantona"
  }
};

const chelsea = {
  manager: "Jose Mourinho",
  name: "Chelsea",
  fullName: "Chelsea Football Club",
  stadium: {
    name: "Stamford Bridge",
    capacity: 41841
  },
  facts: [
    "Chelsea Football Club is an English professional football club based in Fulham, London. Founded in 1905, the club competes in the Premier League, the top flight of English football.",
    "Chelsea is one of the most successful clubs in English football, having won over thirty competitive honours, including six league titles, six FA Cups, five League Cups, two UEFA Champions Leagues, one UEFA Europa League, one UEFA Cup Winners' Cup, one UEFA Super Cup, one FIFA Club World Cup and one UEFA Europa League Winners' Cup.",
    "Chelsea is the only London club to win the UEFA Champions League, and one of four clubs, and the only British club, to have won all three main UEFA club competitions."
  ],
  players: chelseaPlayers_04_05.map((players, index) => ({
    index,
    players
  })),
  colors: {
    primary: "#034694",
    secondary: "#FFFFFF"
  },
  captain: {
    name: "John Terry"
  }
};

export { chelsea, manchesterUnited };

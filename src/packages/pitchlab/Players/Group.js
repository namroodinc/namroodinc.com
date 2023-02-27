import React from "react";
import propTypes from "prop-types";

const Group = (props) => {
  const { colors, padding, players, ...rest } = props;

  const PlayerMarker = (player) => {
    return (
      <>
        <circle cx={0} cy={0} r={15} fill={colors.primary} />
        {/* <text x={0} y={0} fill={colors.secondary}>
          {player.number}
        </text> */}
        <text x={0} y={0} fill={colors.secondary}>
          {player.position}
        </text>
      </>
    );
  };

  return (
    <g
      transform={
        rest.isHorizontal
          ? `translate(${rest.index === 0 ? 0 : rest.width}, 0)`
          : `translate(0, ${rest.index === 0 ? 0 : rest.width})`
      }
    >
      {players.map((row, i) => {
        const rowTranslate =
          rest.index === 0
            ? i * (rest.width / players.length) +
              rest.width / players.length / 2
            : (players.length - i - 1) * (rest.width / players.length) +
              rest.width / players.length / 2;
        return (
          <g
            key={i}
            transform={
              rest.isHorizontal
                ? `translate(${rowTranslate}, 0)`
                : `translate(0, ${rowTranslate})`
            }
          >
            {row.players.map((player, j) => {
              const playerTranslate =
                rest.index === 0
                  ? j * (rest.height / row.players.length) +
                    rest.height / row.players.length / 2
                  : (row.players.length - j - 1) *
                      (rest.height / row.players.length) +
                    rest.height / row.players.length / 2;
              return (
                <g
                  key={j}
                  transform={
                    rest.isHorizontal
                      ? `translate(0, ${playerTranslate})`
                      : `translate(${playerTranslate}, 0)`
                  }
                >
                  <PlayerMarker {...player} />
                </g>
              );
            })}
          </g>
        );
      })}
    </g>
  );
};

Group.propTypes = {
  colors: propTypes.shape({
    primary: propTypes.string.isRequired,
    secondary: propTypes.string.isRequired
  }).isRequired,
  captain: propTypes.shape({
    name: propTypes.string.isRequired
  }).isRequired,
  height: propTypes.number.isRequired,
  isHorizontal: propTypes.bool.isRequired,
  players: propTypes.array.isRequired,
  width: propTypes.number.isRequired
};

Group.defaultProps = {
  captain: {},
  colors: {
    primary: "red",
    secondary: "white"
  },
  isHorizontal: true,
  players: []
};

export default Group;

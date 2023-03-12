import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { usePitchLabStore } from "../stores";

import ColorPicker from "../../../components/colorPicker";
import Columns from "../../../components/columns";
import Forms from "../../../components/forms";
import PlayingArea from "../PlayingArea";
import TeamWrapper from "../team/Wrapper";

const SportSoccer = observer(() => {
  const teamsStore = usePitchLabStore("teamsStore");

  const { teams } = teamsStore;
  const { sport } = useParams();

  useEffect(() => {
    teamsStore.fetchTeams(sport);
  }, [teamsStore, sport]);

  if (!teams) {
    return <div>Loading...</div>;
  }

  const [pitchColor, setPitchColor] = useState("#FFF");
  const [strokeColor, setStrokeColor] = useState("#000");
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [padding, setPadding] = useState(20);
  const [fullPitchView, setFullPitchView] = useState(true);
  const [isLandscape, setIsLandscape] = useState(true);

  return (
    <>
      <h3>Color, Padding and Stroke</h3>
      <p>
        You can change the color of the pitch by setting the{" "}
        <code>fillColor</code> prop to a hex color code. You can also change the
        color of the stroke by setting the <code>strokeColor</code> prop to a
        hex color code. Use the color pickers below to test out different
        colors.
      </p>
      <p>
        You can change the padding of the pitch by setting the{" "}
        <code>padding</code> prop to a number. The default value is{" "}
        <code>20</code>. Use the slider below to test out different padding
        values.
      </p>
      <p>
        You can change the width of the stroke by setting the{" "}
        <code>strokeWidth</code> prop to a number. The default value is{" "}
        <code>2</code>. Use the slider below to test out different stroke width
        values.
      </p>
      <Columns numberOfColumns={3}>
        <ColorPicker
          label="Pitch Color"
          onClick={(color) => {
            setPitchColor(color);
          }}
        />
        <ColorPicker
          label="Stroke Color"
          onClick={(color) => {
            setStrokeColor(color);
          }}
        />
        <div>
          <Forms
            name="padding"
            label="Padding"
            type="range"
            onChange={(event) => setPadding(parseInt(event.target.value))}
            value={padding}
          />
          <Forms
            max={10}
            min={1}
            name="strokeWidth"
            label="Stroke Width"
            type="range"
            onChange={(event) => setStrokeWidth(parseInt(event.target.value))}
            value={strokeWidth}
          />
        </div>
      </Columns>
      <PlayingArea
        sport="soccer"
        fillColor={pitchColor}
        padding={padding}
        strokeColor={strokeColor}
        strokeWidth={strokeWidth}
      />
      <pre>
        <code>
          {`<PlayingArea
  sport="soccer"
  fillColor="${pitchColor}"
  padding={${padding}}
  strokeColor="${strokeColor}"
  strokeWidth={${strokeWidth}}
/>`}
        </code>
      </pre>
      <hr />
      <h3>Orientation and View</h3>
      <p>
        You can change the orientation of the pitch by setting the{" "}
        <code>isLandscape</code> prop to <code>true</code> or <code>false</code>
        . You can also change the view of the pitch by setting the{" "}
        <code>fullPitchView</code> prop to <code>true</code> or{" "}
        <code>false</code>.
      </p>
      <Columns numberOfColumns={2}>
        <Forms
          name="isLandscape"
          label="Orientation"
          type="radio"
          onChange={(event) => setIsLandscape(event.target.value === "true")}
          options={[
            { label: "Landscape", value: true },
            { label: "Portrait", value: false }
          ]}
          value={isLandscape}
        />
        <Forms
          name="fullPitchView"
          label="View"
          type="radio"
          onChange={(event) => setFullPitchView(event.target.value === "true")}
          options={[
            { label: "Full Pitch", value: true },
            { label: "Half Pitch", value: false }
          ]}
          value={fullPitchView}
        />
      </Columns>
      <PlayingArea
        sport="soccer"
        isLandscape={isLandscape}
        fullPitchView={fullPitchView}
      />
      <pre>
        <code>
          {`<PlayingArea
  sport="soccer"
  isLandscape={${isLandscape}}
  fullPitchView={${fullPitchView}}
/>`}
        </code>
      </pre>
      <hr />
      <h3>Players and Formations</h3>
      <p>
        You can add players to the pitch by setting the <code>players</code>{" "}
        prop to an array of objects. Each object should have the following
        properties ####CONTINUE HERE
      </p>
      <Columns numberOfColumns={2}>
        {teams.map((team, index) => (
          <TeamWrapper {...team} sport={sport} key={index}>
            <div key={team.id}>
              <PlayingArea
                sport="soccer"
                brandColor={team.brandColor}
                fillColor="#97FFFF"
                fullPitchView={false}
                isLandscape={false}
                strokeColor="#3399CC"
                markers={team.formation}
              />
              <span>{team.defaultFormation}</span>
            </div>
          </TeamWrapper>
        ))}
      </Columns>
      <hr />
      <h3>Heat Maps</h3>
      <p>
        You can add a heat map to the pitch by setting the <code>heatMap</code>{" "}
        prop to an array of objects. Each object should ####CONTINUE HERE
      </p>
      <hr />
      <h3>Perceived Threat</h3>
      <p>
        You can add a perceived threat map to the pitch by setting the{" "}
        <code>perceivedThreat</code> prop to an array of objects. Each object
        should have the following properties ####CONTINUE HERE
      </p>
    </>
  );
});

SportSoccer.defaultProps = {};

SportSoccer.propTypes = {};

export default SportSoccer;

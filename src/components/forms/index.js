import React, { useMemo } from "react";
import propTypes from "prop-types";

function Forms(props) {
  const input = useMemo(() => {
    switch (props.type) {
      case "text":
        return <input type="text" name={props.name} />;
      case "range":
        return (
          <input
            type="range"
            name={props.name}
            min={props.min}
            max={props.max}
            onChange={props.onChange}
            value={props.value}
          />
        );
      case "checkbox":
        return <input type="checkbox" name={props.name} />;
      case "radio":
        return (
          <div>
            {props.options.map((option) => (
              <label key={option.value}>
                <input
                  type="radio"
                  name={props.name}
                  value={option.value}
                  checked={props.value === option.value}
                  onChange={props.onChange}
                />
                {option.label}
              </label>
            ))}
          </div>
        );
      case "color":
        return <input type="color" name={props.name} />;
      case "date":
        return <input type="date" name={props.name} />;
      case "time":
        return <input type="time" name={props.name} />;
      case "datetime-local":
        return <input type="datetime-local" name={props.name} />;
      case "month":
        return <input type="month" name={props.name} />;
      case "week":
        return <input type="week" name={props.name} />;
      case "number":
        return <input type="number" name={props.name} />;
      case "email":
        return <input type="email" name={props.name} />;
      case "url":
        return <input type="url" name={props.name} />;
      case "search":
        return <input type="search" name={props.name} />;
      case "tel":
        return <input type="tel" name={props.name} />;
      case "password":
        return <input type="password" name={props.name} />;
      default:
        return <input type="text" name={props.name} />;
    }
  }, [props]);

  return (
    <div>
      <label htmlFor={props.name}>{props.label}</label>
      {input}
    </div>
  );
}

Forms.defaultProps = {
  label: "test",
  max: 20,
  min: 0,
  name: "test",
  onChange: () => {},
  options: [],
  type: "text",
  value: 5
};

Forms.propTypes = {
  label: propTypes.string,
  max: propTypes.number,
  min: propTypes.number,
  name: propTypes.string.isRequired,
  onChange: propTypes.func,
  options: propTypes.arrayOf(
    propTypes.shape({
      label: propTypes.string,
      value: propTypes.oneOfType([
        propTypes.string,
        propTypes.number,
        propTypes.bool
      ])
    })
  ),
  type: propTypes.oneOf([
    "text",
    "range",
    "checkbox",
    "radio",
    "color",
    "date",
    "time",
    "datetime-local",
    "month",
    "week",
    "number",
    "email",
    "url",
    "search",
    "tel",
    "password"
  ]),
  value: propTypes.oneOfType([
    propTypes.string,
    propTypes.number,
    propTypes.bool
  ])
};

export default Forms;

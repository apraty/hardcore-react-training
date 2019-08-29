import React from "react";
import Person from "./Person";
import PropTypes from "prop-types";

const PersonList = props => {
  const { persons, showMetadata, ...rest } = props;

  const avg = persons.reduce((a, p) => a + p.age, 0) / persons.length;

  return (
    <div>
      {showMetadata && <p>Average age: {avg.toFixed(2)}</p>}

      {persons.map(person => {
        return <Person key={person.id} {...rest} person={person}/>;
      })}
    </div>
  );
};

PersonList.propTypes = {
  showMetadata: PropTypes.bool.isRequired,
  persons: PropTypes.array.isRequired
};

PersonList.defaultProps = {
  showMetadata: false
};

export default PersonList;

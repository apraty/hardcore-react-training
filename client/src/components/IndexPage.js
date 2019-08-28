import React from "react";
import PersonList from "./PersonList";
import HirePersonForm from "./HirePersonForm";
import { useAppModels } from "../config/modelHelpers";

const IndexPage = () => {
  const { personStore } = useAppModels();

  return (
    <div>
      <HirePersonForm/>
      <h2>Bad Persons</h2>
      <PersonList persons={personStore.getBadPersons()} showMetadata/>
      <h2>Good Persons</h2>
      <PersonList persons={personStore.getGoodPersons()}/>
    </div>
  );
};

export default IndexPage;

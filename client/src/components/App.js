import React, { useEffect, useCallback } from "react";
import Spinner from "./Spinner";
import IndexPage from "./IndexPage";
import PersonPage from "./PersonPage";
import NotFoundPage from "./NotFoundPage";

import { Switch, Route } from "react-router";
import { observer } from "mobx-react";
import { useAppModels } from "../config/modelHelpers";

const App = () => {
  const appModels = useAppModels();
  const { personStore } = appModels;

  useEffect(() => {
    personStore.getPersons();
  }, []);

  return (
    <div>
      {appModels.isLoading() && <Spinner/>}
      <h1>MST ERP v2000.0</h1>

      <Switch>
        <Route exact path="/" component={IndexPage}/>
        <Route
          exact
          path="/person/:id"
          render={props => {
            const person = personStore.persons.get(props.match.params.id);
            return <PersonPage person={person}/>;
          }}
        />
        <Route component={NotFoundPage}/>
      </Switch>
    </div>
  );
};

export default observer(App);

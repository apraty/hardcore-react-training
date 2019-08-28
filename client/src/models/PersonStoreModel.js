import { types, flow, destroy, getRoot } from "mobx-state-tree"
import PersonModel from "./PersonModel";
import personService from "../services/person";
import { values } from "mobx";

const PersonStoreModel = types
  .model("PersonStoreModel", {
    persons: types.map(PersonModel)
  })
  .views(self => {
    const isGood = p => p.age < 50 || p.isRelatedToCEO === true;
    return {
      getGoodPersons: () => values(self.persons).filter(isGood),
      getBadPersons: () => values(self.persons).filter(p => !isGood(p))
    }
  })
  .actions(self => {
    const appModels = getRoot(self);

    return {
      getPersons: flow(function* getPersons() {
        appModels.increaseLoadingCount();
        try {
          const personsFromApi = yield personService.getPersons();
          personsFromApi.forEach(apiPerson => self.persons.put(apiPerson));
          appModels.decreaseLoadingCount();
        } catch (error) {
          console.error("Failed to fetch persons", error);
          appModels.decreaseLoadingCount();
        }
        return self.persons;
      }),
      hirePerson: flow(function* hirePerson(person) {
        appModels.increaseLoadingCount();
        try {
          yield personService.hirePerson(person);
          self.persons.put(person);
          appModels.decreaseLoadingCount();
        } catch (error) {
          console.error("Failed to hire person", error);
          appModels.decreaseLoadingCount();
        }
      }),
      destroyPerson: person => destroy(person)
    }
  });

export default PersonStoreModel;

import { types, flow, getRoot } from "mobx-state-tree"
import personService from "../services/person";

const PersonModel = types
  .model("PersonModel", {
    id: types.identifier,
    firstName: types.string,
    lastName: types.string,
    age: types.number,
    gender: types.string,
    relatedToCEO: false,
    isBeingFired: false
  })
  .actions(self => ({
    fire: flow(function* fire() {
      const appModels = getRoot(self);
      appModels.increaseLoadingCount();
      self.isBeingFired = true;
      try {
        yield personService.firePerson(self.id);
        appModels.personStore.destroyPerson(self); // persons map needs to be modified by personStore
        appModels.decreaseLoadingCount();
      } catch (error) {
        console.error("Failed to fire person", error);
        appModels.decreaseLoadingCount();
      }
    })
  }));

export default PersonModel;

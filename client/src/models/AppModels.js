import {types} from "mobx-state-tree"
import PersonStoreModel from "./PersonStoreModel";

const AppModels = types
  .model("AppModels", {
    personStore: types.optional(PersonStoreModel, {}),
    loadingCount: 0
  })
  .views(self => ({
    isLoading: () => self.loadingCount > 0
  }))
  .actions(self => ({
    increaseLoadingCount: () => self.loadingCount = self.loadingCount + 1,
    decreaseLoadingCount: () => self.loadingCount = self.loadingCount - 1
  }));

export default AppModels;

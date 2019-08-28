import React from "react";

const MSTContext = React.createContext(null);
export const Provider = MSTContext.Provider;

export function useAppModels(mapStateToProps) {
  const appModels = React.useContext(MSTContext);

  if (typeof mapStateToProps !== 'undefined') {
    return mapStateToProps(appModels);
  }
  return appModels;
}

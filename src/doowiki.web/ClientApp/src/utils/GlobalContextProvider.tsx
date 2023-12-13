import React from "react";

export const UserContext = React.createContext<IUserContext>({} as IUserContext);
export const SpaceContext = React.createContext<ISpaceContext>({} as ISpaceContext);

export interface ISpaceContext{
    SpaceId: string | undefined,
    SetSpaceId: (SpaceId: string) => void
}

export interface IUserContext{
    UserId: string | undefined,
    SetUserId: (userId : string) => void
}

export interface IGlobalContextProviderProps{
    defaultUserId: string | undefined,
    defaultSpaceId: string | undefined,
    children: JSX.Element
}
export const GlobalContextProvider = ({
  defaultUserId,
  defaultSpaceId,
  children,
} : IGlobalContextProviderProps) => {
  const [userId, setUserId] = React.useState(defaultUserId);
  const [spaceId, setSpaceId] = React.useState(defaultSpaceId);

  return (
    <UserContext.Provider value={{ UserId: userId, SetUserId: setUserId }}>
      <SpaceContext.Provider value={{SpaceId: spaceId, SetSpaceId: setSpaceId }}>
          {children}
      </SpaceContext.Provider>
    </UserContext.Provider>
  );
};

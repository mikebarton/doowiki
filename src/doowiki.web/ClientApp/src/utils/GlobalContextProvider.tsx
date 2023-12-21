import React from "react";

export const UserContext = React.createContext<IUserContext>({} as IUserContext);
export const SpaceContext = React.createContext<ISpaceContext>({} as ISpaceContext);

export interface ISpaceContext{
    SpaceId: string | undefined,
    SetSpaceId: (SpaceId: string) => void
}

export interface IUserContext{
    UserId: string | undefined,
    SetUserId: (userId : string) => void,
    Roles: string[] | undefined,
    SetRoles: (roles : string[]) => void
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
  const [roles, setRoles] = React.useState<string[]>([])
  const [spaceId, setSpaceId] = React.useState(defaultSpaceId);

  return (
    <UserContext.Provider value={{ UserId: userId, SetUserId: setUserId, Roles: roles, SetRoles: setRoles }}>
      <SpaceContext.Provider value={{SpaceId: spaceId, SetSpaceId: setSpaceId }}>
          {children}
      </SpaceContext.Provider>
    </UserContext.Provider>
  );
};

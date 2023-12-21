import { UserContext } from "./GlobalContextProvider"
import React from 'react'

interface IUseSecurity{
    IsAdmin: () => boolean,
    CanWrite: () => boolean,
    SetRoles: (roles: string[]) => void
}

export default function() : IUseSecurity{
    const user = React.useContext(UserContext);

    const isAdmin = () : boolean =>{
        return user.Roles?.some(x=>x.toLowerCase() === 'admin') ?? false;
    }

    const setRoles = (roles: string[]) => {
        user.SetRoles(roles);
    }

    const canWrite = () : boolean => {
        return user.Roles?.some(x=>x.toLowerCase() === 'admin' || x.toLowerCase() === 'author') ?? false;
    }

    return {
        IsAdmin : isAdmin,
        SetRoles: setRoles,
        CanWrite: canWrite
    }
}
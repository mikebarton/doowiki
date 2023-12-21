import useSecurity from "../utils/useSecurity"
import { SecurityClient, SetUserRolesCommand } from "./api.generated.clients";

interface IUseSecurityApi{
    LoadSession: ()=> Promise<void>,
    SetRoles: (roles: string[], userId: string)=> Promise<void>
}

export default function(){
    const security = useSecurity();
    const client = new SecurityClient();

    const loadSession = async () : Promise<void> => {
        const session = await client.session();
        if(!session.roles)
                throw Error('no roles returned from login');
        security.SetRoles(session.roles);
    }

    const setRoles = async (roles: string[], userId: string) : Promise<void> => {
        await client.roles({userId: userId, roles: roles } as SetUserRolesCommand);
    }

    return {
        LoadSession: loadSession,
        SetRoles: setRoles
    } as IUseSecurityApi;
}
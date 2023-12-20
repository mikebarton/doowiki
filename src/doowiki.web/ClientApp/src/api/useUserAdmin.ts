import { UsersClient, GetUserDto } from './api.generated.clients';

interface IUseUserAdmin{
    ListUsers : ()=> Promise<GetUserDto[]>
}

export default function() : IUseUserAdmin{
    const client = new UsersClient();

    const listUsers = () : Promise<GetUserDto[]> =>{
        const users = client.users();
        return users;
    }

    return {
        ListUsers: listUsers
    } as IUseUserAdmin;
}

export type { GetUserDto }
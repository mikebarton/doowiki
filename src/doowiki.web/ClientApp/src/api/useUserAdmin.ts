import { UsersClient, GetUserDto, GetUserItemDto, UpdateUserCommand, CreateUserCommand } from './api.generated.clients';

interface IUseUserAdmin{
    ListUsers : ()=> Promise<GetUserDto[]>,
    GetUser: (userId : string)=> Promise<GetUserDto>,
    UpdateUser: (user : UpdateUserCommand) => Promise<string>,
    CreateUser: (user : CreateUserCommand) => Promise<string>
}

export default function() : IUseUserAdmin{
    const client = new UsersClient();

    const listUsers = () : Promise<GetUserItemDto[]> =>{
        const users = client.list();
        return users;
    }

    const getUser = (userid: string): Promise<GetUserDto> => {
        const user = client.usersGet(userid);
        return user;
    }

    const updateUser = (user : UpdateUserCommand) : Promise<string> =>{
        if(!user.userId)
            throw new Error("cannot update user without id");

        return client.usersPut(user, user.userId!);
    }

    const createUser = (user : CreateUserCommand) : Promise<string> => {
        return client.usersPost(user);
    }

    return {
        ListUsers: listUsers,
        GetUser: getUser,
        UpdateUser: updateUser,
        CreateUser: createUser
    } as IUseUserAdmin;
}

export type { GetUserDto, GetUserItemDto, UpdateUserCommand, CreateUserCommand }
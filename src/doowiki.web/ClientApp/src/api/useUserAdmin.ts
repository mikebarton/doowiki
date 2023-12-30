import { UsersClient, GetUserDto, GetUserItemDto, UpdateUserCommand, CreateUserCommand } from './api.generated.clients';

interface IUseUserAdmin {
    ListUsers: () => Promise<GetUserDto[]>,
    GetUser: (userId: string) => Promise<GetUserDto>,
    UpdateUser: (user: UpdateUserCommand) => Promise<boolean>,
    CreateUser: (user: CreateUserCommand) => Promise<boolean>,
    DeleteUser: (userId: string ) => Promise<boolean>
}

export default function (): IUseUserAdmin {
    const client = new UsersClient();

    const listUsers = (): Promise<GetUserItemDto[]> => {
        const users = client.list();
        return users;
    }

    const getUser = (userid: string): Promise<GetUserDto> => {
        const user = client.usersGet(userid);
        return user;
    }

    const updateUser = async (user: UpdateUserCommand): Promise<boolean> => {
        if (!user.userId)
            throw new Error("cannot update user without id");

        try {
            await client.usersPut(user, user.userId!);
            return true;
        }
        catch {
            return false;
        }
    }

    const createUser = async (user: CreateUserCommand): Promise<boolean> => {
        try {
            await client.usersPost(user);
            return true;
        }
        catch {
            return false;
        }
    }

    const deleteUser = async (userId: string) : Promise<boolean> => {
        try{
            await client.usersDelete(userId);
            return true;
        }
        catch{
            return false;
        }
    }

    return {
        ListUsers: listUsers,
        GetUser: getUser,
        UpdateUser: updateUser,
        CreateUser: createUser,
        DeleteUser: deleteUser
    } as IUseUserAdmin;
}

export type { GetUserDto, GetUserItemDto, UpdateUserCommand, CreateUserCommand }
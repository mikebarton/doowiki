import { UsersClient, GetUserDto, GetUserItemDto, UpdateUserCommand, CreateUserCommand } from './api.generated.clients';
import { useQuery } from '@tanstack/react-query';

interface IQueryResponse<T>{
    isPending: boolean,
    data: T | undefined,
    error: Error
}

interface IUseUserAdmin {
    ListUsers: () => IQueryResponse<GetUserItemDto[]>,
    GetUser: (userId: string) => IQueryResponse<GetUserDto>,
    UpdateUser: (user: UpdateUserCommand) => Promise<boolean>,
    CreateUser: (user: CreateUserCommand) => Promise<boolean>,
    DeleteUser: (userId: string ) => Promise<boolean>
}

export default function (): IUseUserAdmin {

    const listUsers = (): IQueryResponse<GetUserItemDto[]> => {
        const client = new UsersClient();
        const listUsers = useQuery({queryKey:['list-users'], queryFn: ()=>client.list()});
        return listUsers as IQueryResponse<GetUserItemDto[]>
    }  
    

    const getUser = (userid: string): IQueryResponse<GetUserDto> => {
        const client = new UsersClient();
        const user = useQuery({queryKey: ['get-user'], queryFn: ()=> client.usersGet(userid)})
        return user as IQueryResponse<GetUserDto>;
    }

    const updateUser = async (user: UpdateUserCommand): Promise<boolean> => {
        const client = new UsersClient();
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
        const client = new UsersClient();
        try {
            await client.usersPost(user);
            return true;
        }
        catch {
            return false;
        }
    }

    const deleteUser = async (userId: string) : Promise<boolean> => {
        const client = new UsersClient();
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
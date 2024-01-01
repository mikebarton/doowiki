import { UsersClient, GetUserDto, GetUserItemDto, UpdateUserCommand, CreateUserCommand } from './api.generated.clients';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

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
    const client = new UsersClient();
    const queryClient = useQueryClient();

    const updateMutation = useMutation({
        mutationFn: (user : UpdateUserCommand) => client.usersPut(user, user.userId!), 
        onSuccess: (data, cmd)=>{
            console.log(`saved!! - ${JSON.stringify(cmd)}`)
            queryClient.invalidateQueries({ queryKey: ['users']});
    }});

    const createMutation = useMutation({
        mutationFn: (user: CreateUserCommand) => client.usersPost(user),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['users']});
        }
    })

    const deleteMutation = useMutation({
        mutationFn: (userId: string) => client.usersDelete(userId),
        onSuccess: ()=> {
            queryClient.invalidateQueries({queryKey: ['users']})
        }
    })

    const listUsers = (): IQueryResponse<GetUserItemDto[]> => {
        const listUsers = useQuery({queryKey:['users'], queryFn: ()=>client.list()});
        return listUsers as IQueryResponse<GetUserItemDto[]>
    }  
    

    const getUser = (userid: string): IQueryResponse<GetUserDto> => {        
        const user = useQuery({queryKey: ['users', userid], queryFn: ()=> client.usersGet(userid)})
        return user as IQueryResponse<GetUserDto>;
    }

    const updateUser = async (user: UpdateUserCommand): Promise<boolean> => {
        if (!user.userId)
            throw new Error("cannot update user without id");

        try {
            updateMutation.mutateAsync(user);
            return true;
        }
        catch {
            return false;
        }
    }    

    const createUser = async (user: CreateUserCommand): Promise<boolean> => {
        try {
            await createMutation.mutateAsync(user);
            return true;
        }
        catch {
            return false;
        }
    }

    const deleteUser = async (userId: string) : Promise<boolean> => {
        try{
            await deleteMutation.mutateAsync(userId);
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
import React from 'react';
import { Grid, Text, Button } from '@radix-ui/themes';
import { TextField } from '@radix-ui/themes';
import useUserAdmin, { CreateUserCommand, GetUserDto, UpdateUserCommand } from '../../api/useUserAdmin';

interface IEditUserFormProps {
    userId?: string | undefined,
    onUpdated?: ()=> void
}

interface ICanSaveForm{
    onSave: ()=>void
}

const EditUserForm = React.forwardRef(({ userId, onUpdated }: IEditUserFormProps, ref: React.ForwardedRef<ICanSaveForm>) => {
    const userAdmin = useUserAdmin();
    const [user, setUser] = React.useState<GetUserDto>();
    const [password, setPassword] = React.useState<string>();
    const [confirmPassword, setConfirmPassword] = React.useState<string>();

    React.useEffect(() => {        
        getUser();
    }, [])    

    async function getUser() {
        if (!userId)
            setUser({} as GetUserDto);
        else {
            const retrievedUser = await userAdmin.GetUser(userId);
            setUser(retrievedUser);
        }
    }

    React.useImperativeHandle(ref, ()=>({
        onSave(){
            let task : Promise<boolean>;
            if(!!userId){
                task = userAdmin.UpdateUser({...user} as UpdateUserCommand)                    
            }
            else{
                if(!password || password !== confirmPassword)
                    return;

                task = userAdmin.CreateUser({...user, password: password} as CreateUserCommand)
            }

            task.then(()=> {
                if(onUpdated)
                    onUpdated()
            });
        }
    }))


    return (
        <Grid columns={'2'} gap={'3'}>
            <Text>First Name</Text>
            <TextField.Input value={user?.firstName} onChange={e=>setUser({...user, firstName: e.target.value})}/>

            <Text>Last Name</Text>
            <TextField.Input value={user?.lastName} onChange={e=>setUser({...user, lastName: e.target.value})}/>

            <Text>Email Name</Text>
            <TextField.Input value={user?.email} onChange={e=>setUser({...user, email: e.target.value})}/>    
            
            { !userId && (<>
                    <Text>Password</Text>
                    <TextField.Input type='password' value={password} onChange={e=>setPassword(e.target.value)}/>    

                    <Text>Confirm Password</Text>
                    <TextField.Input type='password' value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}/>    
                </>
            )}        
        </Grid>)
})

interface ISaveUserButtonProps{
    onClick: ()=>void
}
const SaveUserButton = (props : ISaveUserButtonProps)=>{    
    return <Button onClick={props.onClick}>Save</Button>
}

const UserForm = {
    Content: EditUserForm,
    SaveButton: SaveUserButton
}
export default UserForm;
export type { ICanSaveForm };

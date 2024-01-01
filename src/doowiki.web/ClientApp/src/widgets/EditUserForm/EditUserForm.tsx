import React from 'react';
import { Flex, Button } from '../../components';
import * as Form from '@radix-ui/react-form'
import useUserAdmin, { CreateUserCommand, GetUserDto, UpdateUserCommand } from '../../api/useUserAdmin';

interface IEditUserFormProps {
    userId?: string | undefined,
    onUpdated?: () => void
}

interface ICanSaveForm {
    onSave: () => void
}

const EditUserForm = React.forwardRef(({ userId, onUpdated }: IEditUserFormProps, ref: React.ForwardedRef<ICanSaveForm>) => {
    const userAdmin = useUserAdmin();
    const userQuery = userAdmin.GetUser(userId!);
    const [user, setUser] = React.useState<GetUserDto>();
    const [password, setPassword] = React.useState<string>();
    const [confirmPassword, setConfirmPassword] = React.useState<string>();

    React.useEffect(()=>{
        if(!userId){
            setUser({} as GetUserDto);
        }
        else if(!userQuery.isPending){
            setUser(userQuery.data);
        }
    },[userQuery.data])

    React.useImperativeHandle(ref, () => ({
        onSave() {
            let task: Promise<boolean>;
            if (!!userId) {
                task = userAdmin.UpdateUser({ ...user } as UpdateUserCommand)
            }
            else {
                if (!password || password !== confirmPassword)
                    return;

                task = userAdmin.CreateUser({ ...user, password: password } as CreateUserCommand)
            }
        }
    }))


    return (
        <Form.Root>
            <Flex direction='column' gap={3}>
                <Form.Field name='fname'>
                    <Flex direction='column'>
                        <Form.Label>First Name</Form.Label>
                        <Form.Message match={'valueMissing'}>Enter a First Name</Form.Message>
                        <Form.Control asChild>
                            <input value={user?.firstName} onChange={e => setUser({ ...user, firstName: e.target.value })} />
                        </Form.Control>
                    </Flex>
                </Form.Field>

                <Form.Field name='lname'>
                    <Flex direction='column'>
                        <Form.Label>Last Name</Form.Label>
                        <Form.Message match={'valueMissing'}>Enter a Last Name</Form.Message>
                        <Form.Control asChild>
                            <input value={user?.lastName} onChange={e => setUser({ ...user, lastName: e.target.value })} />
                        </Form.Control>
                    </Flex>
                </Form.Field>

                <Form.Field name='email'>
                    <Flex direction='column'>
                        <Form.Label>Email</Form.Label>
                        <Form.Message match={'typeMismatch'}>Enter an Email</Form.Message>
                        <Form.Control asChild>
                            <input type='email' value={user?.email} onChange={e => setUser({ ...user, email: e.target.value })} />
                        </Form.Control>
                    </Flex>
                </Form.Field>

                {!userId && (<>
                    <Form.Field name='password'>
                        <Flex direction='column'>
                            <Form.Label>Password</Form.Label>
                            <Form.Message match={'valueMissing'}>Enter an Password</Form.Message>
                            <Form.Control asChild>
                                <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
                            </Form.Control>
                        </Flex>
                    </Form.Field>

                    <Form.Field name='confirmPassword'>
                        <Flex direction='column'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Message match={'valueMissing'}>Enter an Email</Form.Message>
                            <Form.Control asChild>
                                <input type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                            </Form.Control>
                        </Flex>
                    </Form.Field>
                </>
                )}
            </Flex>
        </Form.Root>)
})

interface ISaveUserButtonProps {
    onClick: () => void
}
const SaveUserButton = (props: ISaveUserButtonProps) => {
    return <Button onClick={props.onClick}>Save</Button>
}

const UserForm = {
    Content: EditUserForm,
    SaveButton: SaveUserButton
}
export default UserForm;
export type { ICanSaveForm };


import { PlusCircledIcon, Cross1Icon } from '@radix-ui/react-icons';
import { Flex, Button, Div, Span, Heading } from '../../components';
import React from 'react';
import useUserAdmin, { GetUserDto } from '../../api/useUserAdmin';
import useSecurityApi from '../../api/useSecurityApi';
import { Select } from '@radix-ui/themes';

interface IEditRolesProps {
    userId: string,
    onUpdated?: ()=> void 
}

interface ICanSaveRoles {
    onSave: () => void
}
const EditRoles = React.forwardRef((props: IEditRolesProps, ref: React.ForwardedRef<ICanSaveRoles>) => {
    const securityApi = useSecurityApi();
    const userAdmin = useUserAdmin();
    const [roles, setRoles] = React.useState<string[]>([]);
    const [selectedRole, setSelectedRole] = React.useState<string>('Admin');

    React.useEffect(() => {        
        getUser();
    }, [])

    async function getUser() {
        const retrievedUser = await userAdmin.GetUser(props.userId);
        if (retrievedUser.roles)
            setRoles(retrievedUser.roles)
    }

    React.useImperativeHandle(ref, () => ({
        onSave() {
            securityApi.SetRoles(roles, props.userId).then(()=>{
                if(props.onUpdated)
                    props.onUpdated();
            });            
        }
    }))

    function onAddRole() {
        if (!roles.some(x => x.toLowerCase() === selectedRole.toLowerCase()))
            setRoles([...roles, selectedRole])
    }

    function onDeleteRole(x: string) {
        const newRoles = [...roles.filter(r => r.toLowerCase() !== x.toLowerCase())]
        setRoles(newRoles);
    }

    return <Flex direction={'column'} gap={3}>
        <Flex gap={3}>
            <Span>Role Name:</Span>
            <Select.Root defaultValue='ReadOnly' onValueChange={t => setSelectedRole(t)}>
                <Select.Trigger />
                <Select.Content>
                    <Select.Item value='Admin'>Admin</Select.Item>
                    <Select.Item value='Author'>Author</Select.Item>
                    <Select.Item value='ReadOnly'>ReadOnly</Select.Item>
                </Select.Content>
            </Select.Root>
            <Button variant={'icon'} onClick={onAddRole}>
                <PlusCircledIcon />
            </Button>
        </Flex>
        {roles.map(r => {
            return (
                <Flex gap={3}>
                    <Span>{r}</Span>
                    <Button variant='icon' onClick={() => onDeleteRole(r)}>
                        <Cross1Icon />
                    </Button>
                </Flex>
            )
        })}
    </Flex>
})

interface ISaveRolesButtonProps {
    onClick: () => void
}
const SaveRolesButton = (props: ISaveRolesButtonProps) => {
    return <Button onClick={props.onClick}>Save</Button>
}

const RolesForm = {
    Content: EditRoles,
    SaveButton: SaveRolesButton
}
export default RolesForm;
export type { ICanSaveRoles };
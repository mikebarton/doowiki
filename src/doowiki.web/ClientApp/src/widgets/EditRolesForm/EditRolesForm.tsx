import { Button, Flex, Text, Grid, Select, IconButton } from '@radix-ui/themes';
import { PlusCircledIcon, Cross1Icon } from '@radix-ui/react-icons';
import React from 'react';
import useUserAdmin, { GetUserDto } from '../../api/useUserAdmin';
import useSecurityApi from '../../api/useSecurityApi';

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

    return <Flex direction={'column'} gap={'3'}>
        <Flex gap={'3'}>
            <Text>Role Name:</Text>
            <Select.Root defaultValue='ReadOnly' onValueChange={t => setSelectedRole(t)}>
                <Select.Trigger />
                <Select.Content>
                    <Select.Item value='Admin'>Admin</Select.Item>
                    <Select.Item value='Author'>Author</Select.Item>
                    <Select.Item value='ReadOnly'>ReadOnly</Select.Item>
                </Select.Content>
            </Select.Root>
            <IconButton value={'soft'} onClick={onAddRole}>
                <PlusCircledIcon />
            </IconButton>
        </Flex>
        {roles.map(r => {
            return (
                <Grid columns={'2'} gap={'3'}>
                    <Text>{r}</Text>
                    <IconButton variant='soft' onClick={() => onDeleteRole(r)}>
                        <Cross1Icon />
                    </IconButton>
                </Grid>
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
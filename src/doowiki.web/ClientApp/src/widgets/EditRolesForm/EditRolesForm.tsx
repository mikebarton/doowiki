import { PlusCircledIcon, Cross1Icon, ChevronDownIcon } from '@radix-ui/react-icons';
import { Flex, Button, Div, Span, Heading } from '../../components';
import React from 'react';
import useUserAdmin, { GetUserDto } from '../../api/useUserAdmin';
import useSecurityApi from '../../api/useSecurityApi';
import * as Select from '@radix-ui/react-select';
import { styled } from '../../themes';
import SelectStyles from '../../styles/Select';

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
                <SelectTrigger>
                    <Select.Value placeholder="Select a role">{selectedRole}</Select.Value>
                    <Select.Icon className="SelectIcon">
                        <ChevronDownIcon />
                    </Select.Icon>
                </SelectTrigger>
                <SelectContent>
                    <SelectViewport>
                        <SelectItem value='Admin'>Admin</SelectItem>
                        <SelectItem value='Author'>Author</SelectItem>
                        <SelectItem value='ReadOnly'>ReadOnly</SelectItem>
                    </SelectViewport>
                </SelectContent>
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

const SelectTrigger = styled(Select.Trigger, SelectStyles.trigger);
const SelectContent = styled(Select.Content, SelectStyles.content);
const SelectItem = styled(Select.Item, SelectStyles.item);
const SelectViewport = styled(Select.SelectViewport, SelectStyles.viewport);

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
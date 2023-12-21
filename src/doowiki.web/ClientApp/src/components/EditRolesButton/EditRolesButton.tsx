import React from 'react';
import { IconButton, Dialog } from "@radix-ui/themes";
import { Pencil1Icon, PersonIcon } from '@radix-ui/react-icons';
import EditRoles, { ICanSaveRoles} from '../EditRolesForm/EditRolesForm';

interface IEditRolesButton{
    userId: string,
    onUpdated?: ()=> void 
}

const EditRolesButton = (props : IEditRolesButton) => {
    const formRef = React.useRef<ICanSaveRoles>(null);

    return <Dialog.Root>
        <Dialog.Trigger>
            <IconButton variant="soft">
                { props.userId ? <Pencil1Icon/> : <PersonIcon/>}
            </IconButton>
        </Dialog.Trigger>
        <Dialog.Content>
            <Dialog.Title>Edit Roles</Dialog.Title>
            <EditRoles.Content userId={props.userId} ref={formRef} onUpdated={props.onUpdated}/>
            <Dialog.Close>
                <EditRoles.SaveButton onClick={()=> formRef?.current?.onSave()}/>
            </Dialog.Close>
        </Dialog.Content>
    </Dialog.Root>
}


export default EditRolesButton;
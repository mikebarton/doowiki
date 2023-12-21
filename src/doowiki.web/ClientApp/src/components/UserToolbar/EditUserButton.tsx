import React from 'react';
import { IconButton, Dialog } from "@radix-ui/themes";
import { PersonIcon } from '@radix-ui/react-icons';
import UserForm, { ICanSaveForm } from "../EditUserForm/EditUserForm";

interface IEditUserButton{
    userId?: string | undefined
}

const EditUserButton = (props : IEditUserButton) => {
    const formRef = React.useRef<ICanSaveForm>(null);

    return <Dialog.Root>
        <Dialog.Trigger>
            <IconButton variant="soft">
                <PersonIcon />
            </IconButton>
        </Dialog.Trigger>
        <Dialog.Content>
            <Dialog.Title>Add User</Dialog.Title>
            <UserForm.Content userId={props.userId} ref={formRef}/>
            <Dialog.Close>
                <UserForm.SaveButton onClick={()=> formRef?.current?.onSave()}/>
            </Dialog.Close>
        </Dialog.Content>
    </Dialog.Root>
}


export default EditUserButton;
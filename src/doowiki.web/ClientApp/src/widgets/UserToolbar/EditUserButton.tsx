import React from 'react';
import { Dialog } from "@radix-ui/themes";
import { Button } from '../../components';
import { Pencil1Icon, PersonIcon } from '@radix-ui/react-icons';
import UserForm, { ICanSaveForm } from "../EditUserForm/EditUserForm";
import { css } from '../../themes';

interface IEditUserButton{
    userId?: string | undefined,
    onUpdated?: ()=> void
}

const EditUserButton = (props : IEditUserButton) => {
    const formRef = React.useRef<ICanSaveForm>(null);

    return <Dialog.Root>
        <Dialog.Trigger>
            <Button variant="icon">
                { props.userId ? <Pencil1Icon className={css({color: '$mainText'})()}/> : <PersonIcon className={css({color: '$mainText'})()}/>}
            </Button>
        </Dialog.Trigger>
        <Dialog.Content>
            <Dialog.Title>Edit User</Dialog.Title>
            <UserForm.Content userId={props.userId} ref={formRef} onUpdated={props.onUpdated}/>
            <Dialog.Close>
                <UserForm.SaveButton onClick={()=> formRef?.current?.onSave()}/>
            </Dialog.Close>
        </Dialog.Content>
    </Dialog.Root>
}


export default EditUserButton;
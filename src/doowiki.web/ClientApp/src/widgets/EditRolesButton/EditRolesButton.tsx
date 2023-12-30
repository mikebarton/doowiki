import React from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from '../../components';
import { Pencil1Icon, PersonIcon } from '@radix-ui/react-icons';
import EditRoles, { ICanSaveRoles } from '../EditRolesForm/EditRolesForm';
import DialogStyles from '../../styles/Dialog';
import { css, styled } from '../../themes';

interface IEditRolesButton {
    userId: string,
    onUpdated?: () => void
}

const EditRolesButton = (props: IEditRolesButton) => {
    const formRef = React.useRef<ICanSaveRoles>(null);    

    return <Dialog.Root>
        <Dialog.Trigger>
            <Button variant="icon">
                {props.userId ? <Pencil1Icon /> : <PersonIcon />}
            </Button>
        </Dialog.Trigger>
        <Dialog.Portal>
            <Overlay />
            <Content >
                <Dialog.Title>Edit Roles</Dialog.Title>
                <EditRoles.Content userId={props.userId} ref={formRef} onUpdated={props.onUpdated} />
                <Dialog.Close>
                    <EditRoles.SaveButton onClick={() => formRef?.current?.onSave()} />
                </Dialog.Close>
            </Content>
        </Dialog.Portal>
    </Dialog.Root>
}



const Overlay = styled(Dialog.Overlay, DialogStyles.overlay);
const Content = styled(Dialog.Content, DialogStyles.content);

export default EditRolesButton;
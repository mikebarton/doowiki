import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import DialogStyles from '../../styles/Dialog';
import { Button } from '../../components';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { css, styled } from '../../themes';
import SpaceForm, { ICanSaveForm } from './EditSpaceForm';

interface IEditSpaceButtonProps {
    spaceId?: string | undefined,
    onUpdated?: () => void
}

const EditSpaceButton = (props: IEditSpaceButtonProps) => {
    const formRef = React.useRef<ICanSaveForm>(null);

    return <Dialog.Root>
        <Dialog.Trigger>
            <Button variant="icon">
                {props.spaceId ? <Pencil1Icon /> : <Pencil1Icon />}
            </Button>
        </Dialog.Trigger>
        <Dialog.Portal>
            <Overlay/>
            <Content>
                <Dialog.Title>Edit Space</Dialog.Title>
                <SpaceForm.Content spaceId={props.spaceId} ref={formRef}/>
                <Dialog.Close>
                    <SpaceForm.SaveButton onClick={()=>formRef?.current?.onSave()}/>
                </Dialog.Close>
            </Content>
        </Dialog.Portal>
    </Dialog.Root>
}

const Overlay = styled(Dialog.Overlay, DialogStyles.overlay);
const Content = styled(Dialog.Content, DialogStyles.content);

export default EditSpaceButton
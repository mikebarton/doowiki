import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import DialogStyles from '../../styles/Dialog';
import YesNoForm from './YesNoForm';
import { styled } from '../../themes';

interface IYesNoDialogProps{
    questionText?: string | undefined,
    yesText?: string | undefined,
    noText?: string | undefined,
    children: React.ReactNode
    onYes?: ()=>void | undefined,
    onNo?: ()=>void | undefined
}

const YesNoDialog = (props : IYesNoDialogProps)=> {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    function onButtonClick(click: (() => void) | undefined){
        click?.();
        setIsOpen(false);
    }

    return <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Trigger>
            {props.children}
        </Dialog.Trigger>
        <Dialog.Portal>
            <Overlay/>
            <Content>
                <YesNoForm questionText={props.questionText} 
                            affirmativeText={props.yesText} 
                            negativeText={props.noText} 
                            onSubmitNo={()=>onButtonClick(props.onNo)} 
                            onSubmitYes={()=>onButtonClick(props.onYes)}/>
            </Content>
        </Dialog.Portal>
    </Dialog.Root>
}

const Content = styled(Dialog.Content, DialogStyles.content);
const Overlay = styled(Dialog.Overlay, DialogStyles.overlay);

export default YesNoDialog
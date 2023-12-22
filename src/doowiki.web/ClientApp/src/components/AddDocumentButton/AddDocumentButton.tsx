import React from 'react'
import { IconButton } from '@radix-ui/themes';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';
import { css } from '../../themes';


const AddDocumentButton = () => {
    const navigate = useNavigate();
    function onAddDocument(): void {
        navigate('/edit');
    }

    const styles = {
        iconStyles: {
            color: '$accentedText'
        }
    }

    return (
        <IconButton variant='soft' onClick={onAddDocument}>
            <PlusCircledIcon className={css(styles.iconStyles)()}/>  
        </IconButton>
    )
}

export default AddDocumentButton;
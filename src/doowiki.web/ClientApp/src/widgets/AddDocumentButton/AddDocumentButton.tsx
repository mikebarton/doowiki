import React from 'react'
import { Button } from '../../components';
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
        <Button onClick={onAddDocument}>
            <PlusCircledIcon className={css(styles.iconStyles)()}/>  
        </Button>
    )
}

export default AddDocumentButton;
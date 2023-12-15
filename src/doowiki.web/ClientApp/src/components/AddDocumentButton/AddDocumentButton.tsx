import React from 'react'
import { IconButton } from '@radix-ui/themes';
import { PlusCircledIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';


const AddDocumentButton = () => {
    const navigate = useNavigate();
    function onAddDocument(): void {
        navigate('/edit');
    }

    return (
        <IconButton variant='ghost' onClick={onAddDocument}>
            <PlusCircledIcon/>  
        </IconButton>
    )
}

export default AddDocumentButton;
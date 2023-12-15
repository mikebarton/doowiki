import React from 'react';
import useWikiApi from '../../api/useWikiApi';
import { IDocumentDto } from '../../api/api.generated.clients';
import { Flex, TextField, TextArea, Text, Em, Heading, IconButton } from '@radix-ui/themes';
import { Pencil1Icon, PlusCircledIcon } from '@radix-ui/react-icons'
import { useNavigate } from 'react-router-dom';

interface IDocumentViewProps{
    DocumentId: string,
}

const DocumentView = ({DocumentId} : IDocumentViewProps)=>{
    const wikiApi = useWikiApi();
    const [document, setDocument] = React.useState<IDocumentDto>();
    const navigate = useNavigate();

    React.useEffect(()=>{
        async function getDocument(){
            const doc = await wikiApi.GetDocument(DocumentId);
            setDocument(doc);
        }
        getDocument();
    },[DocumentId])

    function onEdit(){
        navigate(`/edit/${DocumentId}`)
    }

    function onAddChildDocument(){
        navigate(`/edit?parentId=${DocumentId}`)
    }

    return (
        <>
            <Flex direction={'column'} justify={'start'} align={'stretch'}>
                <Flex align={'center'}>
                    <Heading>{document?.name}</Heading>
                    <IconButton ml={'1'} variant='ghost' onClick={onEdit}><Pencil1Icon/></IconButton>
                    <IconButton ml={'1'} variant='ghost' onClick={onAddChildDocument}><PlusCircledIcon/></IconButton>
                </Flex>
                <Flex mb={'5'}>
                    <Em>Created By:</Em>
                    <Text ml={'1'}>{document?.authorName}</Text>
                </Flex>
                <Text>{document?.content}</Text>
            </Flex>
        </>
    )
}

export default DocumentView;
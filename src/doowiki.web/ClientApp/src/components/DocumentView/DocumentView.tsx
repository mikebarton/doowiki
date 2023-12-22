import React from 'react';
import useWikiApi from '../../api/useWikiApi';
import { DocumentDto } from '../../api/api.generated.clients';
import { Flex, TextField, TextArea, Text, Em, Heading, IconButton } from '@radix-ui/themes';
import { Pencil1Icon, PlusCircledIcon } from '@radix-ui/react-icons'
import { useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import useSecurity from '../../utils/useSecurity';
import styles from './DocumentView.module.css'
import { css } from '../../themes';

interface IDocumentViewProps{
    DocumentId: string,
}

const DocumentView = ({DocumentId} : IDocumentViewProps)=>{
    const wikiApi = useWikiApi();
    const [document, setDocument] = React.useState<DocumentDto>();
    const navigate = useNavigate();
    const security = useSecurity();

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

    const jssStyles={
        heading:{
            colour: '$mainHeading'
        },
        content:{
            colour: '$mainText'
        }
    }

    return (
        <>
            <Flex direction={'column'} justify={'start'} align={'stretch'} gap={'3'} p={'5'}>
                <Flex className={css(jssStyles.heading)()} align={'center'}>
                    <Heading className={css(jssStyles.heading)()}>{document?.name}</Heading>
                    { security.CanWrite() && <><IconButton ml={'1'} variant='ghost' onClick={onEdit}><Pencil1Icon/></IconButton>
                    <IconButton ml={'1'} variant='ghost' onClick={onAddChildDocument}><PlusCircledIcon/></IconButton></> }
                </Flex>
                <Flex mb={'5'}>
                    <Em>Created By:</Em>
                    <Text ml={'1'}>{document?.authorName}</Text>
                </Flex>
                <Markdown className={`${css(jssStyles.content)()} ${styles.reactMarkDown}`} remarkPlugins={[remarkGfm]}>{document?.content}</Markdown>
            </Flex>
        </>
    )
}

export default DocumentView;
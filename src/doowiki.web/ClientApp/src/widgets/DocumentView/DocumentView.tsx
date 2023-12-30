import React from 'react';
import useWikiApi from '../../api/useWikiApi';
import { DocumentDto } from '../../api/api.generated.clients';
import { Pencil1Icon, PlusCircledIcon } from '@radix-ui/react-icons'
import { useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import useSecurity from '../../utils/useSecurity';
import styles from './DocumentView.module.css'
import { css } from '../../themes';
import { Heading, Em, Flex, Span, Button, Div } from '../../components';

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
            color: '$brown11'
        },
        content:{
            backgroundColor: '$amber1',
            boxShadow: '0 2px 10px grey',
        }
    }

    return (
        <Div padding={[3]} margin={[0,3,0,0]} className={css(jssStyles.content)()}>
            <Flex direction={'column'} justify={'flex-start'} align={'stretch'} gap={1} padding={[1]}>
                <Flex className={css(jssStyles.heading)()} align={'center'}>
                    <Heading className={css(jssStyles.heading)()}>{document?.name}</Heading>
                    { security.CanWrite() && <><Button variant={'icon'} margin={[0,0,0,1]} onClick={onEdit}><Pencil1Icon/></Button>
                    <Button variant={'icon'} margin={[0,0,0,1]}  onClick={onAddChildDocument}><PlusCircledIcon/></Button></> }
                </Flex>
                <Flex margin={[0, 0, 1, 0]}>
                    <Em><>Created By:</></Em>
                    <Span margin={[0,0,0,1]}>{document?.authorName}</Span>
                </Flex>
                <Flex direction='column' align='stretch' padding={[1]}>
                    <Markdown className={`${styles.reactMarkDown}`} remarkPlugins={[remarkGfm]}>{document?.content}</Markdown>
                </Flex>
            </Flex>
        </Div>
    )
}

export default DocumentView;
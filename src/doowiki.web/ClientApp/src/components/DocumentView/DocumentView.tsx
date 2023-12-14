import React from 'react';
import useWikiApi from '../../api/useWikiApi';
import { IDocumentDto } from '../../api/api.generated.clients';
import { Flex, TextField, TextArea, Text } from '@radix-ui/themes';

interface IDocumentViewProps{
    DocumentId: string,
}

const DocumentView = ({DocumentId} : IDocumentViewProps)=>{
    const wikiApi = useWikiApi();
    const [document, setDocument] = React.useState<IDocumentDto>();
    React.useEffect(()=>{
        async function getDocument(){
            const doc = await wikiApi.GetDocument(DocumentId);
            setDocument(doc);
        }
        getDocument();
    },[DocumentId])

    return (
        <>
            <Flex direction={'column'} justify={'start'} align={'stretch'}>
                <Text>{document?.name}</Text>
                <Text>{document?.authorName}</Text>
                <Text>{document?.content}</Text>
            </Flex>
        </>
    )
}

export default DocumentView;
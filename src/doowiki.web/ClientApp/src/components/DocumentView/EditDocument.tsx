import React from 'react';
import useWikiApi from '../../api/useWikiApi';
import { IDocumentDto } from '../../api/api.generated.clients';
import { Flex, TextField, TextArea, Text } from '@radix-ui/themes';

interface IEditDocumentProps{
    DocumentId: string,
}

const EditDocument = ({DocumentId} : IEditDocumentProps)=>{
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
                <TextField.Input value={document?.name} onChange={e=> setDocument({...document, name: e.target.value} as IDocumentDto)}/>
                <Text>{document?.authorName}</Text>
                <TextArea value={document?.content} onChange={e=> setDocument({...document, content: e.target.value} as IDocumentDto)}/>
            </Flex>
        </>
    )
}

export default EditDocument;
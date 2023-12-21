import React from 'react';
import useWikiApi, { SaveDocumentCommand} from '../../api/useWikiApi';
import { DocumentDto } from '../../api/api.generated.clients';
import { Flex, TextField, TextArea, Text, Em, Button } from '@radix-ui/themes';
import { ISpaceContext, SpaceContext } from '../../utils/GlobalContextProvider';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import useSecurity from '../../utils/useSecurity';

interface IEditDocumentProps {
    DocumentId: string | undefined,
}

const EditDocument = ({ DocumentId }: IEditDocumentProps) => {
    const wikiApi = useWikiApi();
    const security = useSecurity();
    const [document, setDocument] = React.useState<DocumentDto>();
    const {SpaceId, SetSpaceId} = React.useContext<ISpaceContext>(SpaceContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    

    React.useEffect(() => {
        async function getDocument() {
            const doc = await wikiApi.GetDocument(DocumentId!);
            setDocument(doc);
        }
        function initDocument(){
            const doc = {
                spaceId: SpaceId                             
            } as DocumentDto;
            setDocument(doc);
        }
        if(DocumentId)
            getDocument();
        else 
            initDocument();
    }, [DocumentId]);

    function onCancel(){
        if(DocumentId)
            navigate('/home/' + DocumentId);
        else
            navigate('/home');
    }

    function onSave(){        
        async function doSave(){
            const args = {
                name: document?.name,
                content: document?.content,
                documentId: document?.documentId,
                spaceId: document?.spaceId ?? SpaceId,
                parentId: searchParams.get('parentId')           
            } as SaveDocumentCommand
            await wikiApi.SaveDocument(args);
            navigate('/home/' + document?.documentId);
        }

        if(security.CanWrite())
            doSave();
    }

    return (
        <>
            <Flex direction={'column'} justify={'start'} align={'stretch'} width={'100%'} height={'100%'} p={'5'} >
                <TextField.Input value={document?.name} onChange={e => setDocument({ ...document, name: e.target.value } as DocumentDto)} mb={'3'}/>
                <Flex align={'center'} mb={'5'}><Em>Created By:</Em>    <Text>{document?.authorName}</Text></Flex>
                <Flex asChild grow={'1'}>
                    <TextArea value={document?.content} onChange={e => setDocument({ ...document, content: e.target.value } as DocumentDto)} mb={'3'} />
                </Flex>
                <Flex gap={'3'}>
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button onClick={onSave}>Save</Button>
                </Flex>
            </Flex>
        </>
    )
}

export default EditDocument;
import React from 'react';
import useWikiApi, { SaveDocumentCommand} from '../../api/useWikiApi';
import { DocumentDto } from '../../api/api.generated.clients';
import { Flex, TextField, TextArea, Text, Em, IconButton } from '@radix-ui/themes';
import { DiscIcon } from '@radix-ui/react-icons';
import { ISpaceContext, SpaceContext } from '../../utils/GlobalContextProvider';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

interface IEditDocumentProps {
    DocumentId: string | undefined,
}

const EditDocument = ({ DocumentId }: IEditDocumentProps) => {
    const wikiApi = useWikiApi();
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
            navigate('/home/' + document?.documentId)
        }
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
                <IconButton onClick={onSave}><DiscIcon/></IconButton>
            </Flex>
        </>
    )
}

export default EditDocument;
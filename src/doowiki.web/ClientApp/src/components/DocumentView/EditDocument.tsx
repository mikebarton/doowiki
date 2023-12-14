import React from 'react';
import useWikiApi, { SaveDocumentCommand} from '../../api/useWikiApi';
import { IDocumentDto } from '../../api/api.generated.clients';
import { Flex, TextField, TextArea, Text, Em, IconButton } from '@radix-ui/themes';
import { DiscIcon } from '@radix-ui/react-icons';
import { ISpaceContext, SpaceContext } from '../../utils/GlobalContextProvider';

interface IEditDocumentProps {
    DocumentId: string,
}

const EditDocument = ({ DocumentId }: IEditDocumentProps) => {
    const wikiApi = useWikiApi();
    const [document, setDocument] = React.useState<IDocumentDto>();
    const {SpaceId, SetSpaceId} = React.useContext<ISpaceContext>(SpaceContext);

    React.useEffect(() => {
        async function getDocument() {
            const doc = await wikiApi.GetDocument(DocumentId);
            setDocument(doc);
        }
        getDocument();
    }, [DocumentId]);

    function onSave(){
        async function doSave(){
            const args = {
                name: document?.name,
                content: document?.content,
                documentId: document?.documentId,
                spaceId: document?.spaceId ?? SpaceId                
            } as SaveDocumentCommand
            await wikiApi.SaveDocument(args);
        }
        doSave();
    }

    return (
        <>
            <Flex direction={'column'} justify={'start'} align={'stretch'} width={'100%'} p={'5'} >
                <TextField.Input value={document?.name} onChange={e => setDocument({ ...document, name: e.target.value } as IDocumentDto)} mb={'3'}/>
                <Flex align={'center'} mb={'5'}><Em>Created By:</Em>    <Text>{document?.authorName}</Text></Flex>
                <TextArea value={document?.content} onChange={e => setDocument({ ...document, content: e.target.value } as IDocumentDto)} mb={'3'} />
                <IconButton onClick={onSave}><DiscIcon/></IconButton>
            </Flex>
        </>
    )
}

export default EditDocument;
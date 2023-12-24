import React from 'react';
import useWikiApi, { SaveDocumentCommand } from '../../api/useWikiApi';
import { DocumentDto } from '../../api/api.generated.clients';
import { Flex, Span, Em, Button } from '../../components';
import { ISpaceContext, SpaceContext } from '../../utils/GlobalContextProvider';
import { useSearchParams, useNavigate } from 'react-router-dom';
import useSecurity from '../../utils/useSecurity';
import * as Form from '@radix-ui/react-form';

interface IEditDocumentProps {
    DocumentId: string | undefined,
}

const EditDocument = ({ DocumentId }: IEditDocumentProps) => {
    const wikiApi = useWikiApi();
    const security = useSecurity();
    const [document, setDocument] = React.useState<DocumentDto>({ name: '', content: ''} as DocumentDto);
    const { SpaceId, SetSpaceId } = React.useContext<ISpaceContext>(SpaceContext);
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();


    React.useEffect(() => {
        async function getDocument() {
            const doc = await wikiApi.GetDocument(DocumentId!);
            setDocument(doc);
        }
        function initDocument() {
            const doc = {
                spaceId: SpaceId,
                name: '',
                content: ''
            } as DocumentDto;
            setDocument(doc);
        }
        if (DocumentId)
            getDocument();
        else
            initDocument();
    }, [DocumentId]);

    function onCancel() {
        if (DocumentId)
            navigate('/home/' + DocumentId);
        else
            navigate('/home');
    }

    function onSave() {
        async function doSave() {
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

        if (security.CanWrite())
            doSave();
    }

    return (
        <>
            <Flex direction={'column'} justify={'flex-start'} align={'stretch'} width={'100%'} height={'100%'} padding={[2]} >
                <Form.Root onSubmit={onSave}>
                    <Form.Field name='title'>
                        <Flex margin={[0, 0, 2, 0]}>
                            <Form.Control asChild>
                                <input type='text' value={document?.name} onChange={e => setDocument({ ...document, name: e.target.value } as DocumentDto)} />
                            </Form.Control>
                        </Flex>
                    </Form.Field>
                    <Flex align={'center'} margin={[0, 0, 5, 0]}>
                        <Em>Created By:</Em>
                        <Span margin={[0, 0, 0, 1]}>{document?.authorName}</Span>
                    </Flex>
                    <Form.Field name='content'>
                        <Flex direction='row' align='stretch' grow={1}>
                            <Form.Control asChild>
                                <textarea value={document?.content} style={{ flexGrow: 1 }} onChange={e => setDocument({ ...document, content: e.target.value } as DocumentDto)} />
                            </Form.Control>
                        </Flex>
                    </Form.Field>
                    <Form.Submit asChild>
                        <Flex gap={3}>
                            <Button>Cancel</Button>
                            <Button>Save</Button>
                        </Flex>
                    </Form.Submit>
                </Form.Root>



            </Flex>
        </>
    )
}

export default EditDocument;
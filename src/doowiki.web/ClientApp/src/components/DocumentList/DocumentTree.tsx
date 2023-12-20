import React from 'react';
import { SpaceContext } from "../../utils/GlobalContextProvider";
import useWikiApi, { DocumentTreeDto } from "../../api/useWikiApi";
import { Link } from 'react-router-dom';
import { Flex, IconButton } from '@radix-ui/themes';
import { TriangleRightIcon } from '@radix-ui/react-icons';

interface IDocumentTreeNodeProps {
    item: DocumentTreeDto
}
const DocumentTreeNode = ({ item }: IDocumentTreeNodeProps) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const Toggle = () => {
        const styles : React.CSSProperties = {
                visibility: (!item.children || item.children.length === 0) ? 'hidden' : 'visible',
                transform: isOpen ? 'rotate(90deg)' : ''
        }

        return <Flex align={'center'}>
                    <IconButton size={'1'} onClick={() => setIsOpen(!isOpen)} style={styles} variant='ghost'>
                        <TriangleRightIcon width={'24'} height={'24'} />
                    </IconButton>
                </Flex>
    }

    const Children = () => {
        if (!item.children || item.children.length === 0 || !isOpen)
            return <></>

        return <Flex direction={'column'}>
            {item.children.map(c => <DocumentTreeNode key={c.documentId} item={c} />)}
        </Flex>
    }

    return <>
        <Flex align={'start'}>
            <Toggle />
            <Flex direction={'column'}>
                <Link to={'/home/' + item.documentId}>{item.name}</Link>
                <Children />
            </Flex>
        </Flex>
    </>
}

const DocumentTree = () => {
    const wikiApi = useWikiApi();
    const { SpaceId, SetSpaceId } = React.useContext(SpaceContext);
    const [documents, setDocuments] = React.useState<DocumentTreeDto[]>([])

    React.useEffect(() => {
        const getDocuments = async () => {
            if (SpaceId) {
                const newDocs = await wikiApi.GetDocumentTree(SpaceId);
                if (newDocs)
                    setDocuments(newDocs);
            }
        }

        getDocuments();
    }, [SpaceId]);


    return <Flex direction={'column'}>{documents && documents.map(d => <DocumentTreeNode key={d.documentId} item={d} />)}</Flex>

}

export default DocumentTree;
import React from 'react';
import { SpaceContext } from "../../utils/GlobalContextProvider";
import useWikiApi, { DocumentTreeDto } from "../../api/useWikiApi";
import { Link } from 'react-router-dom';
import { Flex, Button } from '../../components';
import { TriangleRightIcon } from '@radix-ui/react-icons';
import { useParams } from 'react-router-dom';
import { css } from '../../themes';

interface IDocumentTreeNodeProps {
    item: DocumentTreeDto
}
const DocumentTreeNode = ({ item }: IDocumentTreeNodeProps) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const { id } = useParams();
    

    const Toggle = () => {
        
        const styles = { 
            buttonStyle: {
                visibility: (!item.children || item.children.length === 0) ? 'hidden' : 'visible',
                transform: isOpen ? 'rotate(90deg)' : '',
            },
            toggleStyle: {
                color: '$slate4',
            }
        }

        return <Flex direction='column' justify={'flex-start'} >
                    <Button variant={'ghost'} className={css(styles.buttonStyle)()} onClick={() => setIsOpen(!isOpen)} >
                        <TriangleRightIcon width={'24'} height={'24'} className={css(styles.toggleStyle)()}/>
                    </Button>
                </Flex>
    }

    const Children = () => {
        if (!item.children || item.children.length === 0 || !isOpen)
            return <></>

        return <Flex direction={'column'}>
            {item.children.map(c => <DocumentTreeNode key={c.documentId} item={c} />)}
        </Flex>
    }

    const selectedStyle : React.CSSProperties = {
        fontWeight: item.documentId === id ? 'bolder' : 'normal'
    }

    return <>
        <Flex align={'flex-start'}>
            <Toggle />
            <Flex direction={'column'}>
                <Link to={'/home/' + item.documentId} style={selectedStyle}>{item.name}</Link>
                <Children />
            </Flex>
        </Flex>
    </>
}

const DocumentTree = () => {
    const wikiApi = useWikiApi();
    const { SpaceId, SetSpaceId } = React.useContext(SpaceContext);
    const [documents, setDocuments] = React.useState<DocumentTreeDto[]>([])
    const documentQuery = wikiApi.GetDocumentTree(SpaceId!);

    React.useEffect(() => {
        if(!documentQuery.isPending && documentQuery.data)
        setDocuments(documentQuery.data);
    }, [documentQuery.isPending, documentQuery.data]);


    return <Flex direction={'column'}>{documents && documents.map(d => <DocumentTreeNode key={d.documentId} item={d} />)}</Flex>

}

export default DocumentTree;
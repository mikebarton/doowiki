import React from 'react';
import { SpaceContext } from "../../utils/GlobalContextProvider";
import useWikiApi, { WikiApi, DocumentTreeDto } from "../../api/useWikiApi";
import { Link } from 'react-router-dom';
import { Flex, IconButton } from '@radix-ui/themes';
import { TriangleRightIcon } from '@radix-ui/react-icons';

interface IDocumentTreeNodeProps {
    item: DocumentTreeDto
}
const DocumentTreeNode = ({ item }: IDocumentTreeNodeProps) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const Toggle = ({expanded : boolean}: any)=>{
        if(!item.children || item.children.length === 0)
            return <></>

            const tranformStyles = {
                transform: isOpen ? 'rotate(90deg)' : undefined
            }

        return <><IconButton size={'1'} onClick={()=> setIsOpen(!isOpen)} style = {tranformStyles} variant='ghost'><TriangleRightIcon width={'24'} height={'24'}/></IconButton></>
    }

    return <>
        <Flex align={'center'}>
            <Toggle expanded={isOpen}/>
            <Flex direction={'column'}>
                <Link to={'/home/' + item.documentId}>{item.name}</Link>
                
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


    return <>{documents && documents.map(d => <DocumentTreeNode item={d} />)}</>

}

export default DocumentTree;
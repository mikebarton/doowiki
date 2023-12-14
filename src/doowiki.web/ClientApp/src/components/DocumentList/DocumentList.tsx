import React from 'react';
import { SpaceContext } from "../../utils/GlobalContextProvider";
import useWikiApi, { WikiApi, IDocumentMetaDto } from "../../api/useWikiApi";
import { Link } from 'react-router-dom';

const DocumentList = () => {
    const wikiApi = useWikiApi();
    const { SpaceId, SetSpaceId } =  React.useContext(SpaceContext);
    const [ documents, setDocuments ] = React.useState<IDocumentMetaDto[]>([])

    React.useEffect(()=>{
        const getDocuments = async () =>{
            if(SpaceId){
                const newDocs = await wikiApi.GetDocumentList(SpaceId);
                if(newDocs)
                setDocuments(newDocs);
            }
        }

        getDocuments();
    },[SpaceId]);

    return (
        <>
            {documents.map(x=>{
                return <Link to={'/home/' + x.documentId}>{x.name}</Link>
            })}
        </>
    )
}

export default DocumentList;
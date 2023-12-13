import React from 'react';
import { SpaceContext } from "../../utils/GlobalContextProvider";
import useWikiApi, { WikiApi, IDocumentMetaDto } from "../../api/useWikiApi";

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
                return <p>{x.name}</p>
            })}
        </>
    )
}

export default DocumentList;
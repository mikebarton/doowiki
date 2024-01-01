import React from 'react';
import { SpaceContext } from "../../utils/GlobalContextProvider";
import useWikiApi, { WikiApi, DocumentMetaDto } from "../../api/useWikiApi";
import { Link } from 'react-router-dom';

const DocumentList = () => {
    const wikiApi = useWikiApi();
    const { SpaceId, SetSpaceId } =  React.useContext(SpaceContext);
    const [documents, setDocuments] = React.useState<DocumentMetaDto[]>([])
    const documentQuery = wikiApi.GetDocumentList(SpaceId!);

    React.useEffect(()=>{
        if(!documentQuery.isPending && documentQuery.data)
        setDocuments(documentQuery.data);
    },[documentQuery.isPending, documentQuery.data]);

    return (
        <>
            {documents.map(x=>{
                return <Link to={'/home/' + x.documentId}>{x.name}</Link>
            })}
        </>
    )
}

export default DocumentList;
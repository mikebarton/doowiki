import DocumentView from "../../widgets/DocumentView/DocumentView";
import { useParams } from "react-router-dom";

interface IHomeProps{
    DocumentId: string | undefined,
    IsEdit: boolean
}
export default function () {
    const { id } = useParams();
    
    return (<>
        { id && <DocumentView DocumentId={id}/> }

        
    </>
    )
}
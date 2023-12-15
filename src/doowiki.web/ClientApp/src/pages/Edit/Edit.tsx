import EditDocument from "../../components/DocumentView/EditDocument";
import { useParams } from "react-router-dom";

interface IEditProps{
    DocumentId: string | undefined,
}
export default function () {
    const { id } = useParams();
    
    return (<>
        <EditDocument DocumentId={id}/>

        
    </>
    )
}
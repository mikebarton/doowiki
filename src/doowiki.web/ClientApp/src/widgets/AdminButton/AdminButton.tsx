import { useNavigate } from "react-router-dom"
import { GearIcon} from '@radix-ui/react-icons';
import useSecurity from '../../utils/useSecurity';
import { Button } from "../../components";

const AdminButton = ()=>{
    const navigate = useNavigate();
    const security = useSecurity();

    const onLoadAdmin = ()=>{
        navigate('/admin');
    }

    if(!security.IsAdmin())
        return <></>

    return <Button onClick={onLoadAdmin}>
                <GearIcon/>
            </Button>
}

export default AdminButton;
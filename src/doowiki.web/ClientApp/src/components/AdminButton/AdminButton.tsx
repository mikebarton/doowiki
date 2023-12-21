import { useNavigate } from "react-router-dom"
import { GearIcon} from '@radix-ui/react-icons';
import { IconButton } from "@radix-ui/themes";
import useSecurity from '../../utils/useSecurity';

const AdminButton = ()=>{
    const navigate = useNavigate();
    const security = useSecurity();

    const onLoadAdmin = ()=>{
        navigate('/admin');
    }

    if(!security.IsAdmin())
        return <></>

    return <IconButton variant="soft" onClick={onLoadAdmin}>
                <GearIcon/>
            </IconButton>
}

export default AdminButton;
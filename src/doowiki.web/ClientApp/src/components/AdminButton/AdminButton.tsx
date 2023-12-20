import { useNavigate } from "react-router-dom"
import { GearIcon} from '@radix-ui/react-icons';
import { IconButton } from "@radix-ui/themes";

const AdminButton = ()=>{
    const navigate = useNavigate();

    const onLoadAdmin = ()=>{
        navigate('/admin');
    }

    return <IconButton variant="soft" onClick={onLoadAdmin}>
                <GearIcon/>
            </IconButton>
}

export default AdminButton;
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { IconButton } from '@radix-ui/themes';
import useAccounts from '../../api/useAccounts';
import { useNavigate } from "react-router-dom";


const LogoutButton = () => {
    const navigate = useNavigate();
    const accountApi = useAccounts();

    async function onLogout() {
        await accountApi.Logout()
        navigate('/');
    }

    return (
            <IconButton onClick={onLogout}><CrossCircledIcon/></IconButton>
    )
}

export default LogoutButton;
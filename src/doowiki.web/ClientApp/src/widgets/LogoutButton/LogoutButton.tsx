import { Button } from '@radix-ui/themes';
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
            <Button onClick={onLogout}>Sign Out</Button>
    )
}

export default LogoutButton;
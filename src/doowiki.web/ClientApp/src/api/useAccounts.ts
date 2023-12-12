import { AccountClient, LoginDto } from "./api.generated.clients";

interface AccountsApi {
    Login: (email: string, password: string) => Promise<boolean>,
    Logout: () => Promise<boolean>
}

export default function () : AccountsApi {
    const client = new AccountClient();

    const login = async (email: string, password: string): Promise<boolean> => {        
        try{
            await client.login({email : email, password: password} as LoginDto);
            return true;
        }
        catch{
            return false;
        }
    }

    const logout = async (): Promise<boolean> => {
        try {
            await client.logout();
            return true;
        }
        catch {
            return false;
        }
    }

    return {
        Login: login,
        Logout: logout
    };
}
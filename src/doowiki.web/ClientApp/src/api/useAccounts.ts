interface AccountsApi {
    Login: (email: string, password: string) => Promise<boolean>
}

export default function () : AccountsApi {
    const login = async (email: string, password: string): Promise<boolean> => {
        const loginRes = await fetch('/api/account/login',
            {
                method: 'POST',
                body: JSON.stringify({ email: email, password: password }),
                headers: { 'Content-Type': 'application/json' }
            });     

        return loginRes.status === 200;
    }

    return {
        Login: login
    };
}
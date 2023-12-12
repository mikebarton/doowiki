import React from 'react';
import { Card, Grid, Box, Text, Button} from '@radix-ui/themes';
import { TextField } from '@radix-ui/themes';
import useAccounts from '../../api/useAccounts';
import { useNavigate } from "react-router-dom";


export default function () {
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const accounts = useAccounts();
    const navigate = useNavigate();

    const onLogin = async () => {
        const loggedIn = await accounts.Login(email, password);
        if (loggedIn) {
            navigate('/home');
        }
    }

    return (
        <Card style={{ maxWidth: 400 }}>
            <Grid columns={'2'} gap={'3'} width={'auto'}>
                    <Text>Email:</Text>
                    <TextField.Input value={email} onChange={e => setEmail(e.target.value)} />                    

                    <Text>Password:</Text>
                <TextField.Input value={password} type={'password'} onChange={e => setPassword(e.target.value)} />
            </Grid>
            <Button variant='surface' onClick={onLogin}>Login</Button>
        </Card>
    )
}
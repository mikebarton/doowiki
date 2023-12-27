import React from 'react';
import useAccounts from '../../api/useAccounts';
import { useNavigate } from "react-router-dom";
import { Flex, Span, Button, Card } from '../../components';
import * as Form from '@radix-ui/react-form'
import { css } from '../../themes';


export default function () {
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const accounts = useAccounts();
    const navigate = useNavigate();

    const onLogin = () => {
        async function doLogin() {
            const loggedIn = await accounts.Login(email, password);
            if (loggedIn) {
                navigate('/home');
            }
        }
        doLogin();
    }

    const styles ={
        colDef : {
            minWidth: '200px'
        },
        form:{
            height: '200px'
        }
    }

    const onFormSubmit = (e: any) => {
        onLogin();
        e.preventDefault();
        e.stopPropagation();
    }

    return (
        <Card style={{ maxWidth: 400, borderRadius: '10px', boxShadow: '5px 5px 5px 5px grey' }} padding={[2]}>
            <Form.Root onSubmit={onFormSubmit} className={css(styles.form)()}>
                <Flex gap={3} direction='column' height='80%' justify='space-around' width={'auto'}>
                    <Form.Field name='email' >
                        <Form.Label><Span display={'inline-block'} className={css(styles.colDef)()}>Email</Span></Form.Label>
                        <Form.Message match={'typeMismatch'}>Please supple a valid email</Form.Message>
                        <Form.Control asChild className={css(styles.colDef)()}>
                            <input value={email} onChange={e => setEmail(e.target.value)} />
                        </Form.Control>
                    </Form.Field>
                    <Form.Field name='password' >
                        <Form.Label><Span display='inline-block' className={css(styles.colDef)()}>Password</Span></Form.Label>
                        <Form.Control asChild className={css(styles.colDef)()}>
                            <input value={password} type={'password'} onChange={e => setPassword(e.target.value)} />
                        </Form.Control>
                    </Form.Field>
                </Flex>
                <Form.Submit asChild>
                    <Button variant='soft' >Login</Button>
                </Form.Submit>
            </Form.Root>
        </Card>
    )
}
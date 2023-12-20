import React from 'react';
import useUserAdmin, { GetUserDto } from '../../api/useUserAdmin';
import { Table } from '@radix-ui/themes';
import { getuid, setuid } from 'process';

const UserList = ()=>{
    const userAdmin = useUserAdmin();
    const [users, setUsers] = React.useState<GetUserDto[]>([]);

    React.useEffect(()=>{
        async function getUsers(){
            const retrievedUsers = await userAdmin.ListUsers();
            setUsers(retrievedUsers);
        }

        getUsers();
    },[])

    return <>
            <Table.Root>
                <Table.Header>
                    <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Roles</Table.ColumnHeaderCell>
                </Table.Header>
                <Table.Body>
                    { users.map((u,i)=>{
                        return <Table.Row key={i}>
                            <Table.RowHeaderCell>{u.firstName} {u.lastName}</Table.RowHeaderCell>
                            <Table.Cell>{u.roles?.join(',')}</Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>
            </Table.Root>
        </>
}

export default UserList;
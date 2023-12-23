import React from 'react';
import useUserAdmin, { GetUserDto } from '../../api/useUserAdmin';
import { Table, Flex } from '@radix-ui/themes';
import AddUserButton from '../UserToolbar/EditUserButton';
import EditRolesButton from '../EditRolesButton/EditRolesButton';
import { css } from '../../themes';

const UserList = ()=>{
    const userAdmin = useUserAdmin();
    const [users, setUsers] = React.useState<GetUserDto[]>([]);

    React.useEffect(()=>{        
        getUsers();
    },[])

    async function getUsers(){
        const retrievedUsers = await userAdmin.ListUsers();
        setUsers(retrievedUsers);
    }

    const styles ={
        tableHeader: {
            color: '$mainText'
        },
        tableMain:{
            color: '$mainText'
        }
    }

    return <>
            <Table.Root>
                <Table.Header className={css(styles.tableHeader)()}>
                    <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>Roles</Table.ColumnHeaderCell>
                    </Table.Header>
                <Table.Body >
                    { users.map((u,i)=>{
                        return <Table.Row  key={i}>
                            <Table.Cell><Flex className={css(styles.tableMain)()} gap={'3'}>{u.firstName} {u.lastName}<AddUserButton onUpdated={()=> getUsers()} userId={u.userId} /></Flex></Table.Cell>
                            <Table.Cell><Flex className={css(styles.tableMain)()} gap={'3'}>{u.roles?.join(',')} <EditRolesButton onUpdated={()=> getUsers()} userId={u.userId!}/></Flex></Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>
            </Table.Root>
        </>
}

export default UserList;
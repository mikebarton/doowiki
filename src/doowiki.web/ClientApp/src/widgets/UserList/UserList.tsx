import React from 'react';
import useUserAdmin, { GetUserDto } from '../../api/useUserAdmin';
import AddUserButton from '../UserToolbar/EditUserButton';
import EditRolesButton from '../EditRolesButton/EditRolesButton';
import { Flex, Button } from '../../components';
import { Cross1Icon } from '@radix-ui/react-icons';
import { styled, css } from '../../themes';
import TableStyles from '../../styles/Table';
import YesNoDialog from '../YesNoDialog/YesNoDialog';

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

    function onDeleteUser(userId: string){
        userAdmin.DeleteUser(userId);
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
            <Table>
                <TableHead className={css(styles.tableHeader)()}>
                <TableRow>
                    <HeaderCell>Name</HeaderCell>
                    <HeaderCell>Roles</HeaderCell>
                    <HeaderCell>Actions</HeaderCell>
                </TableRow>
                    
                    </TableHead>
                <TableBody >
                    { users.map((u,i)=>{
                        return <TableRow  key={i}>
                            <TableCell><Flex className={css(styles.tableMain)()} gap={3}>{u.firstName} {u.lastName}<AddUserButton onUpdated={()=> getUsers()} userId={u.userId} /></Flex></TableCell>
                            <TableCell><Flex className={css(styles.tableMain)()} gap={3}>{u.roles?.join(',')} <EditRolesButton onUpdated={()=> getUsers()} userId={u.userId!}/></Flex></TableCell>
                            <TableCell>
                                <Flex className={css(styles.tableMain)()} gap={3}>
                                <YesNoDialog questionText={`Delete the user ${u.firstName} ${u.lastName}?`} onYes={()=>onDeleteUser(u.userId!)}>
                                        <Button><Cross1Icon/></Button>
                                    </YesNoDialog>
                                </Flex>
                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </>
}

const Table = styled('table', TableStyles.root);
const TableRow = styled('tr', TableStyles.row);
const TableHead = styled('thead', TableStyles.head);
const TableCell = styled('td', TableStyles.cell);
const TableBody = styled('tbody', TableStyles.body);
const HeaderCell = styled('th', TableStyles.cell);

export default UserList;
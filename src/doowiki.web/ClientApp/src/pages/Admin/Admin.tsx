import React from 'react';
import UserList from '../../widgets/UserList/UserList';
import UserToolbar from '../../widgets/UserToolbar/UserToolbar';
import { Tabs, Box, Flex } from '@radix-ui/themes';
import SpacesList from '../../widgets/SpacesList/SpacesList';
import { css } from '../../themes';

const Admin = () => {

    return (
        <>
            <Tabs.Root defaultValue='users'>
                <Tabs.List>
                    <Tabs.Trigger value='users'>Users</Tabs.Trigger>
                    <Tabs.Trigger value='spaces'>Spaces</Tabs.Trigger>
                </Tabs.List>
                <Box>
                    <Tabs.Content value='users'>
                        <Flex direction={'column'} gap={'2'} p={'5'}>
                            <UserToolbar/>
                            <UserList />
                        </Flex>
                    </Tabs.Content>

                    <Tabs.Content value='spaces'>
                        <SpacesList/>
                    </Tabs.Content>
                </Box>
            </Tabs.Root>

        </>
    )
};



export default Admin;
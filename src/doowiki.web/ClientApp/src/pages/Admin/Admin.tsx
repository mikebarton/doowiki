import React from 'react';
import UserList from '../../widgets/UserList/UserList';
import UserToolbar from '../../widgets/UserToolbar/UserToolbar';
import { Tabs } from '@radix-ui/themes';
import { Flex, Div } from '../../components';
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
                <Div>
                    <Tabs.Content value='users'>
                        <Flex direction={'column'} align='stretch' gap={2} padding={[2]}>
                            <UserToolbar/>
                            <UserList />
                        </Flex>
                    </Tabs.Content>

                    <Tabs.Content value='spaces'>
                        <SpacesList/>
                    </Tabs.Content>
                </Div>
            </Tabs.Root>

        </>
    )
};



export default Admin;
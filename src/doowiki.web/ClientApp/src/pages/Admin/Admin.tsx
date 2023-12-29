import React from 'react';
import UserList from '../../widgets/UserList/UserList';
import UserToolbar from '../../widgets/UserToolbar/UserToolbar';
import * as Tabs from '@radix-ui/react-tabs';
import { Flex, Div } from '../../components';
import SpacesList from '../../widgets/Spaces/SpacesList';
import SpacesToolbar from '../../widgets/Spaces/SpacesToolbar';
import { css, styled } from '../../themes';
import TabsStyles from '../../styles/Tabs';

const Admin = () => {

    return (
        <Div padding={[1]}>
            <TabsRoot defaultValue='users'>
                <TabsList>
                    <TabsTrigger value='users'>Users</TabsTrigger>
                    <TabsTrigger value='spaces'>Spaces</TabsTrigger>
                </TabsList>
                <Div>
                    <TabsContent value='users'>
                        <Flex direction={'column'} align='stretch' gap={2} padding={[2]}>
                            <UserToolbar/>
                            <UserList />
                        </Flex>
                    </TabsContent>

                    <TabsContent value='spaces'>
                        <Flex direction='column' align='stretch' gap={1}>
                            <SpacesToolbar/>
                            <SpacesList/>
                        </Flex>
                    </TabsContent>
                </Div>
            </TabsRoot>

        </Div>
    )
};

const TabsRoot = styled(Tabs.Root, TabsStyles.root);
const TabsList = styled(Tabs.List, TabsStyles.list);
const TabsTrigger = styled(Tabs.Trigger, TabsStyles.trigger);
const TabsContent = styled(Tabs.Content, TabsStyles.content);

export default Admin;
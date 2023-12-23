import React from 'react';
import useWikiApi, {SpaceDto} from '../../api/useWikiApi';
import { Table, Flex } from '@radix-ui/themes';


const SpacesList = ()=>{
    const wikiApi = useWikiApi();
    const [spaces, setSpaces] = React.useState<SpaceDto[]>([]);

    React.useEffect(()=>{
        getSpaces();
    },[])

    async function getSpaces(){
        const retrievedSpaces = await wikiApi.GetSpaces();
        setSpaces(retrievedSpaces);
    }

    return <>
            <Table.Root>
                <Table.Header>
                    <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                    </Table.Header>
                <Table.Body>
                    { spaces.map((u,i)=>{
                        return <Table.Row key={i}>
                            <Table.Cell><Flex gap={'3'}>{u.name}</Flex></Table.Cell>
                        </Table.Row>
                    })}
                </Table.Body>
            </Table.Root>
        </>
}

export default SpacesList;
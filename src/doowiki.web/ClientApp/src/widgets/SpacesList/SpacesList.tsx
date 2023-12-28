import React from 'react';
import useWikiApi, {SpaceDto} from '../../api/useWikiApi';
import { Flex } from '../../components';
import TableStyles from '../../styles/Table';
import { styled } from '../../themes';


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
            <Table>
                <TableHead>
                    <TableRow><HeaderCell>Name</HeaderCell></TableRow>
                </TableHead>
                <TableBody>
                    { spaces.map((u,i)=>{
                        return <TableRow key={i}>
                            <TableCell><Flex gap={3}>{u.name}</Flex></TableCell>
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
const HeaderCell = styled('th', TableStyles.cell)

export default SpacesList;
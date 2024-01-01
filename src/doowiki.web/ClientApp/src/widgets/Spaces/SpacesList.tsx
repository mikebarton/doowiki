import React from 'react';
import useWikiApi, {SpaceDto} from '../../api/useWikiApi';
import { Flex, Button } from '../../components';
import { Cross1Icon } from '@radix-ui/react-icons';
import TableStyles from '../../styles/Table';
import { styled } from '../../themes';
import EditSpaceButton from './EditSpaceButton';
import YesNoDialog from '../YesNoDialog/YesNoDialog';


const SpacesList = ()=>{
    const wikiApi = useWikiApi();
    const [spaces, setSpaces] = React.useState<SpaceDto[]>([]);
    const spacesQuery = wikiApi.GetSpaces();

    React.useEffect(()=>{
        if(!spacesQuery.isPending && spacesQuery.data)
        setSpaces(spacesQuery.data);
    },[spacesQuery.data, spacesQuery.isPending]);
    
    function onDeleteSpace(spaceId:string){
        wikiApi.DeleteSpace(spaceId);
    }

    return <>
            <Table>
                <TableHead>
                    <TableRow><HeaderCell>Name</HeaderCell><HeaderCell>Actions</HeaderCell></TableRow>
                </TableHead>
                <TableBody>
                    { spaces.map((u,i)=>{
                        return <TableRow key={i}>
                            <TableCell><Flex gap={3}>{u.name}</Flex></TableCell>
                            <TableCell>
                                <Flex gap={3}>
                                    <EditSpaceButton spaceId={u.id}/>
                                    <YesNoDialog questionText={`Delete the space ${u.name}?`} onYes={()=>onDeleteSpace(u.id!)}>
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
const HeaderCell = styled('th', TableStyles.cell)

export default SpacesList;
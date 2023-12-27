import React from 'react';
import useWikiApi, { SpaceDto } from "../../api/useWikiApi";
import { useEffect, useState } from 'react';
import * as Select from '@radix-ui/react-select';
import SelectStyles from '../../styles/Select';
import { SpaceContext } from "../../utils/GlobalContextProvider";
import { styled } from '../../themes';
import { ChevronDownIcon } from '@radix-ui/react-icons';


const SpaceSelector = () => {
    const [spaces, setSpaces] = useState<SpaceDto[]>([])
    const wikiApi = useWikiApi();
    const spaceContext = React.useContext(SpaceContext);

    useEffect(() => {
        const getSpaces = async () => {
            const spaces = await wikiApi.GetSpaces();
            setSpaces(spaces);

            if(spaces && spaces[0].id)
                spaceContext.SetSpaceId(spaces[0]?.id)
        }

        getSpaces();
    }, []);

    function onSpaceSelected(e:string){
        spaceContext.SetSpaceId(e)
    }
    
    if (!spaces || spaces.length === 0)
        return <></>

    return (
        <>
            <Select.Root defaultValue={spaceContext.SpaceId} onValueChange={onSpaceSelected}>
                <SelectTrigger>
                <Select.Value placeholder="Select a role">{spaces.find(s=>s.id === spaceContext.SpaceId)?.name}</Select.Value>
                    <Select.Icon className="SelectIcon">
                        <ChevronDownIcon />
                    </Select.Icon>
                </SelectTrigger>
                <SelectContent>
                    <SelectViewport>
                    {spaces.map(s => {
                        return (
                            s && <SelectItem key={s.id} value={s.id!}>{s.name}</SelectItem>
                        )
                    }) }
                    </SelectViewport>
                </SelectContent>
            </Select.Root>
        </>
    )
}

const SelectTrigger = styled(Select.Trigger, SelectStyles.trigger);
const SelectContent = styled(Select.Content, SelectStyles.content);
const SelectItem = styled(Select.Item, SelectStyles.item);
const SelectViewport = styled(Select.SelectViewport, SelectStyles.viewport);

export default SpaceSelector;
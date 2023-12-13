import React from 'react';
import useWikiApi, { ISpaceDto } from "../../api/useWikiApi";
import { useEffect, useState } from 'react';
import { Select } from '@radix-ui/themes';
import { SpaceContext } from "../../utils/GlobalContextProvider";


const SpaceSelector = () => {
    const [spaces, setSpaces] = useState<ISpaceDto[]>([])
    const wikiApi = useWikiApi();
    const spaceContext = React.useContext(SpaceContext);

    useEffect(() => {
        const getSpaces = async () => {
            const spaces = await wikiApi.GetSpaces();
            setSpaces(spaces);
            spaceContext.SetSpaceId(spaces[0].id)
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
                <Select.Trigger />
                <Select.Content>
                    {spaces.map(s => {
                        return (
                            <Select.Item key={s.id} value={s.id}>{s.name}</Select.Item>
                        )
                    }) }
                </Select.Content>
            </Select.Root>
        </>
    )
}

export default SpaceSelector;
import useWikiApi, { ISpaceDto } from "../../api/useWikiApi";
import { useEffect, useState } from 'react';
import { Select } from '@radix-ui/themes';


const SpaceSelector = () => {
    const [spaces, setSpaces] = useState<ISpaceDto[]>([])
    const wikiApi = useWikiApi();

    useEffect(() => {
        const getSpaces = async () => {
            const spaces = await wikiApi.GetSpaces();
            setSpaces(spaces);
        }

        getSpaces();
    }, []);
    
    if (!spaces || spaces.length === 0)
        return <></>

    return (
        <>
            <Select.Root defaultValue={spaces?.[0]?.id}>
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
import useWikiApi, { WikiApi, ISpaceDto } from "../../api/useWikiApi";
import { useEffect, useState } from 'react';

export default function () {
    const [spaces, setSpaces] = useState<ISpaceDto[]>([])
    const wikiApi = useWikiApi();
    useEffect(() => {
        const getSpaces = async () => {
            const spaces = await wikiApi.GetSpaces();
            setSpaces(spaces);
        }

        getSpaces();
    }, [])
    return (<>
        <h1>home</h1>

        <div>{spaces.map(s => {
            return <h1>{s.name}</h1>
        })}</div>
    </>
    )
}
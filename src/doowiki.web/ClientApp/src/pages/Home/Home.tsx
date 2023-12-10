import useWikiApi, { ISpace, WikiApi } from "../../api/useWikiApi"
import { useEffect, useState } from 'react';

export default function () {
    const [spaces, setSpaces] = useState<ISpace[]>([])
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
            return <h1>{s.Name}</h1>
        })}</div>
    </>
    )
}
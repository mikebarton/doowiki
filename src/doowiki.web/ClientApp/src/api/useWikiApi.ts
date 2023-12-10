export interface WikiApi {
    GetSpaces: () => Promise<ISpace[]>
}

export interface ISpace {
    SpaceId: string,
    Name: string
}

export default function (): WikiApi {
    const getSpaces = async () : Promise<ISpace[]> => {
        const spacesRes = await fetch('/api/space',
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

        var body = await spacesRes.json();

        if (spacesRes.status != 200)
            throw new Error('error retrieving spaces - ' + body.toLocaleString());

        return body as ISpace[]
    }

    return {
        GetSpaces: getSpaces
    } as WikiApi;
}


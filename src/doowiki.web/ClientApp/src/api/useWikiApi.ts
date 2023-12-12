import { ApiClient, ISpaceDto } from "./api.generated.clients";

export interface WikiApi {
    GetSpaces: () => Promise<ISpaceDto[]>
}


export default function (): WikiApi {
    const client = new ApiClient();

    const getSpaces = async () : Promise<ISpaceDto[]> => {        
        var spaces = await client.spaceGet();
        return spaces;
    }

    return {
        GetSpaces: getSpaces
    } as WikiApi;
}

export type { ISpaceDto };
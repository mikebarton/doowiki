import { SpaceClient, ISpaceDto, IDocumentMetaDto, DocumentClient } from "./api.generated.clients";

export interface WikiApi {
    GetSpaces: () => Promise<ISpaceDto[]>
    GetDocumentList: (SpaceId: string) => Promise<IDocumentMetaDto[]>
}


export default function (): WikiApi {
    const spaceclient = new SpaceClient();
    const docClient = new DocumentClient();

    const getSpaces = async () : Promise<ISpaceDto[]> => {        
        var spaces = await spaceclient.spaceGet();
        return spaces;
    }

    const getDocuments = async (spaceId: string): Promise<IDocumentMetaDto[]> =>
    {
        var docs = await docClient.list(spaceId);
        return docs;
    }

    return {
        GetSpaces: getSpaces,
        GetDocumentList: getDocuments
    } as WikiApi;
}

export type { ISpaceDto, IDocumentMetaDto };
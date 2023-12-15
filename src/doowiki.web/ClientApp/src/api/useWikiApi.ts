import { SpaceClient, ISpaceDto, IDocumentMetaDto, DocumentClient, IDocumentDto, SaveDocumentCommand, IDocumentTreeDto } from "./api.generated.clients";

export interface WikiApi {
    GetSpaces: () => Promise<ISpaceDto[]>,
    GetDocumentList: (SpaceId: string) => Promise<IDocumentMetaDto[]>,
    GetDocumentTree: (SpaceId: string) => Promise<IDocumentTreeDto[]>,
    GetDocument: (DocumentId: string) => Promise<IDocumentDto>,
    SaveDocument: (args: SaveDocumentCommand) => Promise<boolean>
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

    const getDocumentTree = async (spaceId: string): Promise<IDocumentTreeDto[]> =>
    {
        var docs = await docClient.tree(spaceId);
        return docs;
    }

    const getDocument = async (documentId: string) : Promise<IDocumentDto>=>
    {
        var doc = await docClient.documentGet(documentId);
        return doc;
    }

    const saveDocument = async (args : SaveDocumentCommand) : Promise<boolean> =>{
        try{
            await docClient.documentPost(args);
            return true;
        }
        catch{
            return false;
        }
    }

    return {
        GetSpaces: getSpaces,
        GetDocumentList: getDocuments,
        GetDocumentTree: getDocumentTree,
        GetDocument: getDocument,
        SaveDocument: saveDocument
    } as WikiApi;
}

export type { ISpaceDto, IDocumentMetaDto, SaveDocumentCommand };
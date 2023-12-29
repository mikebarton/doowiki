import { SpaceClient, SpaceDto, SaveSpaceCommand, DocumentMetaDto, DocumentClient, DocumentDto, SaveDocumentCommand, DocumentTreeDto } from "./api.generated.clients";

export interface WikiApi {
    GetSpaces: () => Promise<SpaceDto[]>,
    SaveSpace: (spaceName: string, spaceId?: string | undefined) => Promise<boolean>,
    GetDocumentList: (SpaceId: string) => Promise<DocumentMetaDto[]>,
    GetDocumentTree: (SpaceId: string) => Promise<DocumentTreeDto[]>,
    GetDocument: (DocumentId: string) => Promise<DocumentDto>,
    SaveDocument: (args: SaveDocumentCommand) => Promise<boolean>
}


export default function (): WikiApi {
    const spaceclient = new SpaceClient();
    const docClient = new DocumentClient();

    const getSpaces = async (): Promise<SpaceDto[]> => {
        var spaces = await spaceclient.spaceGet();
        return spaces;
    }

    const saveSpace = async (spaceName: string, spaceId?: string | undefined): Promise<boolean> => {
        try {
            const command = { spaceId: spaceId, name: spaceName } as SaveSpaceCommand;
            await spaceclient.spacePost(command);
            return true;
        }
        catch {
            return false;
        }
    }

    const getDocuments = async (spaceId: string): Promise<DocumentMetaDto[]> => {
        var docs = await docClient.list(spaceId);
        return docs;
    }

    const getDocumentTree = async (spaceId: string): Promise<DocumentTreeDto[]> => {
        var docs = await docClient.tree(spaceId);
        return docs;
    }

    const getDocument = async (documentId: string): Promise<DocumentDto> => {
        var doc = await docClient.documentGet(documentId);
        return doc;
    }

    const saveDocument = async (args: SaveDocumentCommand): Promise<boolean> => {
        try {
            await docClient.documentPost(args);
            return true;
        }
        catch {
            return false;
        }
    }

    return {
        GetSpaces: getSpaces,
        GetDocumentList: getDocuments,
        GetDocumentTree: getDocumentTree,
        GetDocument: getDocument,
        SaveDocument: saveDocument,
        SaveSpace: saveSpace
    } as WikiApi;
}

export type { SpaceDto, DocumentMetaDto, SaveDocumentCommand, DocumentTreeDto };
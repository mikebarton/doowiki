import { SpaceClient, SpaceDto, SaveSpaceCommand, DocumentMetaDto, DocumentClient, DocumentDto, SaveDocumentCommand, DocumentTreeDto } from "./api.generated.clients";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface IQueryResponse<T> {
    isPending: boolean,
    data: T | undefined,
    error: Error
}

export interface WikiApi {
    GetSpaces: () => IQueryResponse<SpaceDto[]>,
    SaveSpace: (spaceName: string, spaceId?: string | undefined) => Promise<boolean>,
    DeleteSpace: (spaceId: string) => Promise<boolean>,
    GetDocumentList: (SpaceId: string) => IQueryResponse<DocumentMetaDto[]>,
    GetDocumentTree: (SpaceId: string) => IQueryResponse<DocumentTreeDto[]>,
    GetDocument: (DocumentId: string) => IQueryResponse<DocumentDto>,
    SaveDocument: (args: SaveDocumentCommand) => Promise<boolean>
}


export default function (): WikiApi {
    const spaceclient = new SpaceClient();
    const docClient = new DocumentClient();
    const queryClient = useQueryClient();

    const saveSpaceMutation = useMutation({
        mutationFn: async ({spaceName, spaceId} : {spaceName: string, spaceId?: string | undefined}) => {
            const command = { spaceId: spaceId, name: spaceName } as SaveSpaceCommand;
            await spaceclient.spacePost(command);
            return true;
        },
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: ['spaces']});
        }
    })

    const deleteSpaceMutation = useMutation({
        mutationFn: (spaceId: string) => spaceclient.spaceDelete(spaceId),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: ['spaces']});
        }
    });

    const saveDocumentMutation = useMutation({
        mutationFn: (doc: SaveDocumentCommand) => docClient.documentPost(doc),
        onSuccess: ()=>{
            queryClient.invalidateQueries({queryKey: ['document-meta']});
            queryClient.invalidateQueries({queryKey: ['document']});
        }
    })

    const getSpaces = (): IQueryResponse<SpaceDto[]> => {
        const getSpaces = useQuery({ queryKey: ['spaces'], queryFn: () => spaceclient.spaceGet() });
        return getSpaces as IQueryResponse<SpaceDto[]>;
    }

    const saveSpace = async (spaceName: string, spaceId?: string | undefined): Promise<boolean> => {
        try {
            return await saveSpaceMutation.mutateAsync({spaceName, spaceId});
        }
        catch {
            return false;
        }
    }

    const deleteSpace = async (spaceId: string): Promise<boolean> => {
        try {
            await deleteSpaceMutation.mutateAsync(spaceId);
            return true;
        }
        catch {
            return false;
        }
    }

    const getDocuments = (spaceId: string): IQueryResponse<DocumentMetaDto[]> => {
        const docList = useQuery({ queryKey: ['document-meta', spaceId], queryFn: () => docClient.list(spaceId) });
        return docList as IQueryResponse<DocumentMetaDto[]>
    }

    const getDocumentTree = (spaceId: string): IQueryResponse<DocumentTreeDto[]> => {
        const docTree = useQuery({ queryKey: ['document-meta', spaceId], queryFn: () => docClient.tree(spaceId) })
        return docTree as IQueryResponse<DocumentTreeDto[]>
    }

    const getDocument = (documentId: string): IQueryResponse<DocumentDto> => {
        const docQuery = useQuery({ queryKey: ['document', documentId], queryFn: () => docClient.documentGet(documentId) });
        return docQuery as IQueryResponse<DocumentDto>
    }

    const saveDocument = async (args: SaveDocumentCommand): Promise<boolean> => {
        try {
            await saveDocumentMutation.mutateAsync(args);
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
        SaveSpace: saveSpace,
        DeleteSpace: deleteSpace
    } as WikiApi;
}

export type { SpaceDto, DocumentMetaDto, SaveDocumentCommand, DocumentTreeDto };
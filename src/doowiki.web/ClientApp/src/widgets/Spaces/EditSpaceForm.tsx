import React from 'react';
import { Flex, Button } from '../../components';
import * as Form from '@radix-ui/react-form';
import useWikiApi, { SpaceDto } from '../../api/useWikiApi';

interface IEditSpaceFormProps{
    spaceId? : string | undefined,
    onUpdated?: () => void
}

interface ICanSaveForm{
    onSave: () => void
}

const EditSpaceForm = React.forwardRef(({spaceId, onUpdated }: IEditSpaceFormProps, ref: React.ForwardedRef<ICanSaveForm>) =>{
    const [spaceName, setSpaceName] = React.useState<string>();
    const [spaces, setSpaces] = React.useState<SpaceDto[]>();
    const wikiApi = useWikiApi();

    React.useEffect(() => {
        const getSpaces = async () => {
            const spaces = await wikiApi.GetSpaces();
            setSpaces(spaces);
            
            if(spaces){
                const selectedSpace = spaces.find(x=>x.id === spaceId);
                setSpaceName(selectedSpace?.name);
            }
        }

        getSpaces();
    }, []);
    
    React.useImperativeHandle(ref, ()=>({
        onSave(){
            if(spaceName)
                wikiApi.SaveSpace(spaceName, spaceId);
        }
    }))
    
    return <Form.Root>
        <Form.Field name='spaceName'>
            <Form.Label>Space Name</Form.Label>
            <Form.Message match={'valueMissing'}>Enter a SpaceName</Form.Message>
            <Form.Control asChild>
                <input value={spaceName} onChange={e=> setSpaceName(e.target.value)}/>
            </Form.Control>
        </Form.Field>
    </Form.Root>
})

interface ISaveSpaceButtonProps{
    onClick: ()=> void
}

const SaveSpaceButton = (props: ISaveSpaceButtonProps)=>{
    return <Button onClick={props.onClick}>Save</Button>
}

const SpaceForm = {
    Content: EditSpaceForm,
    SaveButton: SaveSpaceButton
}

export default SpaceForm;
export type { ICanSaveForm }
import React from 'react'
import { Flex, Button, Heading } from '../../components';

interface IYesNoFormProps{
    questionText?: string | undefined,
    affirmativeText?: string | undefined,
    negativeText?: string | undefined,
    onSubmitYes?: () => void | undefined,
    onSubmitNo?: () => void | undefined
}

const YesNoForm = (props: IYesNoFormProps) => {
    return <Flex direction='column' alignContent={'flex-start'} gap={3}>
        <Heading size={3}>{props.questionText || 'Are you sure?'}</Heading>
        <Flex>
            <Button onClick={props.onSubmitNo}>{props.negativeText || 'No'}</Button>
            <Button onClick={props.onSubmitYes}>{props.affirmativeText || 'Yes'}</Button>
        </Flex>
    </Flex>
}

export default YesNoForm;
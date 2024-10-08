import {memo, useCallback, useState} from "react";
import {AddInput} from "./AddInput.tsx";
import styled from 'styled-components';

interface IAddInputWrapper {
    onSave: (content: string) => void
}

const Button = styled.button`
    padding: 2px;
`;

const AddInputWrapper = memo<IAddInputWrapper>(({onSave}) => {
    const [show, setShow] = useState(false)

    const handleShow = () => setShow(true)

    const handleClose = useCallback(() => setShow(false), [])

    const handleSave = useCallback((content: string) => {
        onSave(content)
        setShow(false)
    }, [onSave])

    if (show) {
        return <AddInput onClose={handleClose} onSave={handleSave}/>
    }

    return <Button onClick={handleShow}>Add</Button>
})

export {AddInputWrapper}
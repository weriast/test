import {ChangeEvent, memo, useState} from "react";
import styled from 'styled-components';

interface IAddInput {
    onSave: (content: string) => void
    onClose: () => void
}

const Buttons = styled.div`
    display: flex;
    gap: 4px;
`

const Button = styled.button`
    padding: 2px;
`

const Wrapper = styled.div`
    display: flex;
    gap: 4px;
`

const AddInput = memo<IAddInput>(({onSave, onClose}) => {
    const [state, setState] = useState("")

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setState(e.target.value)
    }

    const handleSave = () => {
        onSave(state)
    }

    return <Wrapper>
        <input value={state} onChange={handleChange}/>
        <Buttons>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={onClose}>Close</Button>
        </Buttons>
    </Wrapper>
})

export {AddInput}
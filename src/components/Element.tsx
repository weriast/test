import {memo, useCallback} from "react";
import {IRecordElement} from "./List.tsx";
import {isRecord} from "../utils/isRecord.ts";
import {useListHandlersContext} from "../utils/listHandlersContext.ts";
import {AddInputWrapper} from "./AddInputWrapper.tsx";
import styled from 'styled-components';

interface IElement {
    list: Record<string, IRecordElement>
}

const Wrapper = styled.div`
    padding: 8px;
    border: 1px solid blueviolet;
    width: fit-content;
`

const ChildList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`

const Content = styled.div`
    display: flex;
    gap: 8px;
    width: fit-content;
    padding: 4px;
    align-items: center;
`

const Buttons = styled.div`
    display: flex;
    gap: 8px;
`

const Button = styled.button`
    padding: 2px;
`

const Element = memo<IRecordElement & IElement>(({
                                          content,
                                          id,
                                          parentId,
                                          childIds,
                                          list,
}) => {
    const {addElement, removeElement} = useListHandlersContext()

    const handleRemove = () => removeElement(id)

    const handleSave = useCallback((content: string) => {
        addElement(id, content)
    },[addElement, id])
    return <Wrapper>
        <Content>
            <span>{content}</span>
            <Buttons>
                <AddInputWrapper onSave={handleSave}/>
                {parentId === null ? null : <Button onClick={handleRemove}>remove</Button>}
            </Buttons>
        </Content>
        {childIds.length > 0 ? <ChildList>
            {childIds.map((childId) => {
                const childElement = list[childId]

                if (!isRecord(childElement)) {
                    return null
                }

              return  <Element
                  {...childElement}
                  key={childElement.id}
                  list={list}
              />

            })}
        </ChildList> : null}
    </Wrapper>
})

export {Element}
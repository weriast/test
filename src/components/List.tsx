import {memo, useCallback, useMemo, useState} from "react";
import {isRecord} from "../utils/isRecord.ts";
import {ListHandlersContextProvider} from "../utils/listHandlersContext.ts";
import {Element} from "./Element.tsx";

interface IRecordElement {
    id: number,
    content: string,
    parentId: number | null;
    childIds: number[]
}

const List = memo(() => {
    const initialState = useMemo(() => {
        const id = Date.now()

        return ({
            [id]: {
                id,
                content: "Корневой элемент",
                parentId: null,
                childIds: [],
            }
        })
    }, [])
    const [state, setState] = useState<Record<string, IRecordElement>>(initialState)

    const removeElement = useCallback((id: number) => {
        setState((prevState) => {
            if (isRecord(prevState)) {

                const { [id]: element, ...newState } = prevState;

                const deleteChild = (id: number) => {
                    const element = newState[id];
                    if (!isRecord(element)) return;
                    element.childIds.forEach(deleteChild);
                    delete newState[id];
                };

                deleteChild(id)

                if (typeof element.parentId === "number") {
                    const parentElement = newState[element.parentId]
                    newState[element.parentId] = {
                        ...parentElement,
                        childIds: parentElement.childIds.filter((childId) => childId !== id)
                    }
                }

                return newState
            }
            return prevState
        })
    }, [])

    const addElement = useCallback((parentId: number | null, content: string) => {
        const id = Date.now()

        const addedElement = {
            id,
            parentId,
            content,
            childIds: []
        }
        setState((prevState) => {
            if (!isRecord(prevState)) {
                return prevState
            }

            if (parentId !== null) {
                const parentElement = prevState[parentId]
                    return ({
                        ...prevState,
                        [id]: addedElement,
                        [parentId]: {
                            ...parentElement,
                            childIds: parentElement.childIds.concat(id)
                        }
                    })
            }

            return ({
                ...prevState,
                [id]: addedElement,
            })
        })
    }, [])
    return <ListHandlersContextProvider value={{addElement, removeElement}}>
        {Object.values(state)
            .filter((el) => el.parentId === null)
            .map((el) =>
                <Element {...el} key={el.id} list={state}/>)}
    </ListHandlersContextProvider>
})

export {List, type IRecordElement}
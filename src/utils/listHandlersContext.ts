import {createContext, useContext} from "react";

interface IContext {
    addElement: (parentId: number | null, content: string) => void,
    removeElement: (id: number) => void
}

const ListHandlersContext = createContext<IContext | null>(null)

const useListHandlersContext = () => {
    const handlers = useContext(ListHandlersContext)

    if (handlers === null) {
        throw new Error("cannot use ListHandlersContext with no value")
    }

    return {addElement: handlers.addElement, removeElement: handlers.removeElement}
}

const ListHandlersContextProvider = ListHandlersContext.Provider

export {ListHandlersContextProvider, useListHandlersContext}
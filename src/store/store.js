import { createContext, useState } from "react";

export const StoreContext = createContext(null)

const StoreProvider = ({ children }) => {
    const [state, setState] = useState({
        refreshUpdates: false,
        refreshPosts: false,
    });
    return <StoreContext.Provider value={[state, setState]}>{children}</StoreContext.Provider>
}

export default StoreProvider;
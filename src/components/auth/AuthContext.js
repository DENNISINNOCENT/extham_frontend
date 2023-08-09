import React, { createContext } from 'react';

const OmsContext = createContext();

function OmsProvider({children}) {
    const contextData = {
        backendUrl: "https://web-production-5370.up.railway.app"
    }

    return (
        <OmsContext.Provider value={contextData}>
            {children}
        </OmsContext.Provider>
    )
}

export {OmsContext, OmsProvider}

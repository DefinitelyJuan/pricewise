import React, {createContext, useContext, useState} from 'react';
const LanguageContext = createContext();

export const useLanguage = () => {
    return useContext(LanguageContext);
}

export const LanguageProvider = ({children}) => {
    const [language, setLanguage] = useState('es')

    return (
        <LanguageContext.Provider value={{language, setLanguage}}>
            {children}
        </LanguageContext.Provider>
    )
    
}

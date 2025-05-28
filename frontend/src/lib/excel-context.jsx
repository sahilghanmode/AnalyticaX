import { createContext, useContext, useEffect, useState } from 'react'

const ExcelDataContext = createContext(undefined)

export const ExcelDataProvider = ({ children }) => {
  const [data, setData] = useState([])
  const [file,setFile]=useState(null)


  return (
    <ExcelDataContext.Provider value={{ data, setData, file,setFile }}>
      {children}
    </ExcelDataContext.Provider>
  )
}

export function useExcelData(){
    const context=useContext(ExcelDataContext)
    if (context === undefined) {
        throw new Error("useExcelData must be used within an ExcelData provider");
    }
    return context;
}
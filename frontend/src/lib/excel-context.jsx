// context/ExcelDataContext.js
import { createContext, useContext, useEffect, useState } from 'react'

const ExcelDataContext = createContext(undefined)

export const ExcelDataProvider = ({ children }) => {
  const [data, setData] = useState([])

  useEffect(() => {
    const savedData = sessionStorage.getItem('parsedExcelData')
    if (savedData) {
      setData(JSON.parse(savedData))
    }
  }, [])

  useEffect(() => {
    if (data.length > 0) {
      sessionStorage.setItem('parsedExcelData', JSON.stringify(data))
    }
  }, [data])


  return (
    <ExcelDataContext.Provider value={{ data, setData }}>
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
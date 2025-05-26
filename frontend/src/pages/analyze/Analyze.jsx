import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Header from '../Home/Header'
import Done from './VisualizationReady'
import NotReady from './VisualizationBody'
import { axiosInstance } from '../../../utils/axios.js'
import { useExcelData } from '@/lib/excel-context'

const Analyze = () => {
  const [visualizationReady, setVisualizationReady]=useState(false)
  const [isLoading,setIsLoading]=useState(false)
  const {setData}=useExcelData()
  const location=useLocation()

  const getQueryParam = (key) => {
    return new URLSearchParams(location.search).get(key);
  };

  useEffect(()=>{
    const id=getQueryParam('id')
    if(!id){
      return
    }

    const fetchVisualization=async()=>{
      try {
        setIsLoading(true)
        const res=await axiosInstance.get("/file/getVisualizationbyId",{params:{id}})

        if(res.data.success){
          setData(res.data.jsonData)
          setVisualizationReady(true)
        }
      } catch (error) {
        console.error('Error fetching visualization:', error);
      }finally{
        setIsLoading(false)
      }
    }

    fetchVisualization()
  },[location])
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Header />
        <div className="text-xl font-semibold animate-pulse">Loading</div>
      </div>
    )
  }
  

  return (
    <div>
      <Header/>
      <div className='flex-1 container mx-auto px-4 py-12'>

        {visualizationReady ? <Done setVisualizationReady={setVisualizationReady}/> : <NotReady setVisualizationReady={setVisualizationReady}/>}
      
      </div>
    </div>
  )
}

export default Analyze

import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Header from '../Home/Header'
import Done from './VisualizationReady'
import NotReady from './VisualizationBody'
import { axiosInstance } from '../../../utils/axios.js'
import { useExcelData } from '@/lib/excel-context'
import { toast } from 'sonner'
import { useAuth } from '@/lib/auth-context'

const Analyze = () => {
  const navigate=useNavigate()
  const [visualizationReady, setVisualizationReady] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [visualizationData, setVisualizationData] = useState(null)
  const { setData } = useExcelData()
  const location = useLocation()
  const {isAuthenticated}=useAuth()

  const getQueryParam = (key) => {
    return new URLSearchParams(location.search).get(key);
  };

  useEffect(() => {
    const visualizationId = getQueryParam('id')
    if (visualizationId && !isAuthenticated) {

    toast.error("you are not authorized to see this page")
    if (location.search !== '') {
      navigate('/analyze', { replace: true }); 
    }
    return;
  }

    const fetchVisualization = async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get("/file/getVisualizationbyId", {
          params: { visualizationId },
        });

        if (res.data.success) {
          setData(res.data.jsonData);
          setVisualizationReady(true);
          setVisualizationData(res.data.visualization);
        }else{
          toast.error(res.data.message)
        }
        
      } catch (error) {
        console.error("Error fetching visualization:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchVisualization()
  }, [location,  ])



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
      <Header />
      <div className='flex-1 container mx-auto px-4 py-12'>

        {visualizationReady ? <Done setVisualizationReady={setVisualizationReady} visualizationData={visualizationData} /> : <NotReady setVisualizationReady={setVisualizationReady} />}

      </div>
    </div>
  )
}

export default Analyze

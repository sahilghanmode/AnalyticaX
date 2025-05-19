import React, { useState } from 'react'
import Header from '../Home/Header'
import Done from './VisualizationReady'
import NotReady from './VisualizationBody'

const Analyze = () => {
  const [visualizationReady, setVisualizationReady]=useState(false)

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

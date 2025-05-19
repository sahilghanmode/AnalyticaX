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
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 ml-3">Analyze Your Excel Data</h1>
        </div>

        {visualizationReady ? <Done/> : <NotReady/>}
      
      </div>
    </div>
  )
}

export default Analyze

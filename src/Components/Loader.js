import React from 'react'
import { ProgressSpinner } from 'primereact/progressspinner';
function Loader() {
  return (
    <div>
    <ProgressSpinner strokeWidth="3" style={{width:"100%"}} />
      <h1>Please wait while we Load your Horoscope</h1>
    </div>
  )
}

export default Loader
import { useEffect, useRef } from 'react'
import { startWaves } from './waves'

function WaveBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const stop = startWaves(canvasRef.current)
    return stop            // runs when the component unmounts
  }, [])

  return <canvas ref={canvasRef} className="wave-bg" />
}

export default WaveBackground

// Glowing ribbon waves drawn on a <canvas>. Returns a stop() function.
export function startWaves(canvas) {
  const ctx = canvas.getContext('2d')
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let W = 0, H = 0, raf = 0

  const resize = () => {
    W = canvas.width = canvas.clientWidth
    H = canvas.height = canvas.clientHeight
  }
  resize()
  window.addEventListener('resize', resize)

  // each ribbon: vertical position, wave size, speed, phase, and its color
  const ribbons = [
    { y: 0.50, amp: 0.20, speed: 0.30, phase: 0.0, hue: ['#3df2ff', '#b388ff'] },
    { y: 0.46, amp: 0.15, speed: 0.22, phase: 2.1, hue: ['#b388ff', '#ff4fd8'] },
    { y: 0.56, amp: 0.12, speed: 0.38, phase: 4.2, hue: ['#3df2ff', '#ff4fd8'] },
  ]

  const STRANDS = 26   // lines per ribbon
  const STEP = 6       // px between points along each line

  function draw(t) {
    ctx.clearRect(0, 0, W, H)
    ctx.globalCompositeOperation = 'lighter'   // overlapping lines add up to a glow

    for (const r of ribbons) {
      const grad = ctx.createLinearGradient(0, 0, W, 0)
      grad.addColorStop(0, r.hue[0])
      grad.addColorStop(1, r.hue[1])
      ctx.strokeStyle = grad

      const center = (x) => {
        const u = x / W
        const taper = Math.pow(Math.sin(Math.PI * u), 0.8)       // ribbon fades at the edges
        return H * r.y + taper * H * r.amp * (
          Math.sin(u * 5 + t * r.speed + r.phase) * 0.7 +
          Math.sin(u * 11 - t * r.speed * 1.4 + r.phase) * 0.3)
      }
      // ribbon width swings through zero, which makes it look like it twists
      const half = (x) => {
        const u = x / W
        return H * 0.11 * Math.sin(u * 7 + t * r.speed * 1.2 + r.phase * 2) * Math.sin(Math.PI * u)
      }

      ctx.lineWidth = 1
      ctx.globalAlpha = 0.28
      // ctx.shadowBlur = 4; 
      // ctx.shadowColor = '#b388ff';
      for (let j = 0; j < STRANDS; j++) {
        const k = (j / (STRANDS - 1)) * 2 - 1                      // -1 .. 1 across the ribbon
        ctx.beginPath()
        for (let x = 0; x <= W; x += STEP) {
          const y = center(x) + k * half(x)
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      // thin cross lines connecting the edges: the "mesh" look
      ctx.globalAlpha = 0.16
      ctx.beginPath()
      for (let x = 0; x <= W; x += 14) {
        ctx.moveTo(x, center(x) - half(x))
        ctx.lineTo(x, center(x) + half(x))
      }
      ctx.stroke()
    }
    ctx.globalAlpha = 1
    ctx.globalCompositeOperation = 'source-over'
  }

  const loop = (ms) => {
    draw(ms / 1000)
    raf = requestAnimationFrame(loop)
  }
  if (reduceMotion) draw(3)        // one still frame for people who prefer no motion
  else raf = requestAnimationFrame(loop)

  return () => {                   // cleanup
    cancelAnimationFrame(raf)
    window.removeEventListener('resize', resize)
  }
}

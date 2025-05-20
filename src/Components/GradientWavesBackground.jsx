"use client"

import { useEffect, useRef } from "react"
import "../Styles/GradientWavesBackground.css"

function GradientWavesBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    let animationFrameId
    let time = 0

    const resizeCanvas = () => {
      const container = canvas.parentElement
      canvas.width = container.offsetWidth
      canvas.height = container.offsetHeight
    }

    const drawWaves = () => {
      time += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "#ff6b6b")
      gradient.addColorStop(0.5, "#7a68f0")
      gradient.addColorStop(1, "#00d2ff")

      // Draw waves
      for (let i = 0; i < 5; i++) {
        ctx.beginPath()
        ctx.moveTo(0, canvas.height)

        for (let x = 0; x < canvas.width; x++) {
          const y =
            Math.sin(x * 0.003 + time + i * 0.5) * 50 +
            Math.sin(x * 0.001 + time + i * 0.7) * 30 +
            canvas.height / 2 +
            i * 40
          ctx.lineTo(x, y)
        }

        ctx.lineTo(canvas.width, canvas.height)
        ctx.closePath()

        ctx.fillStyle = `rgba(${120 + i * 30}, ${100 + i * 20}, ${255 - i * 20}, ${0.2 - i * 0.02})`
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(drawWaves)
    }

    resizeCanvas()

    const observer = new ResizeObserver(resizeCanvas)
    observer.observe(canvas.parentElement)

    drawWaves()

    return () => {
      observer.disconnect()
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="waves-canvas"></canvas>
}

export default GradientWavesBackground

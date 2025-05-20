"use client"

import { useEffect, useRef } from "react"
import "../Styles/MatrixRainBackground.css"

function MatrixRainBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    let animationFrameId
    let columns = []
    const fontSize = 14

    const resizeCanvas = () => {
      const container = canvas.parentElement
      canvas.width = container.offsetWidth
      canvas.height = container.offsetHeight
      initColumns()
    }

    const initColumns = () => {
      columns = []
      const columnsCount = Math.floor(canvas.width / fontSize)

      for (let i = 0; i < columnsCount; i++) {
        columns[i] = (Math.random() * canvas.height) / fontSize
      }
    }

    const drawMatrix = () => {
      // Semi-transparent black to create trailing effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#0f0" // Matrix green
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < columns.length; i++) {
        // Random character
        const char = String.fromCharCode(0x30a0 + Math.random() * 96)

        // Draw character
        const x = i * fontSize
        const y = columns[i] * fontSize
        ctx.fillText(char, x, y)

        // Reset to top or continue falling
        if (y > canvas.height && Math.random() > 0.99) {
          columns[i] = 0
        } else {
          columns[i]++
        }
      }

      animationFrameId = requestAnimationFrame(drawMatrix)
    }

    resizeCanvas()

    const observer = new ResizeObserver(resizeCanvas)
    observer.observe(canvas.parentElement)

    drawMatrix()

    return () => {
      observer.disconnect()
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="matrix-canvas"></canvas>
}

export default MatrixRainBackground

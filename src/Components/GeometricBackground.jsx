"use client"

import { useEffect, useRef } from "react"
import "../Styles/GeometricBackground.css"

function GeometricBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    let animationFrameId
    let time = 0
    let shapes = []

    const colors = ["#8A2BE2", "#4B0082", "#9370DB", "#483D8B", "#7B68EE"]

    const resizeCanvas = () => {
      const container = canvas.parentElement
      canvas.width = container.offsetWidth
      canvas.height = container.offsetHeight
      initShapes()
    }

    const initShapes = () => {
      shapes = []
      const shapeCount = Math.floor((canvas.width * canvas.height) / 20000)

      for (let i = 0; i < shapeCount; i++) {
        shapes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 50 + 20,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: Math.floor(Math.random() * 3), // 0: triangle, 1: square, 2: pentagon
          opacity: Math.random() * 0.5 + 0.1,
        })
      }
    }

    const drawShapes = () => {
      time += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      shapes.forEach((shape) => {
        ctx.save()
        ctx.translate(shape.x, shape.y)
        ctx.rotate(shape.rotation + time * shape.rotationSpeed)

        ctx.beginPath()

        // Draw different shapes
        switch (shape.shape) {
          case 0: // Triangle
            ctx.moveTo(0, -shape.size / 2)
            ctx.lineTo(shape.size / 2, shape.size / 2)
            ctx.lineTo(-shape.size / 2, shape.size / 2)
            break
          case 1: // Square
            ctx.rect(-shape.size / 2, -shape.size / 2, shape.size, shape.size)
            break
          case 2: // Pentagon
            for (let i = 0; i < 5; i++) {
              const angle = ((Math.PI * 2) / 5) * i - Math.PI / 2
              const x = (Math.cos(angle) * shape.size) / 2
              const y = (Math.sin(angle) * shape.size) / 2
              if (i === 0) ctx.moveTo(x, y)
              else ctx.lineTo(x, y)
            }
            break
        }

        ctx.closePath()
        ctx.fillStyle =
          shape.color +
          Math.floor(shape.opacity * 255)
            .toString(16)
            .padStart(2, "0")
        ctx.fill()

        ctx.restore()
      })

      animationFrameId = requestAnimationFrame(drawShapes)
    }

    resizeCanvas()

    const observer = new ResizeObserver(resizeCanvas)
    observer.observe(canvas.parentElement)

    drawShapes()

    return () => {
      observer.disconnect()
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="geometric-canvas"></canvas>
}

export default GeometricBackground

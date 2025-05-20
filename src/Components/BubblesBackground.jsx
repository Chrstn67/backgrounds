"use client"

import { useEffect, useRef } from "react"
import "../Styles/BubblesBackground.css"

function BubblesBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    let animationFrameId
    let bubbles = []

    const colors = ["#ff6b6b", "#48dbfb", "#1dd1a1", "#f368e0", "#feca57"]

    const resizeCanvas = () => {
      const container = canvas.parentElement
      canvas.width = container.offsetWidth
      canvas.height = container.offsetHeight
      initBubbles()
    }

    const initBubbles = () => {
      bubbles = []
      const bubbleCount = Math.floor((canvas.width * canvas.height) / 15000)

      for (let i = 0; i < bubbleCount; i++) {
        bubbles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 30 + 10,
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.3,
        })
      }
    }

    const drawBubbles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      bubbles.forEach((bubble) => {
        // Draw bubble
        ctx.beginPath()
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2)
        ctx.fillStyle =
          bubble.color +
          Math.floor(bubble.opacity * 255)
            .toString(16)
            .padStart(2, "0")
        ctx.fill()

        // Add highlight
        ctx.beginPath()
        ctx.arc(bubble.x - bubble.radius * 0.3, bubble.y - bubble.radius * 0.3, bubble.radius * 0.2, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)"
        ctx.fill()

        // Move bubble upward
        bubble.y -= bubble.speed

        // If bubble goes off-screen, reset it at the bottom
        if (bubble.y + bubble.radius < 0) {
          bubble.y = canvas.height + bubble.radius
          bubble.x = Math.random() * canvas.width
        }
      })

      animationFrameId = requestAnimationFrame(drawBubbles)
    }

    resizeCanvas()

    const observer = new ResizeObserver(resizeCanvas)
    observer.observe(canvas.parentElement)

    drawBubbles()

    return () => {
      observer.disconnect()
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="bubbles-canvas"></canvas>
}

export default BubblesBackground

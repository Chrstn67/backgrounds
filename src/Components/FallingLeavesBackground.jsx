import { useEffect, useRef } from "react";
import "../Styles/FallingLeavesBackground.css";

function FallingLeavesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let leaves = [];

    const leafColors = [
      "#e67e22", // Orange
      "#d35400", // Dark Orange
      "#f39c12", // Yellow
      "#c0392b", // Red
      "#8e44ad", // Purple
      "#27ae60", // Green
    ];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initLeaves();
    };

    const initLeaves = () => {
      leaves = [];
      const leafCount = Math.floor((canvas.width * canvas.height) / 15000);

      for (let i = 0; i < leafCount; i++) {
        leaves.push(createLeaf());
      }
    };

    const createLeaf = (x = null, y = null) => {
      return {
        x: x !== null ? x : Math.random() * canvas.width,
        y: y !== null ? y : Math.random() * canvas.height - canvas.height,
        size: Math.random() * 15 + 10,
        color: leafColors[Math.floor(Math.random() * leafColors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        speedX: Math.random() * 1 - 0.5,
        speedY: Math.random() * 1 + 0.7,
        swingFactor: Math.random() * 0.1 + 0.05,
        swingOffset: Math.random() * Math.PI * 2,
      };
    };

    const drawLeaf = (leaf, time) => {
      ctx.save();

      // Translate to leaf position
      ctx.translate(leaf.x, leaf.y);

      // Rotate leaf
      ctx.rotate(leaf.rotation);

      // Create leaf shape
      ctx.beginPath();

      // Draw a simple leaf shape
      ctx.moveTo(0, -leaf.size / 2);
      ctx.bezierCurveTo(
        leaf.size / 2,
        -leaf.size / 4,
        leaf.size / 2,
        leaf.size / 4,
        0,
        leaf.size / 2
      );
      ctx.bezierCurveTo(
        -leaf.size / 2,
        leaf.size / 4,
        -leaf.size / 2,
        -leaf.size / 4,
        0,
        -leaf.size / 2
      );

      // Draw stem
      ctx.moveTo(0, leaf.size / 2);
      ctx.lineTo(0, leaf.size);

      ctx.fillStyle = leaf.color;
      ctx.fill();
      ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      ctx.restore();
    };

    const drawLeaves = () => {
      const time = Date.now() * 0.001;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      leaves.forEach((leaf, index) => {
        // Update leaf position
        leaf.rotation += leaf.rotationSpeed;
        leaf.x +=
          leaf.speedX +
          Math.sin(time * leaf.swingFactor + leaf.swingOffset) * 1.5;
        leaf.y += leaf.speedY;

        // Draw leaf
        drawLeaf(leaf, time);

        // Reset leaf when it goes off screen
        if (leaf.y > canvas.height + leaf.size) {
          leaves[index] = createLeaf(Math.random() * canvas.width, -leaf.size);
        }

        // Reset leaf when it goes off screen horizontally
        if (leaf.x < -leaf.size || leaf.x > canvas.width + leaf.size) {
          leaves[index] = createLeaf(Math.random() * canvas.width, -leaf.size);
        }
      });

      animationFrameId = requestAnimationFrame(drawLeaves);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    drawLeaves();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="leaves-canvas"></canvas>;
}

export default FallingLeavesBackground;

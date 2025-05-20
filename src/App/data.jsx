"use client";

export const backgrounds = {
  particles: {
    name: "Particules Connectées",
    description:
      "Un fond élégant avec des particules qui se connectent entre elles lorsqu'elles sont à proximité. Parfait pour les sites web axés sur la technologie, l'innovation ou les données.",
    code: `import { useEffect, useRef } from "react";
import "./ParticlesBackground.css";

function ParticlesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor(
        (window.innerWidth * window.innerHeight) / 10000
      );

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          color: \`rgba(100, 255, 218, \${Math.random() * 0.5 + 0.1})\`,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, i) => {
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Connect particles that are close to each other
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = \`rgba(100, 255, 218, \${
              0.2 * (1 - distance / 100)
            })\`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    drawParticles();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="particles-canvas"></canvas>;
}

export default ParticlesBackground;`,
    css: `.particles-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #0f172a;
}`,
  },
  gradientWaves: {
    name: "Vagues Gradient",
    description:
      "Un fond animé avec des vagues de couleur fluides qui se déplacent doucement. Idéal pour les sites créatifs, artistiques ou les applications de méditation.",
    code: `import { useEffect, useRef } from "react";
import "./GradientWavesBackground.css";

function GradientWavesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawWaves = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#ff6b6b");
      gradient.addColorStop(0.5, "#7a68f0");
      gradient.addColorStop(1, "#00d2ff");

      // Draw waves
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        for (let x = 0; x < canvas.width; x++) {
          const y = Math.sin(x * 0.003 + time + i * 0.5) * 50 + 
                    Math.sin(x * 0.001 + time + i * 0.7) * 30 +
                    canvas.height / 2 + i * 40;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();

        ctx.fillStyle = \`rgba(\${120 + i * 30}, \${100 + i * 20}, \${255 - i * 20}, \${0.2 - i * 0.02})\`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(drawWaves);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    drawWaves();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="waves-canvas"></canvas>;
}

export default GradientWavesBackground;`,
    css: `.waves-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #1a1a2e, #16213e);
}`,
  },
  matrixRain: {
    name: "Matrix Rain",
    description:
      "Inspiré du film 'The Matrix', ce fond affiche des caractères qui tombent comme de la pluie. Parfait pour les sites tech, cybersécurité ou ambiance cyberpunk.",
    code: `import { useEffect, useRef } from "react";
import "./MatrixRainBackground.css";

function MatrixRainBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let columns = [];
    let fontSize = 14;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initColumns();
    };

    const initColumns = () => {
      columns = [];
      const columnsCount = Math.floor(canvas.width / fontSize);
      
      for (let i = 0; i < columnsCount; i++) {
        columns[i] = Math.random() * canvas.height / fontSize;
      }
    };

    const drawMatrix = () => {
      // Semi-transparent black to create trailing effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = "#0f0"; // Matrix green
      ctx.font = \`\${fontSize}px monospace\`;

      for (let i = 0; i < columns.length; i++) {
        // Random character
        const char = String.fromCharCode(0x30A0 + Math.random() * 96);
        
        // Draw character
        const x = i * fontSize;
        const y = columns[i] * fontSize;
        ctx.fillText(char, x, y);
        
        // Reset to top or continue falling
        if (y > canvas.height && Math.random() > 0.99) {
          columns[i] = 0;
        } else {
          columns[i]++;
        }
      }

      animationFrameId = requestAnimationFrame(drawMatrix);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    drawMatrix();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="matrix-canvas"></canvas>;
}

export default MatrixRainBackground;`,
    css: `.matrix-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
}`,
  },
  bubbles: {
    name: "Bulles Flottantes",
    description:
      "Des bulles colorées qui flottent lentement vers le haut. Parfait pour les sites ludiques, éducatifs ou orientés enfants.",
    code: `import { useEffect, useRef } from "react";
import "./BubblesBackground.css";

function BubblesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let bubbles = [];

    const colors = ["#ff6b6b", "#48dbfb", "#1dd1a1", "#f368e0", "#feca57"];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initBubbles();
    };

    const initBubbles = () => {
      bubbles = [];
      const bubbleCount = Math.floor(canvas.width * canvas.height / 15000);
      
      for (let i = 0; i < bubbleCount; i++) {
        bubbles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 30 + 10,
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.3
        });
      }
    };

    const drawBubbles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      bubbles.forEach(bubble => {
        // Draw bubble
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
        ctx.fillStyle = bubble.color + Math.floor(bubble.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
        
        // Add highlight
        ctx.beginPath();
        ctx.arc(bubble.x - bubble.radius * 0.3, bubble.y - bubble.radius * 0.3, bubble.radius * 0.2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.fill();

        // Move bubble upward
        bubble.y -= bubble.speed;
        
        // If bubble goes off-screen, reset it at the bottom
        if (bubble.y + bubble.radius < 0) {
          bubble.y = canvas.height + bubble.radius;
          bubble.x = Math.random() * canvas.width;
        }
      });

      animationFrameId = requestAnimationFrame(drawBubbles);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    drawBubbles();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="bubbles-canvas"></canvas>;
}

export default BubblesBackground;`,
    css: `.bubbles-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #6f86d6, #48c6ef);
}`,
  },
  stars: {
    name: "Ciel Étoilé",
    description:
      "Un fond de ciel nocturne avec des étoiles scintillantes. Idéal pour les sites liés à l'astronomie, la science-fiction ou pour créer une ambiance nocturne apaisante.",
    code: `import { useEffect, useRef } from "react";
import "./StarsBackground.css";

function StarsBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let stars = [];
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const starCount = Math.floor(canvas.width * canvas.height / 1000);
      
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          blinkSpeed: Math.random() * 0.05 + 0.01,
          blinkOffset: Math.random() * Math.PI * 2
        });
      }
    };

    const drawStars = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        // Calculate blinking effect
        const brightness = 0.5 + 0.5 * Math.sin(time * star.blinkSpeed + star.blinkOffset);
        
        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = \`rgba(255, 255, 255, \${brightness})\`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(drawStars);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    drawStars();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="stars-canvas"></canvas>;
}

export default StarsBackground;`,
    css: `.stars-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #0f2027, #203a43, #2c5364);
}`,
  },
  geometric: {
    name: "Motifs Géométriques",
    description:
      "Un fond avec des formes géométriques colorées qui tournent lentement. Parfait pour les sites de design, d'art ou d'architecture.",
    code: `import { useEffect, useRef } from "react";
import "./GeometricBackground.css";

function GeometricBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let time = 0;
    let shapes = [];

    const colors = ["#8A2BE2", "#4B0082", "#9370DB", "#483D8B", "#7B68EE"];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initShapes();
    };

    const initShapes = () => {
      shapes = [];
      const shapeCount = Math.floor(canvas.width * canvas.height / 20000);
      
      for (let i = 0; i < shapeCount; i++) {
        shapes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 50 + 20,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: Math.floor(Math.random() * 3), // 0: triangle, 1: square, 2: pentagon
          opacity: Math.random() * 0.5 + 0.1
        });
      }
    };

    const drawShapes = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      shapes.forEach(shape => {
        ctx.save();
        ctx.translate(shape.x, shape.y);
        ctx.rotate(shape.rotation + time * shape.rotationSpeed);
        
        ctx.beginPath();
        
        // Draw different shapes
        switch(shape.shape) {
          case 0: // Triangle
            ctx.moveTo(0, -shape.size / 2);
            ctx.lineTo(shape.size / 2, shape.size / 2);
            ctx.lineTo(-shape.size / 2, shape.size / 2);
            break;
          case 1: // Square
            ctx.rect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
            break;
          case 2: // Pentagon
            for (let i = 0; i < 5; i++) {
              const angle = (Math.PI * 2 / 5) * i - Math.PI / 2;
              const x = Math.cos(angle) * shape.size / 2;
              const y = Math.sin(angle) * shape.size / 2;
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            }
            break;
        }
        
        ctx.closePath();
        ctx.fillStyle = shape.color + Math.floor(shape.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
        
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(drawShapes);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    drawShapes();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="geometric-canvas"></canvas>;
}

export default GeometricBackground;`,
    css: `.geometric-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #121212;
}`,
  },

  falling: {
    name: "Confetti",
    description: "Des confetti tombent poétiquement sur l'écran.",
    code: `import { useEffect, useRef } from "react";
      import "./FallingLeavesBackground.css";
      
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
      `,
    css: `.stars-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, #0f2027, #203a43, #2c5364);
  }`,
  },
};

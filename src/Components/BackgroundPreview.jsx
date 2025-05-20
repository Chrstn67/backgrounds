import { lazy, Suspense } from "react";
import "../Styles/BackgroundPreview.css";

// Dynamically import backgrounds
const ParticlesBackground = lazy(() => import("./ParticlesBackground"));
const GradientWavesBackground = lazy(() => import("./GradientWavesBackground"));
const MatrixRainBackground = lazy(() => import("./MatrixRainBackground"));
const BubblesBackground = lazy(() => import("./BubblesBackground"));
const StarsBackground = lazy(() => import("./StarsBackground"));
const GeometricBackground = lazy(() => import("./GeometricBackground"));
const FallingLeavesBackground = lazy(() => import("./FallingLeavesBackground"));

export default function BackgroundPreview({ id }) {
  const renderBackground = () => {
    switch (id) {
      case "particles":
        return <ParticlesBackground />;
      case "gradientWaves":
        return <GradientWavesBackground />;
      case "matrixRain":
        return <MatrixRainBackground />;
      case "bubbles":
        return <BubblesBackground />;
      case "stars":
        return <StarsBackground />;
      case "geometric":
        return <GeometricBackground />;
      case "falling":
        return <FallingLeavesBackground />;
      default:
        return <div>Background not found</div>;
    }
  };

  return (
    <div className="preview-container">
      <Suspense fallback={<div>Chargement...</div>}>
        {renderBackground()}
      </Suspense>
    </div>
  );
}

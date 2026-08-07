import React, { useEffect, useRef } from "react";

export default function FoxAnimation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let instance;
    let cancelled = false;

    import("@rive-app/canvas").then((mod) => {
      if (cancelled || !canvasRef.current) return;

      instance = new mod.Rive({
        src: "/fox_appear.riv",
        canvas: canvasRef.current,
        autoplay: false,
        stateMachines: "FoxRaiseUp",

        onLoad: () => {
          instance.resizeDrawingSurfaceToCanvas();
          canvasRef.current.style.display = "block";
          instance.play("FoxRaiseUp");

          const inputs = instance.stateMachineInputs("FoxRaiseUp");
          const startTrigger = inputs.find((i) => i.name === "Start");

          startTrigger?.fire();
        },
      });
    });

    return () => {
      cancelled = true;
      instance?.cleanup();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={320}
      height={220}
      style={{
        width: "100%",
        height: "100%",
        display: "block"
      }}
    />
  );
}
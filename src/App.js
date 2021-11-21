import { useEffect, useRef } from "react";

import SpinnerDots from "./Spinner/SpinnerDots";

import setScene from "./threeJsLib/setScene";
// import setScene2 from "./world/world";

function App() {
  const rendererRef = useRef();
  const textRef = useRef();
  useEffect(() => {
    const { domElement, onResize, animate } = setScene(textRef, rendererRef);
    // setScene2(textRef, rendererRef);

    let frameId;

    const RAF = () => {
      animate();
      frameId = requestAnimationFrame(RAF);
    };

    // resize;
    window.addEventListener("resize", onResize);

    // start animation
    RAF();

    // cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      domElement.remove();
    };
  }, []);

  return (
    <>
      <p
        style={{
          position: "fixed",
          bottom: "0",
          left: "5px",
          color: "whitesmoke",
          fontSize: "10px",
        }}
      >
        Left click (touch) rotates.
        <br />
        Right click (two touches) pans the camera.
        <br />
        Zoom in out enabled.
      </p>
      <div
        ref={rendererRef}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <div ref={textRef}>
          <h1>Loading</h1>
          <SpinnerDots />
        </div>
      </div>
    </>
  );
}

export default App;

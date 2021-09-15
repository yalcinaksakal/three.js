import { useEffect, useRef } from "react";
import { Scene } from "three";
import createR from "./threeJsLib/renderer";
import myCam from "./threeJsLib/camera";
import createLights from "./threeJsLib/lights";
import cubeTexture from "./threeJsLib/cubeTexture";
import createPlane, {
  bigBox,
  moveBoxes,
  someBoxes,
} from "./threeJsLib/createPlaneAndBoxes";
import SpinnerDots from "./Spinner/SpinnerDots";
import setOrbitControls from "./threeJsLib/setOrbitControls";

function App() {
  const rendererRef = useRef();
  const textRef = useRef();
  useEffect(() => {
    //renderer
    const renderer = createR();
    //camera
    const camera = myCam();
    //scene
    const scene = new Scene();
    //lights
    const lights = createLights();
    scene.add(lights.directional);
    scene.add(lights.ambient);

    //add a plane
    scene.add(createPlane());

    //add the big box
    scene.add(bigBox());

    //add boxes
    const boxes = [];
    for (let x = -8; x < 8; x += 2) {
      for (let y = -8; y < 8; y += 2) {
        const box = someBoxes(x, y);
        scene.add(box);
        boxes.push([box, Math.random() * 2 > 1 ? 0.01 : -0.01, 0.5, 0]);
      }
    }

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    //animate
    let frameId;
    const RAF = () => {
      moveBoxes(boxes);
      renderer.render(scene, camera);
      controls.update();
      frameId = requestAnimationFrame(RAF);
    };

    //resize
    window.addEventListener("resize", onResize);

    const { domElement } = renderer;

    //add controls
    const controls = setOrbitControls(camera, domElement);

    //add renderer to DOM
    const appender = () => {
      textRef.current.remove();
      rendererRef.current.appendChild(domElement);
    };

    //background, texture onLoad calls appender
    scene.background = cubeTexture(appender);

    //animate
    RAF();

    //cleanup
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
          left: "0",
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

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useEffect, useRef } from "react";
import { Scene } from "three";
import createR from "./threeJsLib/renderer";
import myCam from "./threeJsLib/camera";
import createLights from "./threeJsLib/lights";
import cubeTexture from "./threeJsLib/cubeTexture";
import createPlane, { bigBox, someBoxes } from "./threeJsLib/createPlane";
import SpinnerDots from "./Spinner/SpinnerDots";

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
        boxes.push([box, Math.random() * 2 > 1 ? 0.01 : -0.01]);
      }
    }

    //move boxes
    const moveBoxes = () => {
      for (const box of boxes) {
        if (box[0].position.y > 4 || box[0].position.y < 2) box[1] *= -1;
        box[0].position.y += box[1];
      }
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    //animate
    let frameId;
    const RAF = () => {
      moveBoxes();
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(RAF);
    };

    //resize
    window.addEventListener("resize", onResize);

    const { domElement } = renderer;

    //add controls

    const controls = new OrbitControls(camera, domElement);
    controls.target.set(0, 20, 0);
    controls.update();

    //add renderer to DOM
    const appender = () => {
      textRef.current.remove();
      rendererRef.current.appendChild(domElement);
    };

    //background
    scene.background = cubeTexture(appender);
    //animate
    RAF();

    //cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      // domElement.removeEventListener("DOMContentLoaded", start);
      domElement.remove();
    };
  }, []);

  return (
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
  );
}

export default App;

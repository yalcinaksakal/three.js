import { Scene } from "three";
import myCam from "./camera";
import createPlane, {
  bigBox,
  moveBoxes,
  someBoxes,
} from "./createPlaneAndBoxes";
import cubeTexture from "./cubeTexture";
import createLights from "./lights";
import createR from "./renderer";
import setOrbitControls from "./setOrbitControls";

const setScene = (textRef, rendererRef) => {
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

  //add renderer to DOM
  const appender = () => {
    textRef.current.remove();
    rendererRef.current.appendChild(domElement);
  };

  //background, texture onLoad calls appender
  scene.background = cubeTexture(appender);

  const { domElement } = renderer;

  //add controls
  const controls = setOrbitControls(camera, domElement);

  //onResize
  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  //animate
  // let renderRequested;
  const animate = () => {
    // if (!renderRequested)
    moveBoxes(boxes);
    // renderRequested = false;
    renderer.render(scene, camera);
    controls.update();
  };

  // function requestRenderIfNotRequested() {
  //   if (!renderRequested) {
  //     renderRequested = true;
  //     requestAnimationFrame(animate);
  //   }
  // }

  // controls.addEventListener("change", requestRenderIfNotRequested);

  return { boxes, scene, camera, domElement, controls, onResize, animate };
};

export default setScene;

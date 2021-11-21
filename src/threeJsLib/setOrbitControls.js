import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const setOrbitControls = (cam, el) => {
  const controls = new OrbitControls(cam, el);
  controls.target.set(0, 20, 0);
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.2;
  controls.enableDamping = true;
  controls.maxDistance = 800;
  controls.minDistance = 100;
  return controls;
};

export default setOrbitControls;

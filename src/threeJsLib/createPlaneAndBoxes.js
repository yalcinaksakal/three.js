import {
  PlaneGeometry,
  MeshStandardMaterial,
  DoubleSide,
  Mesh,
  BoxGeometry,
} from "three";

//Boxes

//Big box
export const bigBox = () => {
  const box = new Mesh(
    new BoxGeometry(2, 20, 2),
    new MeshStandardMaterial({
      color: "red",
    })
  );
  box.position.set(-100, 2, 0);
  box.castShadow = true;
  box.receiveShadow = true;
  return box;
};

//multiple boxes
export const someBoxes = (x, y) => {
  const box = new Mesh(
    new BoxGeometry(2, 2, 2),
    new MeshStandardMaterial({
      color: `rgb(${Math.floor(Math.random() * 255)},${Math.floor(
        Math.random() * 255
      )},${Math.floor(Math.random() * 255)})`,
    })
  );
  box.position.set(
    Math.random() + x * 5,
    Math.random() + 2.0,
    Math.random() + y * 5 + 5
  );
  box.castShadow = true;
  box.receiveShadow = true;
  return box;
};

//move
export const moveBoxes = boxes => {
  let change;
  for (const box of boxes) {
    if (box[3] !== 0) {
      change = box[3] > 0 ? 0.2 : -0.2;
      box[0].position.y += change;
      box[3] += change;
      if (box[3] > 30 || box[3] < -30) box[3] = 0;
      continue;
    }
    if (box[0].position.y > 4 || box[0].position.y < 2) box[1] *= -1;
    box[0].position.y += box[1];
    if (box[0].position.x < -220 || box[0].position.x > 40) {
      box[3] = box[0].position.x < -220 ? 1 : -1;
      box[2] *= -1;
    }
    box[0].position.x += box[2];
  }
};

//Plane
const createPlane = () => {
  const plane = new Mesh(
    new PlaneGeometry(200, 100, 2, 2),
    new MeshStandardMaterial({
      color: "dodgerblue",
      transparent: true,
      opacity: 0.3,
    })
  );

  plane.castShadow = false;
  plane.receiveShadow = true;
  plane.rotation.x = -Math.PI / 2;
  plane.material.side = DoubleSide;
  plane.position.set(-100, -10, 0);
  return plane;
};

export default createPlane;

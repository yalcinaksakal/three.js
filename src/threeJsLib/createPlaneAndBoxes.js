import {
  PlaneGeometry,
  MeshStandardMaterial,
  DoubleSide,
  Mesh,
  BoxGeometry,
} from "three";

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

import { CubeTextureLoader } from "three";

const cubeTexture = appender => {
  const loader = new CubeTextureLoader().load(
    [
      "SpaceboxCollection/Spacebox1/_left.png",
      "SpaceboxCollection/Spacebox1/_right.png",

      "SpaceboxCollection/Spacebox1/_top.png",
      "SpaceboxCollection/Spacebox1/_bottom.png",

      "SpaceboxCollection/Spacebox1/_front.png",
      "SpaceboxCollection/Spacebox1/_back.png",
    ],
    appender,
    e => console.log(e, "load")
  );

  return loader;
};

export default cubeTexture;

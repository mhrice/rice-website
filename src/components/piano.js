import React, { useState, useRef, useEffect } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { ColladaLoader } from "three/examples/jsm/loaders/ColladaLoader"
import { Canvas, extend, useThree, useRender } from "react-three-fiber"

import "../styles/piano.css";

extend({ OrbitControls })

const SpaceShip = () => {
  const [model, setModel] = useState()

  useEffect(() => {
    new GLTFLoader().load("/scene.gltf", setModel)
  })

  return model ? <primitive object={model.scene} position={[-300, 20, 60]} rotation={[1.4, 0, 0]} scale={[1, 1, 1]}/> : null
}

const Piano2 = () => {
  const [model, setModel] = useState()

  useEffect(() => {
    new ColladaLoader().load("/piano.dae", setModel)
  })

  return model ? <primitive object={model.scene} position={[-6.5, 0.3, 0]} rotation={[1.57, 0, 0]} scale={[0.02, 0.01, 0.01]} /> : null
}

const Controls = () => {
  const orbitRef = useRef()
  const { camera, gl } = useThree()

//   useRender(() => {
//     orbitRef.current.update()
//   })

  return (
    <orbitControls
      autoRotate
      maxPolarAngle={Math.PI / 4}
      minPolarAngle={Math.PI / 4}
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  )
}


export default () => {

  return (
      <div className="piano-container">
        <Canvas 
          camera={{ position: [0, 0, 1.5]}}
        >
          {/* <ambientLight intensity={1} /> */}
          {/* <spotLight position={[0, 100, 100]} intensity={3} penumbra={1} castShadow /> */}
          <directionalLight position={[1, 0, 5]} intensity={0.8} />

          {/* <fog attach="fog" args={["black", 10, 25]} /> */}
          {/* <Controls /> */}
          {/* <Box /> */}
          {/* <Plane /> */}
          {/* <SpaceShip /> */}
          <Piano2/>
        </Canvas>
    </div>
  )
}
import * as THREE from 'three'
import React, { useEffect, useRef } from 'react'
import { useLoader, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
  
export default function Model(props) {
  const group = useRef()
  const gltf = useLoader(GLTFLoader, '/scene.gltf')

  return (
    <group ref={group} {...props}>
      <scene name="OSG_Scene" >
        <object3D name="RootNode_(gltf_orientation_matrix)" rotation={[-1.5707963267948963, 0, 0,]} >
          <object3D name="RootNode_(model_correction_matrix)" >
            <object3D name="e552283101f24bb7b812cae1b35d26c8fbx" rotation={[1.5707963267948963, 0, 0,]} >
              <object3D name="RootNode" >
                <object3D name="polySurface4" position={[0, 0, -67.73688507080078,]} >
                  <mesh name="polySurface4_lambert7_0" >
                    <bufferGeometry attach="geometry" {...gltf.__$[6].geometry} />
                    <shaderMaterial attach="material" {...gltf.__$[6].material} name="lambert7" />
                  </mesh>
                </object3D>
              </object3D>
            </object3D>
          </object3D>
        </object3D>
      </scene>
    </group>
  )
}
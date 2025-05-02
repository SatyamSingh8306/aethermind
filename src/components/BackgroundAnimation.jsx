import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const BackgroundAnimation = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.z = 30

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 1500
    
    const positionArray = new Float32Array(particlesCount * 3)
    const scaleArray = new Float32Array(particlesCount)
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position
      positionArray[i] = (Math.random() - 0.5) * 100       // x
      positionArray[i + 1] = (Math.random() - 0.5) * 100   // y
      positionArray[i + 2] = (Math.random() - 0.5) * 100   // z
      
      // Scale
      scaleArray[i / 3] = Math.random()
    }
    
    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positionArray, 3)
    )
    particlesGeometry.setAttribute(
      'aScale',
      new THREE.BufferAttribute(scaleArray, 1)
    )

    // Create material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.2,
      sizeAttenuation: true,
      color: 0x9d46ff,
      transparent: true,
      opacity: 0.8,
    })

    // Create points
    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    // Add some lights
    const ambientLight = new THREE.AmbientLight(0x404040)
    scene.add(ambientLight)

    const pointLight = new THREE.PointLight(0x00e5ff, 2, 100)
    pointLight.position.set(10, 10, 10)
    scene.add(pointLight)

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    // Animation loop
    let mouseX = 0
    let mouseY = 0
    
    document.addEventListener('mousemove', (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = (event.clientY / window.innerHeight) * 2 - 1
    })

    const animate = () => {
      requestAnimationFrame(animate)
      
      particles.rotation.x += 0.0003
      particles.rotation.y += 0.0005

      // Gentle follow mouse
      particles.rotation.x += mouseY * 0.0005
      particles.rotation.y += mouseX * 0.0005
      
      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      particlesGeometry.dispose()
      particlesMaterial.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} id="bg-canvas" />
}

export default BackgroundAnimation
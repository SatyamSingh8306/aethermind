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

    // Renderer setup with improved quality
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Create particles with improved distribution
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = 2000
    
    const positionArray = new Float32Array(particlesCount * 3)
    const scaleArray = new Float32Array(particlesCount)
    const colorArray = new Float32Array(particlesCount * 3)
    
    // Professional color palette
    const colors = {
      primary: new THREE.Color(0x4A90E2),    // Professional blue
      secondary: new THREE.Color(0x50E3C2),  // Teal
      accent: new THREE.Color(0x9B51E0)      // Purple
    }
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Improved position distribution
      const radius = 50 * Math.sqrt(Math.random())
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      
      positionArray[i] = radius * Math.sin(phi) * Math.cos(theta)
      positionArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positionArray[i + 2] = radius * Math.cos(phi)
      
      // Dynamic scale based on position
      scaleArray[i / 3] = Math.random() * 0.5 + 0.5
      
      // Color variation
      const color = new THREE.Color()
      color.lerpColors(colors.primary, colors.secondary, Math.random())
      colorArray[i] = color.r
      colorArray[i + 1] = color.g
      colorArray[i + 2] = color.b
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3))
    particlesGeometry.setAttribute('aScale', new THREE.BufferAttribute(scaleArray, 1))
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3))

    // Create custom shader material for better visual effects
    const particlesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mousePosition: { value: new THREE.Vector2(0, 0) }
      },
      vertexShader: `
        attribute float aScale;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        uniform vec2 mousePosition;
        
        void main() {
          vColor = color;
          vec3 pos = position;
          
          // Add subtle wave motion
          pos.y += sin(time * 0.5 + position.x * 0.1) * 0.5;
          pos.x += cos(time * 0.3 + position.y * 0.1) * 0.5;
          
          // Mouse interaction
          float dist = length(pos.xy - mousePosition * 50.0);
          pos.z += smoothstep(30.0, 0.0, dist) * 5.0;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = aScale * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          // Create soft circular particles
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          // Add glow effect
          float glow = 1.0 - smoothstep(0.0, 0.5, dist);
          gl_FragColor = vec4(vColor, glow * 0.8);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })

    // Create points
    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)

    // Add subtle ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5)
    scene.add(ambientLight)

    // Handle window resize with debounce
    let resizeTimeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }, 100)
    }

    window.addEventListener('resize', handleResize)

    // Mouse interaction
    let mouseX = 0
    let mouseY = 0
    let targetMouseX = 0
    let targetMouseY = 0
    
    document.addEventListener('mousemove', (event) => {
      targetMouseX = (event.clientX / window.innerWidth) * 2 - 1
      targetMouseY = (event.clientY / window.innerHeight) * 2 - 1
    })

    // Animation loop with smooth mouse following
    let time = 0
    const animate = () => {
      requestAnimationFrame(animate)
      
      time += 0.01
      particlesMaterial.uniforms.time.value = time
      
      // Smooth mouse following
      mouseX += (targetMouseX - mouseX) * 0.05
      mouseY += (targetMouseY - mouseY) * 0.05
      particlesMaterial.uniforms.mousePosition.value.set(mouseX, mouseY)
      
      // Subtle rotation
      particles.rotation.x += 0.0002
      particles.rotation.y += 0.0003
      
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

  return <canvas ref={canvasRef} id="bg-canvas" style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, pointerEvents: 'none' }} />
}

export default BackgroundAnimation
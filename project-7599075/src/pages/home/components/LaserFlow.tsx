import { useEffect, useRef } from 'react';

interface LaserFlowProps {
  horizontalBeamOffset?: number;
  verticalBeamOffset?: number;
  color?: string;
}

export default function LaserFlow({
  horizontalBeamOffset = 0.1,
  verticalBeamOffset = 0.0,
  color = '#8B5CF6'
}: LaserFlowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Vertex shader
    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment shader with laser flow effect
    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 resolution;
      uniform float time;
      uniform float horizontalBeamOffset;
      uniform float verticalBeamOffset;
      uniform vec3 color;

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / resolution;
        vec3 finalColor = vec3(0.0);

        // Horizontal laser beams
        float hBeam1 = abs(sin((uv.y + time * 0.1 + horizontalBeamOffset) * 20.0));
        hBeam1 = smoothstep(0.95, 1.0, hBeam1);
        
        float hBeam2 = abs(sin((uv.y - time * 0.15 + horizontalBeamOffset * 2.0) * 15.0));
        hBeam2 = smoothstep(0.93, 1.0, hBeam2);

        // Vertical laser beams
        float vBeam1 = abs(sin((uv.x + time * 0.12 + verticalBeamOffset) * 18.0));
        vBeam1 = smoothstep(0.94, 1.0, vBeam1);
        
        float vBeam2 = abs(sin((uv.x - time * 0.08 + verticalBeamOffset * 1.5) * 22.0));
        vBeam2 = smoothstep(0.96, 1.0, vBeam2);

        // Combine beams
        float beams = max(max(hBeam1, hBeam2), max(vBeam1, vBeam2));
        
        // Add glow
        float glow = beams * 0.5;
        
        // Apply color
        finalColor = color * (beams + glow * 0.3);
        
        // Add subtle noise
        float noise = random(uv + time * 0.01) * 0.02;
        finalColor += noise;

        gl_FragColor = vec4(finalColor, beams * 0.3);
      }
    `;

    // Create shaders
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    // Create program
    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Set up geometry
    const positions = new Float32Array([
      -1, -1,
      1, -1,
      -1, 1,
      1, 1
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    const resolutionLocation = gl.getUniformLocation(program, 'resolution');
    const timeLocation = gl.getUniformLocation(program, 'time');
    const horizontalBeamOffsetLocation = gl.getUniformLocation(program, 'horizontalBeamOffset');
    const verticalBeamOffsetLocation = gl.getUniformLocation(program, 'verticalBeamOffset');
    const colorLocation = gl.getUniformLocation(program, 'color');

    // Convert hex color to RGB
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16) / 255,
        g: parseInt(result[2], 16) / 255,
        b: parseInt(result[3], 16) / 255
      } : { r: 0.545, g: 0.361, b: 0.965 };
    };

    const rgb = hexToRgb(color);

    // Enable blending
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Animation loop
    let animationId: number;
    const startTime = Date.now();

    const render = () => {
      const time = (Date.now() - startTime) / 1000;

      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, time);
      gl.uniform1f(horizontalBeamOffsetLocation, horizontalBeamOffset);
      gl.uniform1f(verticalBeamOffsetLocation, verticalBeamOffset);
      gl.uniform3f(colorLocation, rgb.r, rgb.g, rgb.b);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [horizontalBeamOffset, verticalBeamOffset, color]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
      }}
    />
  );
}
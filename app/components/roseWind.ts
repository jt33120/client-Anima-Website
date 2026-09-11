/** Deform the original artwork on a GPU mesh; no separate moving image layers. */
const vertexSource = `
attribute vec2 point;
varying vec2 uv;
uniform float wind;
uniform float head;
uniform float time;
void main() {
  uv = point;
  vec2 p = point;
  float height = 1.0 - p.y;
  // A cantilever curve keeps the stem's base fixed and bends more toward its tip.
  p.x += wind * .105 * height * height;
  p.y += abs(wind) * .012 * height * height;
  float bloom = 1.0 - smoothstep(.29, .43, point.y);
  vec2 crown = point - vec2(.54, .35);
  float nod = (head - wind) * .13;
  p += bloom * vec2(-crown.y * nod, crown.x * nod);
  // Local fields die away at the petiole, keeping each leaf attached to its stem.
  float left = exp(-pow((point.x-.46)/.13, 2.0)-pow((point.y-.54)/.12, 2.0));
  float right = exp(-pow((point.x-.76)/.12, 2.0)-pow((point.y-.47)/.12, 2.0));
  float low = exp(-pow((point.x-.66)/.10, 2.0)-pow((point.y-.75)/.09, 2.0));
  p.y += left * .016 * sin(time*2.1 + wind) * (.3+abs(wind));
  p.y += right * .019 * sin(time*1.7 + 1.8) * (.3+abs(wind));
  p.x += low * .009 * sin(time*2.4 + .7) * (.2+abs(wind));
  // A smaller edge response gives the outer petals a soft flutter.
  float edge = bloom * smoothstep(.10, .32, abs(point.x-.52));
  p.y += edge * .006 * sin(time*2.7 + point.x*9.0) * (.25+abs(wind));
  gl_Position = vec4((p.x*2.0-1.0)*.86, (1.0-p.y*2.0)*.94, 0.0, 1.0);
}`;
const fragmentSource = `
precision mediump float;
varying vec2 uv;
uniform sampler2D artwork;
void main() { gl_FragColor = texture2D(artwork, uv); }
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Shader unavailable");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    throw new Error("Shader compilation failed");
  }
  return shader;
}

export function createRoseWind(canvas: HTMLCanvasElement, image: HTMLImageElement) {
  const gl = canvas.getContext("webgl", { alpha: false, antialias: true, depth: false });
  if (!gl) return null;
  const shaders: WebGLShader[] = [];
  const program = gl.createProgram();
  const buffer = gl.createBuffer();
  const texture = gl.createTexture();
  if (!program || !buffer || !texture) return null;
  const dispose = () => {
    shaders.forEach(shader => gl.deleteShader(shader));
    gl.deleteProgram(program);
    gl.deleteBuffer(buffer);
    gl.deleteTexture(texture);
  };
  try {
    shaders.push(compile(gl, gl.VERTEX_SHADER, vertexSource));
    shaders.push(compile(gl, gl.FRAGMENT_SHADER, fragmentSource));
    shaders.forEach(shader => gl.attachShader(program, shader));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error("Link failed");
    gl.useProgram(program);
    const vertices: number[] = [];
    const columns = 36, rows = 54;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        const l = x / columns, r = (x + 1) / columns;
        const t = y / rows, b = (y + 1) / rows;
        vertices.push(l,t, r,t, l,b, l,b, r,t, r,b);
      }
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    const location = gl.getAttribLocation(program, "point");
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, 2, gl.FLOAT, false, 0, 0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    const windUniform = gl.getUniformLocation(program, "wind");
    const headUniform = gl.getUniformLocation(program, "head");
    const timeUniform = gl.getUniformLocation(program, "time");
    let wind = 0, velocity = 0, head = 0, headVelocity = 0, time = 0;
    return {
      draw(dt: number) {
        time += dt;
        const gust = .52*Math.sin(time*.83) + .26*Math.sin(time*1.37+.8) + .16*Math.sin(time*2.13);
        velocity += ((gust-wind)*7 - velocity*3.1)*dt;
        wind += velocity*dt;
        headVelocity += ((wind-head)*10 - headVelocity*2.8)*dt;
        head += headVelocity*dt;
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(1, 1, 1, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform1f(windUniform, wind);
        gl.uniform1f(headUniform, head);
        gl.uniform1f(timeUniform, time);
        gl.drawArrays(gl.TRIANGLES, 0, vertices.length/2);
      },
      dispose,
    };
  } catch {
    dispose();
    return null;
  }
}

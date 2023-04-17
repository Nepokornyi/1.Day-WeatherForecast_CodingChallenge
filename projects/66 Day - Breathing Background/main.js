const colors = ["#8a00d4", "#f9c46b", "#d527b7", "#d527b7", "#f782c2"];
const heading = document.getElementById("colorful-heading");
let headingText = heading.innerText;
let colorfulText = "";

for (let i = 0; i < headingText.length; i++) {
  const color = colors[i % colors.length];
  if (headingText[i] === " ") {
    colorfulText += " ";
  } else {
    colorfulText += `<span style="color: ${color};">${headingText[i]}</span>`;
  }
}

heading.innerHTML = colorfulText;



import * as THREE from 'three'

let camera, scene, renderer, uniforms;

function init() {
    const container = document.getElementById('container');
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    scene = new THREE.Scene();

    const geometry = new THREE.PlaneBufferGeometry(2, 2);

    uniforms = {
        iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        iTime: { value: 0.0 }
    }

    const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent
    })

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    uniforms.iTime.value = performance.now() / 1000;
    renderer.render(scene, camera);
}

init();

























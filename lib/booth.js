import { OBJLoader } from '../node_modules/three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from '../node_modules/three/examples/jsm/loaders/MTLLoader.js';
import { FBXLoader } from '../node_modules/three/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from '../node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { PointerLockControls } from '../node_modules/three/examples/jsm/controls/PointerLockControls.js';

let scene = new THREE.Scene();
let cam = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
);
cam.position.z += 200;
cam.position.y += 50;
cam.position.x += 100;

let renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setPixelRatio(devicePixelRatio);
renderer.setClearColor( 0xffffff );
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let loader = new THREE.CubeTextureLoader();
let skybox = loader.load([
    'indoor/px.png',
    'indoor/nx.png',
    'indoor/py.png',
    'indoor/ny.png',
    'indoor/pz.png',
    'indoor/nz.png',
    ]);
scene.background = 0xffffff;

const loader2 = new OBJLoader();
const loader3 = new FBXLoader();

loader3.load('model/Pavilion_vray.fbx' , (exh) => {
    exh.position.set(120,-8,100);
    exh.rotation.set(0,-6.3,0);
    scene.add(exh);

    let model = exh;
    let newMaterial = new THREE.MeshPhongMaterial({map:woodtexture});
    model.traverse((o) => {
        if (o.isMesh) o.material = newMaterial;
    });
});

// loader3.load('model/RinTextures/Rin.fbx' , (rin) => {
//     rin.scale.set(0.07,0.07,0.07);
//     rin.position.set(-90,1,85);
//     rin.rotation.set(0,11,0);
//     scene.add(rin);

//     let model = rin;
//     let rintex = new THREE.TextureLoader().load('model/RinTextures/body_texture.png');
//     let newMaterial = new THREE.MeshPhongMaterial({map:rintex});
//     model.traverse((o) => {
//         if (o.isMesh) o.material = newMaterial;
//     });
// });

loader2.load( 'model/reception/Reception_Desk_1_obj.obj', function ( reception ) {
            reception.scale.x = 0.2;
            reception.scale.y = 0.2;
            reception.scale.z = 0.2;
            reception.position.set(-85,0,85);
            reception.rotation.set(0,8,0);

            scene.add( reception );

            let model = reception;
            let newMaterial = new THREE.MeshPhongMaterial({map:woodtexture});
        
            model.traverse((o) => {
              if (o.isMesh) o.material = newMaterial;
            });

            
            } );

let domEvents = new THREEx.DomEvents(cam, renderer.domElement);


// const gltfloader = new GLTFLoader();

// gltfloader.load(
//     'model/booth/scene.gltf',
//     function ( gltf ) {
//         scene.add( gltf.scene );

//         gltf.scene.scale.x = 5;
//         gltf.scene.scale.y = 5;
//         gltf.scene.scale.z = 5;

//         // gltf.scene.color = new THREE.MeshBasicMaterial({
//         //     color: 0xffffff
//         // });

//         gltf.animations; // Array<THREE.AnimationClip>
//         gltf.scene; // THREE.Group
//         gltf.scenes; // Array<THREE.Group>
//         gltf.cameras; // Array<THREE.Camera>
//         gltf.asset; // Object

//         let model = gltf.scene;
//         let newMaterial = new THREE.MeshPhongMaterial({map:woodtexture});
//         model.traverse((o) => {
//           if (o.isMesh) o.material = newMaterial;
//         });


//     });

// Tree

loader2.load(
    'model/PalmTree/10446_Palm_Tree_v1_max2010_iteration-2.obj',
    function ( objectt ) {
        objectt.scale.x = 0.1;
        objectt.scale.y = 0.1;
        objectt.scale.z = 0.1;
        objectt.rotation.x = 4.8;
        objectt.position.x = -130;

        domEvents.addEventListener(objectt, 'click', event => {
        });

        scene.add(objectt);
        let modeltree = objectt;
        let newMaterialTree = new THREE.MeshLambertMaterial({color:0x00ff00});
        modeltree.traverse((o) => {
          if (o.isMesh) o.material = newMaterialTree;
        });
    });

// End Tree
// booth 
loader2.load(
    'model/Booth Exhibition Stand.obj',
    function ( object ) {
        object.scale.x = 0.1;
        object.scale.y = 0.1;
        object.scale.z = 0.1;
        object.position.set(-90,0,35);
        object.rotation.set(0,8,0);
        object.name = "booth1";
        scene.add(object);

        let model = object;
        let newMaterial = new THREE.MeshPhongMaterial({map:woodtexture});
        let hoverMat = new THREE.MeshLambertMaterial({color: 0xff0000});
        model.traverse((o) => {
          if (o.isMesh) o.material = newMaterial;
        });

        let raycaster = new THREE.Raycaster();
        let mouse = {};
        let selected;

        document.body.addEventListener("pointerdown", function() {
            document.body.style.cursor = 'pointer';
        });

        document.body.addEventListener("pointerup", function() {
            document.body.style.cursor = 'default';
        });

        let domEvents = new THREEx.DomEvents(cam, renderer.domElement);

        domEvents.addEventListener(object, 'click', function(event){
            // let object1 = document.getElementById('modalbox');
            // object1.classList.toggle('showmodal');
            return popup1();
        });
        
        // document.body.addEventListener('click' , (e) => {
        //     mouse.x = (e.clientX/window.innerWidth)*2-1;
        //     mouse.y = (e.clientY/window.innerHeight)*-2+1;

        // raycaster.setFromCamera(mouse, cam);
        // let items = raycaster.intersectObjects(scene.children, true);

        // items.forEach((i)=>{
        //     if (i.object.name != "") {
        //         selected = i.object;
        //     }
        // });

        // if (selected != undefined) {
        //     let object1 = document.getElementById('modalbox');
        //     object1.classList.toggle('showmodal');
        //     }
        // });         

        // document.body.addEventListener('mouseup', (e) => {
        //     mouse.x = (e.clientX/window.innerWidth)*2-1;
        //     mouse.y = (e.clientY/window.innerHeight)*-2+1;

        // raycaster.setFromCamera(mouse, cam);
        // let items = raycaster.intersectObjects(scene.children, true);

        // items.forEach((i)=>{
        //     if (i.object.name != "") {
        //         // console.log(i.object);
        //         selected = i.object;
        //     }
        // });

        // if (selected != undefined) {
        //     document.body.style.cursor = 'default';
        //     }
        //     document.body.style.cursor = 'default';
        // });

        // End Hover
    });

loader2.load(
    'model/Booth Exhibition Stand.obj',
    function ( object2 ) {
        object2.scale.x = 0.1;
        object2.scale.y = 0.1;
        object2.scale.z = 0.1;
        object2.position.x = -55;

        scene.add(object2);

        let model = object2;
        let newMaterial = new THREE.MeshPhongMaterial({
            map:woodtexture,
            flatShading: true
        });
        model.traverse((o) => {
          if (o.isMesh) o.material = newMaterial;
        });

        let domEvents = new THREEx.DomEvents(cam, renderer.domElement);

        domEvents.addEventListener(object2, 'click', function(event){
            // let object1 = document.getElementById('modalbox');
            // object1.classList.toggle('showmodal');
            return popup2();
        });
    });

loader2.load(
    'model/Booth Exhibition Stand.obj',
    function ( object3 ) {
        object3.scale.x = 0.1;
        object3.scale.y = 0.1;
        object3.scale.z = 0.1;
        object3.position.x = -10;

        scene.add(object3);

        let model = object3;
        let newMaterial = new THREE.MeshPhongMaterial({
            map:woodtexture,
            flatShading: true
        });
        model.traverse((o) => {
          if (o.isMesh) o.material = newMaterial;
        });

        let domEvents = new THREEx.DomEvents(cam, renderer.domElement);

        domEvents.addEventListener(object3, 'click', function(event){
            // let object1 = document.getElementById('modalbox');
            // object1.classList.toggle('showmodal');
            return popup3();
        });
    });

loader2.load(
    'model/Booth Exhibition Stand.obj',
    function ( object4 ) {
        object4.scale.x = 0.1;
        object4.scale.y = 0.1;
        object4.scale.z = 0.1;
        object4.position.x = 35;

        scene.add(object4);

        let model = object4;
        let newMaterial = new THREE.MeshStandardMaterial({color:0xffffff});
        model.traverse((o) => {
          if (o.isMesh) o.material = newMaterial;
        });

        let domEvents = new THREEx.DomEvents(cam, renderer.domElement);

        domEvents.addEventListener(object4, 'click', function(event){
            // let object1 = document.getElementById('modalbox');
            // object1.classList.toggle('showmodal');
            return popup4();
        });
    });

loader2.load(
    'model/Booth Exhibition Stand.obj',
    function ( object5 ) {
        object5.scale.x = 0.1;
        object5.scale.y = 0.1;
        object5.scale.z = 0.1;
        object5.position.x = 80;

        scene.add(object5);

        let model = object5;
        let newMaterial = new THREE.MeshPhongMaterial({
            map:woodtexture,
            bumpMap: bataTexture
        });
        model.traverse((o) => {
          if (o.isMesh) o.material = newMaterial;
        });

        let domEvents = new THREEx.DomEvents(cam, renderer.domElement);

        domEvents.addEventListener(object5, 'click', function(event){
            // let object1 = document.getElementById('modalbox');
            // object1.classList.toggle('showmodal');
            return popup5();
        });
    });

// loader2.load(
//     'model/Booth Exhibition Stand.obj',
//     function ( object6 ) {
//         object6.scale.x = 0.1;
//         object6.scale.y = 0.1;
//         object6.scale.z = -0.1;
//         object6.position.z = 100;

//         domEvents.addEventListener(object6, 'click', event => {
//         });

//         scene.add(object6);
//     });

// End Of Booth

// 3DText

let selectedFont;
let tulisan = 'THIS IS EXPO';
let tMesh;
// let loader = new THREE.FontLoader().load('node_modules/three/examples/fonts/gentilis_bold.typeface.json', (e)=>{
//     selectedFont = e;
//     createText();
// });

let loadertext = new THREE.TTFLoader().load('font/ShinySignature.ttf', (e)=>{
    let tFont = new THREE.Font(e);
    selectedFont = tFont;

    createText(); 
});

function createText() {
    let tGeo = new THREE.TextBufferGeometry(tulisan, {
        size: 5,
        height: 1,
        font: selectedFont
    });

    let tMat = new THREE.MeshPhongMaterial({
        color: 0xff0000
    });

    tMesh = new THREE.Mesh(tGeo, tMat);
    tMesh.position.set(-280,40,90);
    tMesh.scale.set(4,4,4);
    tMesh.rotation.set(0,8,0);
    scene.add(tMesh);
}

// END 3D Text

const pLight = new THREE.PointLight(0xffffff, 0.5);
pLight.position.set(4,20,12);
scene.add(pLight);

const pLight2 = new THREE.PointLight(0xffffff, 0.5);
pLight2.position.set(100,20,20);
scene.add(pLight2);

const pLight3 = new THREE.PointLight(0x0000ff, 0.5);
pLight3.position.set(-100,20,20);
scene.add(pLight3);

const pLight4 = new THREE.PointLight(0xffffff, 1);
pLight4.position.set(4,20,70);
scene.add(pLight4);

// const pBigLight = new THREE.PointLight(0xffff00, 1);
// pBigLight.position.set(-200,100,-100);
// scene.add(pBigLight);

let woodtexture = new THREE.TextureLoader().load('textures/wood.jpg');
let bataTexture = new THREE.TextureLoader().load('textures/bump1.jpg');
let bataGreyTexture = new THREE.TextureLoader().load('textures/bumprock.png');
let floor1 = new THREE.TextureLoader().load('textures/floor2.jpg');

// let planeGeo = new THREE.PlaneGeometry(5000,5000);
// let planeMat = new THREE.MeshPhongMaterial({
//     map: floor1
// })
// let planeMesh = new THREE.Mesh(planeGeo, planeMat);
// planeMesh.rotation.x -= Math.PI/2;
// planeMesh.position.y -= 0.5;
// scene.add(planeMesh);

const controls = new THREE.OrbitControls(cam, renderer.domElement);
// Vertical Angle
// controls.minPolarAngle = 0.1; 
// controls.maxPolarAngle = Math.PI / 2.9; 
// // Horizontal Angle
// // controls.minAzimuthAngle = 0; 
// // controls.maxAzimuthAngle = 50; 
// // Zoom COntrol
controls.minDistance = 10;
controls.maxDistance = 300;

// const grid = new THREE.GridHelper(100, 20, 0x0a0a0a, 0x0a0a0a);
// grid.position.y -= 1.5;
// scene.add(grid);

function render() {
    scene.rotation.y -= 0.001;
    renderer.render(scene, cam);
    requestAnimationFrame(render);
}

render();
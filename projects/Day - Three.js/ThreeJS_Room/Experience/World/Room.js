import * as THREE from 'three'
import Experience from "../Experience";
import GSAP from 'gsap'



export default class Room{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene
        this.roomChildren = {};

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        }

        this.setModel();
        this.setAnimation();
        this.onMouseMove();

    }

    setModel(){
        this.actualRoom.children.forEach(child => {
            child.castShadow = true;
            child.receiveShadow = true;

            if(child instanceof THREE.Group){
                child.children.forEach(groupChild => {
                    groupChild.castShadow = true;
                    groupChild.receiveShadow = true;
                })
            }

            if (child.name === "Aquarium") {
                child.children[0].material = new THREE.MeshPhysicalMaterial();
                child.children[0].material.roughness = 0;
                child.children[0].material.color.set(0x549dd2);
                child.children[0].material.ior = 3;
                child.children[0].material.transmission = 1;
                child.children[0].material.opacity = 1;
                child.children[0].material.depthWrite = false;
                child.children[0].material.depthTest = false;
            }

            if(child.name === "Computer"){
                child.children[1].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                })
            }

            if(child.name === 'Mini_Floor'){
                child.position.x = -0.3;
                child.position.z = 8.8;
            }

            child.scale.set(0, 0, 0);

            if(child.name === 'Cube'){
                child.position.set(0, -1, 0);
                child.rotation.y = Math.PI / 4;
            }

            this.roomChildren[child.name.toLowerCase()] = child;
        });

        const width = 0.8;
        const height = 0.3;
        const intensity = 1;
        const rectLight = new THREE.RectAreaLight(
            0xffffff,
            intensity,
            width,
            height
        );
        rectLight.position.set(7.6, 7, 0.5);
        rectLight.rotation.x = -Math.PI / 2;
        rectLight.rotation.z = -Math.PI / 4;
        this.actualRoom.add(rectLight);

        this.roomChildren['rectLight'] = rectLight;

        this.actualRoom.scale.set(0.1, 0.1, 0.1);
        this.scene.add(this.actualRoom);
    }

    setAnimation(){
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        this.swim = this.mixer.clipAction(this.room.animations[0]);
        this.swim.play();
    }

    onMouseMove(){
        window.addEventListener('mousemove', e => {
            this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation * 0.1;
        })
    }

    resize(){
        
    }

    update(){
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;

        this.mixer.update(this.time.delta * 0.0009);
    }
}
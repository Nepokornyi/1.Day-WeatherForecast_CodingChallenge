import * as THREE from 'three'
import Experience from "../Experience";

export default class Room{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;

        this.progress = 0;
        this.dummyVector = new THREE.Vector3(0, 0, 0);


        this.position = new THREE.Vector3(0, 0, 0);
        this.lookAtPosition = new THREE.Vector3(0, 0, 0);

        this.directionalVector = new THREE.Vector3(0,0,0);
        this.staticVector = new THREE.Vector3(0,1,0);
        this.crossVector = new THREE.Vector3(0,0,0);

    }
    resize(){
        
    }

    update(){

    }
}
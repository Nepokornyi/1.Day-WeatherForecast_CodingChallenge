import * as THREE from 'three'
import Experience from "../Experience";

export default class Room{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;

        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene

        console.log(this.actualRoom)
        this.setModel()

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

            if(child.name === 'Aquarium'){
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness = 0;
                child.material.color.set(0xffffff);
                child.material.ior = 3;
                child.material.transmission = 1;
                child.material.opacity = 1;
            }
        })

        this.actualRoom.scale.set(0.1, 0.1, 0.1);
        this.scene.add(this.actualRoom);
    }

    resize(){
        
    }

    update(){
        
    }
}
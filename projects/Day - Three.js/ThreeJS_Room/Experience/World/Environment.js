import * as THREE from 'three'
import Experience from '../Experience'
import GSAP from 'gsap';

export default class Environment {
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.obj = {
            colorObj: {r:0, g:0, b:0},
            intensity: 3
        };

        this.setSunlight();
    }

    setSunlight() {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 3);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(2048, 2048);
        this.sunLight.shadow.normalBias = 0.05;
        this.sunLight.position.set(-1.5, 7, 3);

        this.scene.add(this.sunLight);

        this.ambientLight = new THREE.AmbientLight('#FFFFFF', 1);
        this.scene.add(this.ambientLight)
    }

    switchTheme(theme){
        if(theme === 'dark'){
            GSAP.to(this.sunLight.color, {
                r:0.1725,
                g:0.2313,
                b:0.6862,
            });
            GSAP.to(this.ambientLight.color, {
                r:0.1725,
                g:0.2313,
                b:0.6862,
            });

            GSAP.to(this.sunLight ,{
                intensity: 0.78,
            })
            GSAP.to(this.ambientLight ,{
                intensity: 0.78,
            })
        }
        else{
            GSAP.to(this.sunLight.color, {
                r:1,
                g:1,
                b:1,
            });
            GSAP.to(this.ambientLight.color, {
                r:1,
                g:1,
                b:1,
            });

            GSAP.to(this.sunLight ,{
                intensity: 1,
            })
            GSAP.to(this.ambientLight ,{
                intensity: 1,
            })
        }
    }

}
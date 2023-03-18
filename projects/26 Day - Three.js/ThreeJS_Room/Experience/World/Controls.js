import * as THREE from 'three'
import Experience from "../Experience";
import GSAP from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import ASScroll from '@ashthornton/asscroll'

export default class Room{
    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;
        this.room.children.forEach(child => {
            if(child.type === 'RectAreaLight'){
                this.rectLight = child;
            }
        });

        this.circleFirst = this.experience.world.floor.circleFirst;
        this.circleSecond = this.experience.world.floor.circleSecond;
        this.circleThird = this.experience.world.floor.circleThird;

        GSAP.registerPlugin(ScrollTrigger);

        document.querySelector(".page").style.overflow = "visible";

        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
            this.setSmoothScroll();
        }

        this.setScrollTrigger();
    }

    setSmoothScroll(){
        this.asscroll = this.setupASScroll();
    }
    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            ease: 0.25,
            disableRaf: true
        });
    
        GSAP.ticker.add(asscroll.update);
    
        ScrollTrigger.defaults({
            scroller: asscroll.containerElement
        });
    
        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value) {
                if (arguments.length) {
                    asscroll.currentPos = value;
                    return;
                }
                return asscroll.currentPos;
            },
            getBoundingClientRect() {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
            },
            fixedMarkers: true
        });
    
        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);
        
        requestAnimationFrame(() => {
           asscroll.enable({
                newScrollElements: document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, [asscroll]")
            }); 
        });
        return asscroll;
    }

    setScrollTrigger(){
        ScrollTrigger.matchMedia({

            "(min-width: 969px)": () => {
                // Resets
                this.room.scale.set(0.1, 0.1, 0.1);
                this.rectLight.width = 0.8;
                this.rectLight.height = 0.3;

                // First
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: '.first-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    },
                });
                this.firstMoveTimeline.to(this.room.position, {
                    x: () => {
                        return this.sizes.width * 0.0015;
                    },
                });


                // Second
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: '.second-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    },
                });
                this.secondMoveTimeline.to(this.room.position, {
                    x: () => {
                        return 1;
                    },
                    z: () =>{
                        return this.sizes.height * 0.003;
                    }
                }, 'same');
                this.secondMoveTimeline.to(this.room.scale, {
                    x: 0.3,
                    y: 0.3,
                    z: 0.3,
                }, 'same');
                this.secondMoveTimeline.to(this.rectLight, {
                    width: 0.8 * 4,
                    height: 0.3 * 4,
                }, 'same');

                // Third
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: '.third-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    },
                });
                this.thirdMoveTimeline.to(this.camera.orthographicCamera.position, {
                    y: -1.5,
                    x: -3.5,
                });

            },

            "(max-width:968px)": () => {
                // Resets
                this.room.scale.set(0.07, 0.07, 0.07);
                this.room.position.set(0, 0, 0);
                this.camera.orthographicCamera.position.z = 11.25;
                this.rectLight.width = 0.3;
                this.rectLight.height = 0.3;

                // First
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: '.first-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    },
                });
                this.firstMoveTimeline.to(this.room.scale, {
                    x: 0.09,
                    y: 0.09,
                    z: 0.09,
                });


                // Second
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: '.second-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    },
                });
                this.secondMoveTimeline.to(this.room.scale, {
                    x: 0.25,
                    y: 0.25,
                    z: 0.25,
                }, 'same');
                this.secondMoveTimeline.to(this.rectLight, {
                    width: 0.3 * 3.4,
                    height: 0.4 * 3.4
                }, 'same');
                this.secondMoveTimeline.to(this.room.position, {
                    x: 1.5,
                }, 'same');


                // Third
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: '.third-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.5,
                        invalidateOnRefresh: true,
                    },
                });
                this.thirdMoveTimeline.to(this.room.position, {
                    z: -4,
                });
            },

            all: () => {

                this.section = document.querySelectorAll('.section');
                this.section.forEach(section => {
                    this.progressWrapper = section.querySelector('.progress-wrapper');
                    this.progressBar = section.querySelector('.progress-bar');

                    if(section.classList.contains('right')){
                        GSAP.to(section, {
                            borderTopLeftRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: 'top bottom',
                                end: 'top top',
                                scrub: 0.5,
                            }
                        });
                        GSAP.to(section, {
                            borderBottomLeftRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: 'bottom bottom',
                                end: 'bottom top',
                                scrub: 0.5,
                            }
                        })
                    }
                    else{
                        GSAP.to(section, {
                            borderTopRightRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: 'top bottom',
                                end: 'top top',
                                scrub: 0.5,
                            }
                        });
                        GSAP.to(section, {
                            borderBottomRightRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: 'bottom bottom',
                                end: 'bottom top',
                                scrub: 0.5,
                            }
                        })
                    }

                    GSAP.from(this.progressBar, {
                        scaleY: 0,
                        scrollTrigger:{
                            trigger: section,
                            start: 'top top',
                            end: 'bottom bottom',
                            scrub: 0.5,
                            pin: this.progressWrapper,
                            pinSpacing: false,
                        }
                    });
                });

                // Circle Animation

                this.firstCircleMove = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: '.first-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.5,
                    },
                });

                this.firstCircleMove.to(this.circleFirst.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                })

                this.secondCircleMove = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: '.second-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.5,
                    },
                });

                this.secondCircleMove.to(this.circleSecond.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                }, 'same')
                this.secondCircleMove.to(this.room.position, {
                    y: 0.7,
                }, 'same')

                this.thirdCircleMove = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: '.third-move',
                        start: 'top top',
                        end: 'bottom bottom',
                        scrub: 0.5,
                    },
                });

                this.thirdCircleMove.to(this.circleThird.scale, {
                    x: 3,
                    y: 3,
                    z: 3,
                })

                // Platform Animation
                this.secondPartTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: '.third-move',
                        start: 'center center',
                    },
                });

                this.room.children.forEach(child => {
                    if(child.name === 'Mini_Floor'){
                        this.first = GSAP.to(child.position, {
                            x: -5.5,
                            z: 13.6,
                            duration: 0.4
                        })
                    }
                    if(child.name === 'Mailbox'){
                        this.second = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: 'back.out(2)',
                            duration: 0.4
                        })
                    }
                    if(child.name === 'Lamp'){
                        this.third = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: 'back.out(2)',
                            duration: 0.4
                        })
                    }
                    if(child.name === 'FloorFirst'){
                        this.fourth = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: 'back.out(2)',
                            duration: 0.4
                        })
                    }
                    if(child.name === 'FloorSecond'){
                        this.fifth = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: 'back.out(2)',
                            duration: 0.4
                        })
                    }
                    if(child.name === 'FloorThird'){
                        this.sixth = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: 'back.out(2)',
                            duration: 0.4
                        })
                    }
                    if(child.name === 'Dirt'){
                        this.seventh = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: 'back.out(2)',
                            duration: 0.4
                        })
                    }
                    if(child.name === 'Flower1'){
                        this.eighth = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: 'back.out(2)',
                            duration: 0.4
                        })
                    }
                    if(child.name === 'Flower2'){
                        this.ninth = GSAP.to(child.scale, {
                            x: 1,
                            y: 1,
                            z: 1,
                            ease: 'back.out(2)',
                            duration: 0.4
                        })
                    }
                });
                this.secondPartTimeline.add(this.first);
                this.secondPartTimeline.add(this.second);
                this.secondPartTimeline.add(this.third);
                this.secondPartTimeline.add(this.fourth);
                this.secondPartTimeline.add(this.fifth);
                this.secondPartTimeline.add(this.sixth);
                this.secondPartTimeline.add(this.seventh);
                this.secondPartTimeline.add(this.eighth);
                this.secondPartTimeline.add(this.ninth);
            },
              
          });
    }

    resize(){
        
    }

    update(){

    }
}
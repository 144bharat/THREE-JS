import gsap from 'gsap';
$(".scramble").scramble(3000, 0, "alphabet", true);

var timeline = gsap.timeline();
    timeline.to(".loading",{
        opacity:0,
        delay:2.5
    })
    .to(".loader",{
        opacity:0,
        duration:1,
        ease:"expo.easeInOut"
    })
    .to(".loader",{
        y:"-100%",
        duration:1
    })
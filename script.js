var audio = new Audio("./res/african-savanna.mp3");

function loco() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
            };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform
            ? "transform"
            : "fixed",
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}

function countdown() {
    var h1 = document.querySelector("#timer h1")
    var btn = document.querySelector("#timer button")
    var grow = 0

    inte = setInterval(function () {
        if (grow < 90) {
            grow += Math.floor(Math.random() * 20)
            h1.innerHTML = grow + "%"
        } else {
            grow = 100
            h1.innerHTML = grow + "%"
            h1.style.transform = "translateY(-100%)"
            h1.style.opacity = "0"
            btn.style.transform = "translateY(-95%)"
            btn.style.opacity = "1"
            clearInterval(inte)
        }
    }, Math.floor(Math.random() * 300))


    var leafs = document.querySelector("#page1 .leaf")
    btn.addEventListener("click", function () {
        document.querySelector("#page1").style.borderRadius = "0"
        document.querySelector(".poster").style.display = "initial"
        // play audio by this line
        audio.play()
        gsap.to("#page1", {
            scale: 1,
            duration: 0.5
        })
        gsap.to("#timer", {
            opacity: 0
        });
        gsap.to(leafs, {
            rotate: "-5deg",
            duration: 0.8

        })
        gsap.from(".poster", {
            rotate: "-5deg",
            height: 0,
            duration: 0.8
        })

        gsap.to("#nav", {
            top: 0,
            opacity: 1,
            delay: 0.5,
            duration: 0.5,
          });
          gsap.to("#main", {
            overflow: "auto",
          });
    })

}
countdown()
loco()

gsap.to(".logo",{
    fill: "#000",
    scrollTrigger:{
        trigger:"#pg3-text",
        scroller:"#main",
        start:"top 80%",
        scrub:.1,
        end:"top 65%",
        markers:true
    }
})

gsap.to("#page2 video",{
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
    opacity:1,
    scrollTrigger:{
        trigger:"video",
        scroller:"#main",
        start:"top 80%",
        scrub:.1,
        end:"top 65%",
        markers:true
    }
})


    var clutter = "";

// document.querySelector("#pg3-text>h1").textContent.split("").forEach(function(dets){
//     clutter += `<span>${dets}</span>`

//     document.querySelector("#pg3-text>h1").innerHTML = clutter;
// })

var h1 = document.querySelectorAll("#pg3-text h1");
h1.forEach(function (elem) {
  var textCon = elem.textContent;
  var splitedText = textCon.split("");
  var clutter = "";
  splitedText.forEach(function (e) {
    clutter += `<span>${e}</span>`;
  });
  elem.innerHTML = clutter;
});

// gsap.to("#pg3-text h1 span",{
//     color: "#e3e3c4",
//     stagger: 0.3,
//     scrollTrigger: {
//       trigger: "#page2 h2 span",
//       scroller: "#main",
//       start: "top 55%",
//       end: "top -5%",
//       scrub: 2,
// })
gsap.to("#pg3-text h1 span",{
    color:"#000",
    stagger:0.1,
    duration:.5,
    ease:Expo.easeInOut,
    scrollTrigger:{
        trigger: "#page3 h1 span",
        start:"top 65%",
        end:"top 15%",
        scroller:"#main",
        scrub:3,
        // pin:true
    }
})


// gsap.to("#scroller",{
//     transform:"translateX(-100%)",
//     scrollTrigger:{
//         start:"top 0%",
//         end:"top -100%",
//         trigger:"#scroller",
//         scroller:"#main",
//         // markers:true,
//         pin:true,
//         scrub:2
//     }
// })

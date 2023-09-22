var audio = new Audio("./res/african-savanna.mp3");

// Added Locomotive scrolling for smooth scrolling
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
 locoScroll.stop();
 document.querySelector("#timer button").addEventListener("click", function () {
    locoScroll.start();
 })
}
loco()

//this function consists the button click animation and the timer animation 
function countdown() {
    var h1 = document.querySelector("#timer h1")
    var btn = document.querySelector("#timer button")
    var grow = 0


    //for the timer countdown
    var inte = setInterval(function () {
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

    // button click animation
    var leafs = document.querySelector(".leaf")
    btn.addEventListener("click", function () {
        audio.play();
        // locoScroll.start();
        document.querySelector("#content,#texture").style.borderRadius = "0"
        document.querySelector(".poster").style.display = "initial"
        gsap.to("#pg1-left-text", {
            display: "initial",
            opacity: 1,
            duration: 0.5,
            delay: .5
        })
        gsap.to(".sticker", {
            display: "initial",
            opacity: 1,
            duration: 0.5,
            delay: .5
        })
        gsap.to(leafs, {
            rotate: "-5deg",
            duration: 0.8

        })
        gsap.from(".poster", {
            opacity: 0,
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

        gsap.to("#content", {
            scale: 1,
            duration: 0.5
        })
        gsap.to("#timer", {
            opacity: 0
        });

    })
}
countdown()


// this is for page3 when the scroller reaches to page 3 the logo color will be black
gsap.to(".logo,#nav-part2>h4", {
    fill: "#000",
    scrollTrigger: {
        trigger: "#page3-part1",
        scroller: "#main",
        start: "top 10%",
        scrub: .1,
        end: "top 0%"
    }
})
gsap.to("#nav-part2>h4", {
    fill: "#000",
    scrollTrigger: {
        trigger: "#page3-part1",
        scroller: "#main",
        start: "top 10%",
        scrub: .1,
        end: "top 0%"
    }
})

// // This is for video animation of page2
gsap.to("#page2 video", {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
    opacity: 1,
    scrollTrigger: {
        trigger: "video",
        scroller: "#main",
        start: "top 80%",
        scrub: .1,
        end: "top 65%"
    }
})

// // color animation of text in page3
function textAnimation() {
    var clutter = ""
    var h1Text = document.querySelector("#page3-part1 h1").textContent
    var splitedText = h1Text.split("")
    splitedText.forEach(function (elem) {
        clutter += `<span>${elem}</span>`
    })
    document.querySelector("#page3-part1 h1").innerHTML = clutter

    var tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#page3",
            scroller: "#main",
            start: "top 0%",
            end: "top -400%",
            pin: true,
            scrub: .2,
            markers: true
        }
    })
    tl.to("#page3-part1 h1 span", {
        color: "#000",
        stagger: 0.1,
    })
    tl.to("#page3-part1", {
        transform: "translateX(-100vw)",
        duration: 10
    }, "anim1")
    tl.to("#page3-part2", {
        transform: "translateX(-100vw)",
        duration: 10
    }, "anim1")
}
textAnimation()


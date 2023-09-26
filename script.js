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


    gsap.set("body,#main", {
        overflowY: "hidden",
        overflowX: "hidden"
    })

    locoScroll.stop();
    document.querySelector("#timer button").addEventListener("click", function () {
        locoScroll.start();

    })
}
loco();

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
        gsap.to("#main", {
            overflowY: "auto"
        })
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
        gsap.to("#texturemain", {
            scale: 1,
            duration: 0.5
        })
        gsap.to("#timer", {
            opacity: 0
        });

    })
}
countdown();

function navAnimations() {
    // this is for page3 when the scroller reaches to page 3 the logo color will be black
    var navtl = gsap.timeline({
        scrollTrigger: {
            trigger: "#page3-part1",
            scroller: "#main",
            start: "top 10%",
            scrub: .1,
            end: "top 0%"
        }
    })
    navtl.to(".logo,svg", {
        fill: "#000",
        color: '#000'
    }, "nav")
    navtl.to("#nav-part2>h4", {
        color: '#000'
    })
    navtl.to(".bars", {
        backgroundColor: "#000"
    })
    navtl.to("#nav-part2>h4", {
        fill: "#000"
    })
    var nav2tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#page4",
            scroller: "#main",
            start: "top -350%",
            scrub: .1,
            end: "top -400%"
        }
    })
    nav2tl.to(".logo,svg", {
        fill: "#fff",
        color: '#fff'
    }, "nav2")
    nav2tl.to("#nav-part2>h4", {
        color: '#fff'
    }, "nav2")
    nav2tl.to(".bars", {
        backgroundColor: "#fff"
    }, "nav2")
    nav2tl.to("#nav-part2>h4", {
        fill: "#fff"
    }, "nav2")

    var bars = document.querySelectorAll(".bars");
    var musicbar = document.querySelector("#music-bar");
    var grownav = 0;
    var navint = setInterval(function () {
        if (grownav < 120) {
            grownav += Math.floor(Math.random() * 7);
            gsap.to(".bars", {
                height: grownav + `%`,
                stagger: 1
            });
        } else {
            grownav = 0;
        }
    }, 40);

    musicbar.addEventListener("click", function () {
        if (grownav !== 120) {
            audio.pause();
            clearInterval(navint);
            grownav = 0;
            gsap.to(".bars", {
                height: `50%`,
                stagger: 1
            });
            console.log("clicked");
            console.log(grownav);
        } else {
            grownav = 0;
            // audio.play();

        }
    });


}
navAnimations();
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
    tl.to("#scroller", {
        transform: "translateX(-70%)",
        duration: 30,
    }, "anim1")
}
textAnimation();

function page3ImageAnimation() {
    var tlscroll = gsap.timeline({
        scrollTrigger: {
            trigger: "#scroller",
            scroller: "#main",
            start: "top -240%",
            end: "top -250%",
            // pin: true,
            scrub: .5,
            markers: true
        }
    })
    tlscroll
}
// page3ImageAnimation()
var page4txt = document.querySelectorAll(".pg4txt h1");
page4txt.forEach(function (elem) {
    gsap.set(".pg4txt h1", {
        y: 80
    })
    gsap.to(elem, {
        y: 0,
        rotate: `0deg`,
        stagger: 1,
        opacity: 1,
        scrollTrigger: {
            trigger: "#page4",
            scroller: "#main",
            start: "top 20%",
            end: "top 0%",
            // pin: true,
            scrub: .2,
            markers: true
        }
    })

});

function page5Animation() {

    var tl3 = gsap.timeline({
        scrollTrigger: {
            trigger: "#page5",
            scroller: "#main",
            start: "top 0",
            end: "top -200%",
            scrub: true,
            pin: true
        }
    })
    gsap.set("#elem1 p",{
        opacity:1

    })
    gsap.set("#elem1",{
        opacity:1

    })

    tl3.to("#page5 img", {
        y: 200,
        duration:5
    })
        .to("#page5 #elem1", {
            opacity: 0.5
        }, "lol")
        .to("#page5 #elem1 p", {
            opacity: 0
        }, "lol")
        .to("#page5 #elem2", {
            opacity: 1
        }, "lol")
        .to("#page5 #elem2 p", {
            opacity: 1
        }, "lol")
        .to("#page5 img", {
            y: 440,
            duration:5
        })
        .to("#elem2", {
            opacity: 0.5
        })
        .to("#elem2 p", {
            opacity: 0
        })
        .to("#elem3", {
            opacity: 1
        })
        .to("#elem3 p", {
            opacity: 1
        })

};
page5Animation();
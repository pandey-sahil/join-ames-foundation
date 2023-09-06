var h1 = document.querySelector("#timer h1")
var btn = document.querySelector("#timer button")

function countdown() {
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
}
countdown()

var leafs = document.querySelector("#page1 .leaf")
btn.addEventListener("click", function(){
    document.querySelector("#page1").style.borderRadius = "0"
    document.querySelector(".poster").style.display = "initial"
    gsap.to("#page1",{
        scale:1,
        duration:0.5
    })
    gsap.to("#timer",{
        opacity:0
    });
    gsap.to(leafs,{
        rotate:"-5deg",
        duration:0.8

    })
    gsap.from(".poster",{
        rotate:"-5deg",
        height:0,
        duration:0.8
    })
})



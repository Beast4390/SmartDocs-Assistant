// Navbar shadow on scroll

window.addEventListener("scroll",function(){

const nav=document.querySelector(".navbar");

if(window.scrollY>30){

nav.classList.add("shadow");

}

else{

nav.classList.remove("shadow");

}

});

// Simple fade animation

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

});

document.querySelectorAll(".feature-card,.step-box").forEach(el=>{

el.classList.add("hidden");

observer.observe(el);

});
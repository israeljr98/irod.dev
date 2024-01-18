

document.addEventListener("DOMContentLoaded", function () {
    var fadeElements = document.querySelectorAll('.fade-in');
  
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.4 });
  
    var projectsObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
  
    fadeElements.forEach(function (element) {
        if (element.closest('#project-wrapper')) {
            projectsObserver.observe(element);
        } else {
            observer.observe(element);
        }
    });
  
    
  });
  
  function toggleNav() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }
  
  var links = document.querySelectorAll(".topnav a:not(.icon)");
  links.forEach(function(link) {
    link.addEventListener("click", function() {
      var x = document.getElementById("myLinks");
      x.style.display = "none";
    });
  });
  
  const introWrapper = document.getElementById('intro-wrapper');
  const desktopNav = document.querySelector('header');
  const mobileNav = document.querySelector('.topnav');
  
  // Check if the user has scrolled past the first section
  function handleScroll() {
    const scrolledPastHome = window.scrollY > introWrapper.offsetHeight;
  
    if (scrolledPastHome) {
      desktopNav.classList.add('scrolled');
      mobileNav.classList.add('scrolled');
    } else {
      desktopNav.classList.remove('scrolled');
      mobileNav.classList.remove('scrolled');
    }
  }
 
  document.addEventListener('scroll', handleScroll);
  
  
  handleScroll();
  
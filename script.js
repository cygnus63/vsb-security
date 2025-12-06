document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Active Table of Contents Highlighter (Intersection Observer)
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px', // Trigger roughly in the middle of screen
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove active class from all links
        document.querySelectorAll('.toc a').forEach(link => {
          link.classList.remove('active');
        });
        
        // Add active class to corresponding link
        const id = entry.target.getAttribute('id');
        const activeLink = document.querySelector(`.toc a[href="#${id}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }, observerOptions);

  // Track all sections
  document.querySelectorAll('section[id]').forEach((section) => {
    observer.observe(section);
  });

  // 2. Smooth Scrolling for Internal Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for sticky header/breathing room
          behavior: 'smooth'
        });
        
        // Update URL hash without jumping
        history.pushState(null, null, targetId);
      }
    });
  });

  // 3. Scroll to Top Button
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  
  if (scrollTopBtn) {
    window.addEventListener('scroll', function() {
      if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollTopBtn.style.display = "flex";
      } else {
        scrollTopBtn.style.display = "none";
      }
    });

    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});
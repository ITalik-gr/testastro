
document.addEventListener('astro:page-load', () => {
  // Get all elements to be animated
  const animatedElements = document.querySelectorAll('.scroll-animation');

  // Create a new IntersectionObserver and pass the callback function
  const observer = new IntersectionObserver(handleIntersection, {
    root: null, // Use the entire viewport for observation
    rootMargin: '-15px', // Margin around the viewport
    threshold: 0.1 // Triggers when the element becomes visible by at least 0.1
  });

  // Register all elements for observation
  animatedElements.forEach(element => {
    observer.observe(element);
  });

  // Callback function triggered on intersection change
  function handleIntersection(entries, observer) {
    entries.forEach(entry => {
      const scrollClass = 'scroll-show';

      if (entry.isIntersecting && !entry.target.classList.contains(scrollClass)) {
        // Add the class only if the element becomes visible and the class is not added yet
        entry.target.classList.add(scrollClass);
      }
    });
  }
});

document.addEventListener('astro:page-load', () => { 
// The function to be called when changing the visibility of an element
function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Get the path from the child element .decorate-line
      const path = entry.target.querySelector('path');

      //Get the length of the path and set the --line-length property
      const length = path.getTotalLength();
      document.documentElement.style.setProperty('--line-length', length);

      // Add the animate class to run the animation
      path.classList.add('animate');
    }
  });
}

// Create a new IntersectionObserver and pass a callback function
const observer = new IntersectionObserver(handleIntersection, {
  root: null, // Use the entire viewport for observation
  rootMargin: '0px', // Margin around viewport
  threshold: 0.5 // Threshold value when the script should react (0.5 means that half of the element should be visible)
});

// We get all the .decorate-line to observe
const decorateLines = document.querySelectorAll('.decorate-line');
decorateLines.forEach(line => {
  observer.observe(line);
});
})
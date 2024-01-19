
document.addEventListener('astro:page-load', () => {
  // Selecting all elements with the class 'slider'
  const sliders = document.querySelectorAll('.slider');

  sliders.forEach((slider) => {
    // Getting necessary elements within the slider
    const sliderParent = slider?.parentElement;
    const sliderItems = slider.querySelectorAll('.slider-item');
    const nextArrow = sliderParent?.querySelector('.arrow-next');
    const prevArrow = sliderParent?.querySelector('.arrow-prev');
    const pagination = sliderParent?.querySelector('.slider-pagination');
    const container = sliderParent?.querySelector('.container');

    // Adding the 'active-slider' class to the slider
    slider.classList.add('active-slider');

    // Width of one slide
    let currX = sliderItems[0].clientWidth;

    window.addEventListener('resize', () => {
      currX = sliderItems[0].clientWidth;
    })
    
    // Current slider position
    let currrentSlider = 1;
    // Total number of slides
    let totalSlides = sliderItems.length;

    // Aligning to the left within the container
    if (slider.getAttribute('data-aligh-left') == 'true') {
      // Get container dimensions and position
      const rect = container?.getBoundingClientRect();
      const distanceToLeft = window.innerWidth <= 480 ? rect.left + window.pageXOffset + 20 : rect.left + window.pageXOffset + 20;

      // Set left padding for slider
      if (distanceToLeft !== 0) {
        slider.style.setProperty('padding-left', `${distanceToLeft}px`, 'important');
      }
    }

    const updateActiveDot = () => {
      // Updating the active dot in the pagination
      if (pagination) {
        pagination.querySelectorAll('.slider-dot').forEach((dot) => {
          if (dot.getAttribute('dot-index') == currrentSlider) {
            dot.classList.add('slider-dot-active');
          } else {
            dot.classList.remove('slider-dot-active');
          }
        });
      }
    };

    const updateCurrentSlide = (type) => {
      // Updating the current slide based on 'next' or 'prev'
      if (type == 'next') {
        currrentSlider += 1;
      } else if (type == 'prev') {
        currrentSlider -= 1;
      }

      // Ensuring the current slide is within bounds
      if (currrentSlider < 1) {
        currrentSlider = 1;
      } else if (currrentSlider > totalSlides) {
        currrentSlider = totalSlides;
      }
    };

    // Creating dots for pagination if it exists
    if (pagination) {
      sliderItems.forEach((item, i) => {
        let dot = document.createElement('div');
        dot.classList.add('slider-dot');
        dot.setAttribute('dot-index', i + 1);
        pagination.appendChild(dot);
      });

      // Updating the active dot initially
      updateActiveDot();
    }

    // Setting the active slide and dot, if pagination exists
    const moveNext = () => {
      slider.scrollTo({
        left: slider.scrollLeft + currX,
        behavior: 'smooth'
      });

      // Updating current slide and active dot
      updateCurrentSlide('next');
      updateActiveDot();
    };

    const movePrev = () => {
      slider.scrollTo({
        left: slider.scrollLeft - currX,
        behavior: 'smooth'
      });

      // Updating current slide and active dot
      updateCurrentSlide('prev');
      updateActiveDot();
    };

    // Adding click event listeners for arrows
    nextArrow?.addEventListener('click', moveNext);
    prevArrow?.addEventListener('click', movePrev);

    // Adding swipe animation functionality
    let isDown = false;
    let startX = 0;
    let dist;
    let x = 0;
    let isMove = false;

    const start = (e) => {
      e.preventDefault();
      isDown = true;
      startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    };

    const move = (e) => {
      e.preventDefault();
      if (!isDown) return;
      isMove = true
      // Getting the current position on mousemove or touchmove
      x = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
      dist = (startX - x);
    };

    const end = (e) => {
      e.preventDefault();
      isDown = false;
      if(isMove) {
        if (dist < 0) {
          movePrev();
        }  else {
          moveNext();
        }
      } else {
        // Use e.target to get the element on which the event occurred
        const clickedElement = e.target;
    
        // Function to get a link from the current element or its parents
        const getLinkFromElement = (element) => {
          const link = element.getAttribute('href');
          if (link) {
            return link;
          } else if (element.parentElement) {
            return getLinkFromElement(element.parentElement);
          } else {
            return null;
          }
        };
    
        const link = getLinkFromElement(clickedElement);
    
        // If there is a link, follow it
        if (link) {
          window.location.href = link;
        } else {
          console.log("No link found");
        }
      }

      isMove = false
      // Checking the direction of swipe and moving accordingly

    };

    // Adding event listeners for swipe animation
    (() => {
      slider.addEventListener('mousedown', start);
      slider.addEventListener('touchstart', start);

      slider.addEventListener('mousemove', move);
      slider.addEventListener('touchmove', move);

      slider.addEventListener('mouseup', end);
      slider.addEventListener('touchend', end);
    })();
  });
});

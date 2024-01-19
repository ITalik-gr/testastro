document.addEventListener('astro:page-load', () => {
  // Selecting the element with the class 'text-animation'
  const text = document.querySelector('.text-animation');

  // Checking if the window width is greater than or equal to 768 pixels and if the 'text' element exists
  if (window.innerWidth >= 768 && text) {
    // Storing the original text content
    const strText = text.textContent;
    // Clearing the text content
    text.textContent = "";
    // Splitting the text by spaces
    const splitText = strText.split(/\s+/);

    // Iterating through each word in the split text
    splitText.forEach((word, wordIndex, array) => {
      // Creating a container for each word
      const wordContainer = document.createElement('span');
      wordContainer.classList.add('word');

      // Iterating through each character in the word
      [...word].forEach((char, charIndex) => {
        // Creating a container for each character
        const charContainer = document.createElement('span');
        charContainer.classList.add('letter');
        // Using a non-breaking space for empty spaces
        charContainer.textContent = char.trim() === '' ? '\u00A0' : char;
        // Adding the character and word indices as data attributes
        charContainer.dataset.charIndex = charIndex;
        charContainer.dataset.wordIndex = wordIndex;
        // Appending the character container to the word container
        wordContainer.appendChild(charContainer);
      });

      // Appending the word container to the 'text' element

      text.appendChild(wordContainer);

      // Adding a space between words if it's not the last word
      if (wordIndex < array.length - 1) {
        const spaceContainer = document.createElement('span');
        spaceContainer.textContent = '\u00A0'; // Non-breaking space
        text.appendChild(spaceContainer);
      }
    });

    // Delay before starting the animation
    setTimeout(() => {
      let char = 0;
      let timer = setInterval(onTick, 27);
      text.classList.remove('opacity-0');

      function onTick() {
        const letters = text.querySelectorAll('.letter');
        if (char < letters.length) {
          letters[char].classList.add('fade');
          char++;
        } else {
          complete();
        }
      }

      function complete() {
        clearInterval(timer);
        timer = null;
      }
    }, 10);
  }
});

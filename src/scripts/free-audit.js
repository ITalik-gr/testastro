document.addEventListener('astro:page-load', () => {

    // Selecting form, submit button, and inputs
    const form = document.querySelector('.audit-form'),
        submit = document.querySelector('.submit-btn'),
        inputs = form?.querySelectorAll('input');

    // Checking if the form exists
    if (form) {
        // Adding click event listener to submit button
        submit.addEventListener('click', (e) => {
            e.preventDefault(); // Preventing the default form submission

            let isValid = true; // Flag to track form validation
            let data = {
                name: "",
                email: "",
                website: "",
                phone: "",
            }

            // Iterating through each input field
            inputs.forEach((input) => {
                const parent = input.parentElement;
                const inputType = input.getAttribute("name");
                let value = input.value;

                // Validating name input
                if (inputType === "name") {
                    if (value.length < 3) {
                        parent.classList.add('!border-error-400');
                        isValid = false;
                    } else {
                        parent.classList.remove('!border-error-400');
                        data.name = value;
                    }
                }
                // Validating email input
                else if (inputType === "email") {
                    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                        parent.classList.add('!border-error-400');
                        isValid = false;
                    } else {
                        parent.classList.remove('!border-error-400');
                        data.email = value;
                    }
                }
                // Validating website input
                else if (inputType === "website") {
                    try {
                        new URL(value);
                    } catch (err) {
                        parent.classList.add('!border-error-400');
                        isValid = false;
                        return;
                    }
                    parent.classList.remove('!border-error-400');
                    data.website = value;
                }
                // Validating phone input
                else if (inputType === "phone") {
                    if (!(/^[0-9]{10}$/).test(value)) {
                        parent.classList.add('!border-error-400');
                        isValid = false;
                    } else {
                        parent.classList.remove('!border-error-400');
                        data.phone = value;
                    }
                }
            });

            // Checking overall form validity
            if (isValid) {
                // Logging the form data if valid
                console.log(data);
            } else {
                // Logging an error if the form is not valid
                console.log('error');
            }
        });
    }
});

// 1. Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 2. Form Validation
const form = document.querySelector('form');
form.addEventListener('submit', function (e) {
    let valid = true;

    // Check if the name input is filled out
    const nameInput = form.querySelector('input[type="text"]');
    if (nameInput.value.trim() === '') {
        valid = false;
        nameInput.style.borderColor = 'red';
    } else {
        nameInput.style.borderColor = '';
    }

    // Check if the email input is valid
    const emailInput = form.querySelector('input[type="email"]');
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(emailInput.value.trim())) {
        valid = false;
        emailInput.style.borderColor = 'red';
    } else {
        emailInput.style.borderColor = '';
    }

    // Check if the message textarea is filled out
    const messageInput = form.querySelector('textarea');
    if (messageInput.value.trim() === '') {
        valid = false;
        messageInput.style.borderColor = 'red';
    } else {
        messageInput.style.borderColor = '';
    }

    if (!valid) {
        e.preventDefault(); // Prevent form submission if validation fails
    }
});

// Initialize EmailJS
(function() {
    emailjs.init('jRoAT7_PKXpJpQAua'); // Replace with your EmailJS public key
})();

document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('user-name').value;
    const email = document.getElementById('user-email').value;
    const message = document.getElementById('user-message').value;

    const responseMessage = document.getElementById('form-response');

    // Use EmailJS to send the form data
    emailjs.send('service_aw312ca', 'template_bezuon8', {
        user_name: name,
        user_email: email,
        user_message: message
    }).then(() => {
        responseMessage.style.display = 'block';
        responseMessage.style.color = 'green';
        responseMessage.textContent = 'Your message has been sent successfully!';
        // Clear the form
        document.getElementById('contact-form').reset();
    }).catch((error) => {
        responseMessage.style.display = 'block';
        responseMessage.style.color = 'red';
        responseMessage.textContent = 'Failed to send the message. Please try again later.';
        console.error('EmailJS Error:', error);
    });
});

// 3. Skill Bar Animation on Scroll into View
const skillBars = document.querySelectorAll('.skill-bar');
const skillSection = document.getElementById('skills');

function animateSkillBars() {
    const sectionTop = skillSection.getBoundingClientRect().top;
    const sectionVisible = window.innerHeight - sectionTop;

    if (sectionVisible > 0) {
        skillBars.forEach(bar => {
            const skillLevel = bar.querySelector('.skill-level');
            const width = skillLevel.style.width; // Get the width value from inline style
            skillLevel.style.transition = 'width 2s ease-out'; // Add smooth transition
            skillLevel.style.width = width; // Set width as per inline style
        });
    }
}

window.addEventListener('scroll', animateSkillBars);
animateSkillBars(); // Run the function initially in case it's already visible on load

// 4. Scroll to Top Button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.classList.add('scroll-to-top');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';

document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Show/Hide the scroll to top button based on the scroll position
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

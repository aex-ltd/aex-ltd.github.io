// ===== slideshow ====
let slideIndex = 0;

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    if (slides.length === 0) {
        return; // Exit the function if no slides are found
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].style.opacity = 0;
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }
    slides[slideIndex - 1].style.display = "block";
    slides[slideIndex - 1].style.opacity = 1;
    setTimeout(showSlides, 2500); // Change image every 2.5 seconds
}

document.addEventListener('DOMContentLoaded', function() {
    showSlides();
});

// ======= slider container ======
document.addEventListener('DOMContentLoaded', function() {
    const sliderWrapper = document.getElementById('slider-wrapper');
    const leftButton = document.getElementById('left-button');
    const rightButton = document.getElementById('right-button');
    const sliderItems = document.querySelectorAll('.slider-item');
    
    if (!sliderWrapper || !leftButton || !rightButton || sliderItems.length === 0) {
        return; // Exit the function if essential elements are missing
    }

    const totalItems = sliderItems.length;
    let currentIndex = 0;
    
    // Variables to handle swipe gestures
    let startX, endX;

    function cloneItems() {
        sliderItems.forEach(item => {
            const clone = item.cloneNode(true);
            sliderWrapper.appendChild(clone);
        });
    }

    function updateSlider() {
        const sliderWidth = document.querySelector('.slider-item').offsetWidth + 10; // 10 is the margin
        const transformValue = -currentIndex * sliderWidth;
        sliderWrapper.style.transform = `translateX(${transformValue}px)`;
    }

    function moveLeft() {
        if (currentIndex === 0) {
            currentIndex = totalItems;
            sliderWrapper.style.transition = 'none';
            updateSlider();
            setTimeout(() => {
                sliderWrapper.style.transition = 'transform 0.3s ease-in-out';
                currentIndex--;
                updateSlider();
            }, 0);
        } else {
            currentIndex--;
            updateSlider();
        }
    }

    function moveRight() {
        if (currentIndex === totalItems * 2 - 1) {
            currentIndex = totalItems - 1;
            sliderWrapper.style.transition = 'none';
            updateSlider();
            setTimeout(() => {
                sliderWrapper.style.transition = 'transform 0.3s ease-in-out';
                currentIndex++;
                updateSlider();
            }, 0);
        } else {
            currentIndex++;
            updateSlider();
        }
    }

    function handleSwipe(startX, endX) {
        if (startX - endX > 50) {
            moveRight();
        } else if (endX - startX > 50) {
            moveLeft();
        }
    }

    leftButton.addEventListener('click', moveLeft);
    rightButton.addEventListener('click', moveRight);

    window.addEventListener('resize', updateSlider);

    // Touch event handlers
    sliderWrapper.addEventListener('touchstart', function(event) {
        startX = event.touches[0].clientX;
    });

    sliderWrapper.addEventListener('touchend', function(event) {
        endX = event.changedTouches[0].clientX;
        handleSwipe(startX, endX);
    });

    cloneItems();
    updateSlider();
});

// JavaScript to get the current year and set it in the span with id "currentYear"
document.addEventListener('DOMContentLoaded', function() {
    const currentYearSpan = document.getElementById("currentYear");
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});


// ================= accordion============
// document.querySelectorAll('.accordion-header').forEach(header => {
//     header.addEventListener('click', () => {
//         const accordionItem = header.parentElement;
//         const isActive = accordionItem.classList.contains('active');

//         // Close all accordion items
//         document.querySelectorAll('.accordion-item').forEach(item => {
//             item.classList.remove('active');
//         });

//         // Toggle the clicked accordion item
//         if (!isActive) {
//             accordionItem.classList.add('active');
//         }
//     });
// });

// document.addEventListener('DOMContentLoaded', () => {
//     // Function to handle accordion toggle
//     const handleAccordionToggle = (accordionSelector, contentSelector, arrowSelector) => {
//         document.querySelectorAll(accordionSelector).forEach(header => {
//             header.addEventListener('click', function() {
//                 const item = this.parentElement;
//                 const isActive = item.classList.contains('active');

//                 // Close all items
//                 document.querySelectorAll(accordionSelector).forEach(accordion => {
//                     accordion.parentElement.classList.remove('active');
//                 });
//                 document.querySelectorAll(arrowSelector).forEach(arrow => {
//                     arrow.style.transform = '';
//                 });

//                 // Toggle clicked item
//                 if (!isActive) {
//                     item.classList.add('active');
//                     this.querySelector(arrowSelector).style.transform = 'rotate(90deg)';
//                 }
//             });
//         });
//     };

//     // Initialize main accordions
//     handleAccordionToggle('.accordion-header', '.accordion-content', '.arrow');

//     // Initialize nested accordions within each accordion content
//     document.querySelectorAll('.accordion-content').forEach(content => {
//         handleAccordionToggle('.nested-accordion-header', '.nested-accordion-content', '.nested-arrow');
//     });
// });

document.addEventListener('DOMContentLoaded', () => {
    const initAccordions = () => {
        // Function to handle main accordion toggle
        document.querySelectorAll('.accordion-header').forEach(header => {
            header.addEventListener('click', function() {
                const item = this.closest('.accordion-item');
                const isActive = item.classList.contains('active');

                // Close all main accordions
                document.querySelectorAll('.accordion-item').forEach(accordion => {
                    accordion.classList.remove('active');
                    accordion.querySelector('.accordion-content').style.display = 'none';
                    accordion.querySelector('.arrow').style.transform = '';
                });

                // Toggle clicked accordion item
                if (!isActive) {
                    item.classList.add('active');
                    item.querySelector('.accordion-content').style.display = 'block';
                    item.querySelector('.arrow').style.transform = 'rotate(90deg)';
                }

                // Reinitialize nested accordions for the active main accordion
                initNestedAccordions(item);
            });
        });
    };

    const initNestedAccordions = (accordionItem) => {
        // Function to handle nested accordion toggle
        accordionItem.querySelectorAll('.nested-accordion-header').forEach(header => {
            header.addEventListener('click', function() {
                const item = this.closest('.nested-accordion-item');
                const isActive = item.classList.contains('active');

                // Close all nested accordions within the same main accordion
                item.parentElement.querySelectorAll('.nested-accordion-item').forEach(nestedAccordion => {
                    nestedAccordion.classList.remove('active');
                    nestedAccordion.querySelector('.nested-accordion-content').style.display = 'none';
                    nestedAccordion.querySelector('.nested-arrow').style.transform = '';
                });

                // Toggle clicked nested accordion item
                if (!isActive) {
                    item.classList.add('active');
                    item.querySelector('.nested-accordion-content').style.display = 'block';
                    item.querySelector('.nested-arrow').style.transform = 'rotate(90deg)';
                }
            });
        });
    };

    // Initialize all accordions on page load
    initAccordions();
});

    

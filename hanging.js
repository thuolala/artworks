// // Hanging pictures
// function connectDots() {
//     const containers = document.querySelectorAll('.social-container');
//     containers.forEach((container, index) => {
//         if (index < containers.length - 1) {
//             const nextContainer = containers[index + 1];

//             // Get positions
//             const startX = container.offsetLeft + container.offsetWidth / 2;
//             const startY = container.offsetTop;
//             const endX = nextContainer.offsetLeft + nextContainer.offsetWidth / 2;
//             const endY = nextContainer.offsetTop;

//             // Create line
//             const line = document.createElement('div');
//             line.classList.add('connecting-line');

//             // Calculate line style
//             const length = Math.hypot(endX - startX, endY - startY);
//             const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);

//             // Set position & transform
//             line.style.width = `${length}px`;
//             line.style.left = `${startX}px`;
//             line.style.top = `${startY}px`;
//             line.style.transform = `rotate(${angle}deg)`;

//             document.body.appendChild(line);
//         }
//     });
// }

// // Run function after page loads
// window.onload = connectDots;
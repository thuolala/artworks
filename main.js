function toggleMenu() {
    document.querySelector(".nav-links").classList.toggle("active");
}

function home() {
    window.location.href = ""; // Redirect to home page
}

// Show or hide the button when scrolling
window.addEventListener("scroll", function () {
    let btn = document.getElementById("backToTopBtn");
    if (window.scrollY > 300) { // Adjust this value as needed
        btn.style.display = "block";
    } else {
        btn.style.display = "none";
    }
});

// Smooth scroll to top
function backToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

$(document).ready(function () {
    $(".artworkDisplay").click(function () {
        let title = $(this).data("title");
        let folder = $(this).data("folder");
        let date = $(this).data("date");

        $("#artworkModalLabel").text(title); // Change modal title
        $("#artworkModalDate").text(date); // Change modal date

        // AJAX Request to Fetch Images from Folder
        // $.ajax({
        //     url: "index.php",
        //     method: "GET",
        //     data: { folder: folder }, // Send folder name to PHP
        //     success: function (response) {
        //         let images = JSON.parse(response);
        //         let container = $("#artworkImagesContainer");
        //         container.empty(); // Clear previous images

        //         if (images.length === 0) {
        //             container.append(`<p>No images found.</p>`);
        //         } else {
        //             images.forEach((imgSrc) => {
        //                 container.append(`<img src="${imgSrc}" class="img-fluid mb-3" style="width: 100%;">`);
        //             });
        //         }

        //         $("#artworkModal").modal("show"); // Show modal
        //     },
        //     error: function () {
        //         console.log("Error fetching images.");
        //     }
        // });

        fetch(`https://api.github.com/repos/thuolala/artworks/contents/${folder}?ref=master`)
            .then(response => response.json())
            .then(files => {
                let container = document.getElementById("artworkImagesContainer");
                container.innerHTML = "";

                files.forEach(file => {
                    if (file.name.match(/\.(jpg|jpeg|png)$/i)) { // Only images
                        let img = document.createElement("img");
                        img.src = file.download_url;
                        img.classList.add("img-fluid", "mb-3");
                        img.style.width = "100%";
                        container.appendChild(img);
                    }
                });
                $("#artworkModal").modal("show"); // Show modal
            })
            .catch(error => console.log("Error fetching images:", error));

    });

    // Close modal events
    $("#closeBtn, .close").click(function () {
        $("#artworkModal").modal("hide");
    });

    $(document).on("click", function (event) {
        if ($(event.target).hasClass("modal")) {
            $("#artworkModal").modal("hide");
        }
    });
});

function uploadArtwork() {
    $("#uploadModal").modal("show"); // Show modal

    document.getElementById("artworkTitle").value = "Unidentified";
    let today = new Date().toISOString().split('T')[0];
    document.getElementById("artworkDate").value = today;

    // Close modal events
    $("#closeBtn, .close").click(function () {
        $("#uploadModal").modal("hide");
    });

    $(document).on("click", function (event) {
        if ($(event.target).hasClass("modal")) {
            $("#uploadModal").modal("hide");
        }
    });
}

// Pagation for artworks
document.addEventListener("DOMContentLoaded", function () {
    const artworksPerPage = 6; // Number of artworks per page
    let currentPage = 1;
    const artworks = document.querySelectorAll(".artworkDisplay");
    const totalPages = Math.ceil(artworks.length / artworksPerPage);
    const pageNumbersContainer = document.getElementById("pageNumbers");

    function showPage(page) {
        // Hide all artworks
        artworks.forEach((artwork) => artwork.style.display = "none");

        // Show artworks for the current page
        let start = (page - 1) * artworksPerPage;
        let end = start + artworksPerPage;
        for (let i = start; i < end && i < artworks.length; i++) {
            artworks[i].style.display = "block";
        }

        // Update button states
        document.getElementById("prevPage").disabled = page === 1;
        document.getElementById("nextPage").disabled = page === totalPages;

        // Update page numbers
        updatePageNumbers();
    }

    function updatePageNumbers() {
        pageNumbersContainer.innerHTML = "";
        let maxPagesToShow = 5; // Show 5 numbers at a time

        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (endPage - startPage < maxPagesToShow - 1) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        if (startPage > 1) {
            addPageButton(1);
            if (startPage > 2) addEllipsis();
        }

        for (let i = startPage; i <= endPage; i++) {
            addPageButton(i);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) addEllipsis();
            addPageButton(totalPages);
        }
    }

    function addPageButton(page) {
        let pageBtn = document.createElement("button");
        pageBtn.textContent = page;
        pageBtn.classList.add("page-number");
        if (page === currentPage) pageBtn.classList.add("active");
        pageBtn.addEventListener("click", function () {
            currentPage = page;
            showPage(currentPage);
        });
        pageNumbersContainer.appendChild(pageBtn);
    }

    function addEllipsis() {
        let ellipsis = document.createElement("span");
        ellipsis.textContent = "...";
        ellipsis.classList.add("ellipsis");
        pageNumbersContainer.appendChild(ellipsis);
    }

    // Prev/Next buttons
    document.getElementById("prevPage").addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });

    document.getElementById("nextPage").addEventListener("click", function () {
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
    });

    // Initialize first page
    showPage(currentPage);
});

// Color scheme toggle
const colorToggle = document.getElementById("colorToggle");
const colorPicker = document.querySelector(".color-picker");
const colorCircles = document.querySelectorAll(".color-circle");

// Toggle the dropdown on click
colorToggle.addEventListener("click", () => {
    colorPicker.classList.toggle("active");
});

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
    if (!colorPicker.contains(e.target)) {
        colorPicker.classList.remove("active");
    }
});

// Change theme color on click
// colorCircles.forEach(circle => {
//     circle.addEventListener("click", (e) => {
//         const newColor = e.target.getAttribute("data-color");

//         // Apply color to root CSS variable
//         document.documentElement.style.setProperty("--accent-color", newColor);

//         // Save the selected color in localStorage
//         localStorage.setItem("selectedColor", newColor);
//     });
// });

// Function to set and save the color
function setColor(color) {
    document.documentElement.style.setProperty("--accent-color", color);
    localStorage.setItem("selectedColor", color);
}

// Apply saved color on page load
window.addEventListener("DOMContentLoaded", function () {
    const savedColor = localStorage.getItem("selectedColor");
    if (savedColor) {
        document.documentElement.style.setProperty("--accent-color", savedColor);
    }
});



document.addEventListener("DOMContentLoaded", function () {
    const movableImage = document.getElementById("movable-image");
    const xPositionDisplay = document.getElementById("x-position");
    const yPositionDisplay = document.getElementById("y-position");
    const widthDisplay = document.getElementById("width");
    const heightDisplay = document.getElementById("height");
    const imageUrlDisplay = document.getElementById("image-url");
    const infoContainer = document.getElementById("info-container");
    const showCommand = document.getElementById("show-command");
    const timeDisplay = document.getElementById("time-onscreen");

    let isDragging = false;
    let offsetX, offsetY;

    // Declare variables to store width, height, and half values
    let imageWidth, imageHeight, halfWidth, halfHeight, widthPercent, heightPercent;

    function updatePositionDisplays(x, y, movableImage, imageWidth, timeDisplay) {
        xPositionDisplay.textContent = `${x - halfWidth}`;
        yPositionDisplay.textContent = `${y - halfHeight}`;
        timeIs = timeDisplay.value;
        showCommand.textContent = `!show ${movableImage} ezsend ${timeIs} ${imageWidth} ${Math.round(x - halfWidth)} ${Math.round(y - halfHeight)}`;

    }

    function updateSizeDisplays(width, height) {
        widthDisplay.textContent = `${width}`;
        heightDisplay.textContent = `${height}`;

        // Update variables with width and height

        imageWidth = width;
        imageHeight = height;
        halfWidth = width / 2;
        halfHeight = height / 2;
    }

    function resizeImage(newWidth, newHeight) {
        movableImage.style.width = `${newWidth}px`;
        movableImage.style.height = "auto";
        heightDisplay.textContent = "Height: Auto";
        widthDisplay.textContent = `${newWidth}`;
}

    movableImage.addEventListener("mousedown", function (e) {
        e.preventDefault(); // Prevent default behavior of dragging images
        isDragging = true;
        const rect = movableImage.getBoundingClientRect();
        offsetX = e.clientX - rect.left - halfWidth;
        offsetY = e.clientY - rect.top - halfHeight;
        movableImage.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", function (e) {
        if (isDragging) {
            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;
            xPositionDisplay.textContent = `${x - halfWidth}`;
            yPositionDisplay.textContent = `${y - halfHeight}`;
            movableImage.style.left = `${x}px`;
            movableImage.style.top = `${y}px`;
            //showCommand.textContent = `!show ${movableImage} custom ${widthDisplay} ${x} ${y}`;
            timeDisplay;
            widthDisplay;
            updatePositionDisplays(x, y, movableImage.src, widthDisplay.textContent, timeDisplay);

            // Update info container position
            infoContainer.style.left = `${movableImage.offsetLeft}px`;
            infoContainer.style.top = `${movableImage.offsetTop}px`;


            //movableImage,xPositionDisplay,yPositionDisplay,widthDisplay,heightDisplay,imageUrlDisplay,infoContainer,showCommand







        }
    });

    document.addEventListener("mouseup", function () {
        if (isDragging) {
            isDragging = false;
            movableImage.style.cursor = "grab";
        }
    });

    movableImage.addEventListener("load", function () {
        updateSizeDisplays(movableImage.width, movableImage.height);
    });

    // Prompt for a new image URL
    document.getElementById("change-image").addEventListener("click", function () {
        const newImageUrl = prompt("Enter the URL of the new image:");
        if (newImageUrl) {
            movableImage.src = newImageUrl;
            imageUrlDisplay.textContent = `Image URL: ${newImageUrl}`;
        }
    });

    // Resize functionality
    document.getElementById("resize-image").addEventListener("click", function () {
        const newWidth = parseInt(document.getElementById("resize-width").value, 10);
        const newHeight = "auto";

        if (!isNaN(newWidth) && newWidth > 0) {
            resizeImage(newWidth, newHeight);
        } else {
            alert("Please enter valid width value.");
        }
    });



});

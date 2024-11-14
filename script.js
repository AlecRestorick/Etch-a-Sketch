// Get the container element
const container = document.querySelector('.container');

// Function to create the grid
function createGrid(gridSize) {
  // Clear the container
  container.innerHTML = '';

  // Set the container size
  container.style.width = '960px';
  container.style.height = '960px';

  // Create the grid cells
  for (let i = 0; i < gridSize * gridSize; i++) {
    // Create a new div element for each cell
    const gridDiv = document.createElement('div');

    // Add a class to the cell
    gridDiv.classList.add('grid-div');

    // Set the cell size based on the grid size
    gridDiv.style.width = `${960 / gridSize}px`;
    gridDiv.style.height = `${960 / gridSize}px`;

    // Add the cell to the container
    container.appendChild(gridDiv);

    // Add a mouseover event listener to change the color
    gridDiv.addEventListener('mouseover', changeColor);
  }
}

// Function to change the color of a grid cell
function changeColor(e) {
  // Get the target cell
  const gridDiv = e.target;

  // If the cell doesn't have an initial color, assign a random one
  if (!gridDiv.dataset.initialColor) {
    const initialColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    gridDiv.dataset.initialColor = initialColor;
    gridDiv.style.backgroundColor = initialColor;
    gridDiv.style.opacity = 0.8; // Start with low opacity
    
  }
  // Otherwise, darken the color
  else {
    let rgb = gridDiv.dataset.initialColor.match(/\d+/g).map(Number);
    rgb = rgb.map(channel => Math.max(0, channel - 25));
    gridDiv.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    gridDiv.dataset.initialColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;

        // Increase the opacity by 10% on each hover
        let opacity = parseFloat(gridDiv.style.opacity) || 0.1;
        opacity += 0.05; // Increase by 0.1 (5%)
        if (opacity > 1) {
          opacity = 1; // Maximum opacity
        }
        gridDiv.style.opacity = opacity;
  }
}

// Create the initial grid
createGrid(16);

// Add a click event listener to the button to change the grid size
const button = document.querySelector('button');
button.addEventListener('click', () => {
  const gridSize = parseInt(prompt('Enter the number of squares per side (max 100):'));
  if (gridSize > 0 && gridSize <= 100) {
    createGrid(gridSize);
  } else {
    alert('Invalid grid size. Please enter a number between 1 and 100.');
  }
});
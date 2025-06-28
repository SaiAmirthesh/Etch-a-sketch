// Initialize variables
let currentSize = 16;
let isRainbowMode = false;
let isDarkeningMode = false;

// Initialize the grid
createGrid(currentSize);

// Button event listeners
document.getElementById('grid-size-btn').addEventListener('click', changeGridSize);
document.getElementById('color-mode-btn').addEventListener('click', toggleColorMode);
document.getElementById('clear-btn').addEventListener('click', clearGrid);

// Grid creation function
function createGrid(size) {
    const container = document.getElementById('container');
    container.innerHTML = '';
    
    // Calculate exact size accounting for container borders
    const containerSize = 800; // Matches CSS --container-size
    const totalGridLines = size - 1;
    const totalGridLineSpace = totalGridLines * 1; // 1px grid line per gap
    
    // Calculate perfect square size
    const squareSize = (containerSize - totalGridLineSpace) / size;
    
    // Create grid
    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('grid-square');
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        
        // Add hover effect
        square.addEventListener('mouseover', function() {
            if (isRainbowMode) {
                const r = Math.floor(Math.random() * 256);
                const g = Math.floor(Math.random() * 256);
                const b = Math.floor(Math.random() * 256);
                this.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
                this.style.boxShadow = `0 0 5px rgb(${r}, ${g}, ${b})`;
            } else {
                this.style.backgroundColor = '#0fa';
                this.style.boxShadow = '0 0 5px #0fa';
            }
            
            if (isDarkeningMode) {
                let opacity = parseFloat(this.style.opacity) || 0;
                this.style.opacity = Math.min(opacity + 0.1, 1);
            }
        });
        
        container.appendChild(square);
    }
}

// Square coloring function
function colorSquare(e) {
    if (isRainbowMode) {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        
        if (isDarkeningMode) {
            let opacity = parseFloat(this.style.opacity) || 0;
            opacity = Math.min(opacity + 0.1, 1);
            this.style.opacity = opacity;
        }
        
        this.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        this.style.boxShadow = `0 0 5px rgb(${r}, ${g}, ${b}), 0 0 10px rgb(${r}, ${g}, ${b})`;
    } else {
        this.style.backgroundColor = '#0fa';
        this.style.boxShadow = '0 0 5px #0fa, 0 0 10px #0fa';
    }
}

// Change grid size function
function changeGridSize() {
    let size = prompt('Enter number of squares per side (max 64):', currentSize);
    size = parseInt(size);
    
    if (size > 0 && size <= 64) {
        currentSize = size;
        createGrid(size);
    } else {
        alert('Please enter a number between 1 and 64');
    }
}

// Toggle color mode function
function toggleColorMode() {
    isRainbowMode = !isRainbowMode;
    this.textContent = isRainbowMode ? 'RAINBOW MODE' : 'SINGLE COLOR';
    this.style.backgroundColor = isRainbowMode ? '#ff00ff' : 'transparent';
    this.style.borderColor = isRainbowMode ? '#ff00ff' : '#fff';
}

// Clear grid function
function clearGrid() {
    const squares = document.querySelectorAll('.grid-square');
    squares.forEach(square => {
        square.style.backgroundColor = '';
        square.style.boxShadow = '';
        square.style.opacity = '';
    });
    
    // Add a quick flash effect
    const container = document.getElementById('container');
    container.style.boxShadow = '0 0 30px #fff';
    setTimeout(() => {
        container.style.boxShadow = '0 0 10px #0fa, 0 0 20px rgba(0, 255, 170, 0.5)';
    }, 200);
}
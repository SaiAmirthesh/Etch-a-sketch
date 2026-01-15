let currentSize = 16;
let isRainbowMode = false;
let isDarkeningMode = false;

createGrid(currentSize);

document.getElementById('grid-size-btn').addEventListener('click', changeGridSize);
document.getElementById('color-mode-btn').addEventListener('click', toggleColorMode);
document.getElementById('clear-btn').addEventListener('click', clearGrid);

function createGrid(size) {
    const container = document.getElementById('container');
    container.innerHTML = '';
    
    const containerSize = 800; 
    const totalGridLines = size - 1;
    const totalGridLineSpace = totalGridLines * 1;     
    const squareSize = (containerSize - totalGridLineSpace) / size;
    
    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('grid-square');
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;
        
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

function toggleColorMode() {
    isRainbowMode = !isRainbowMode;
    this.textContent = isRainbowMode ? 'RAINBOW MODE' : 'SINGLE COLOR';
    this.style.backgroundColor = isRainbowMode ? '#ff00ff' : 'transparent';
    this.style.borderColor = isRainbowMode ? '#ff00ff' : '#fff';
}

function clearGrid() {
    const squares = document.querySelectorAll('.grid-square');
    squares.forEach(square => {
        square.style.backgroundColor = '';
        square.style.boxShadow = '';
        square.style.opacity = '';
    });
    
    const container = document.getElementById('container');
    container.style.boxShadow = '0 0 30px #fff';
    setTimeout(() => {
        container.style.boxShadow = '0 0 10px #0fa, 0 0 20px rgba(0, 255, 170, 0.5)';
    }, 200);
}

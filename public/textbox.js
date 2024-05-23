const input1 = document.getElementById('input1');
const input2 = document.getElementById('input2');
const input3 = document.getElementById('input3');
const input4 = document.getElementById('input4');

const display1 = document.getElementById('display1');
const display2 = document.getElementById('display2');
const display3 = document.getElementById('display3');
const display4 = document.getElementById('display4');

let draggingElement;

display1.addEventListener('mousedown', startDrag);
display2.addEventListener('mousedown', startDrag);
display3.addEventListener('mousedown', startDrag);
display4.addEventListener('mousedown', startDrag);

function startDrag(event) {
    draggingElement = event.target;
    let initialX = event.clientX - draggingElement.getBoundingClientRect().left;
    let initialY = event.clientY - draggingElement.getBoundingClientRect().top;

    document.addEventListener('mousemove', moveElement);
    document.addEventListener('mouseup', function() {
        document.removeEventListener('mousemove', moveElement);
    });

    function moveElement(event) {
        let newX = event.clientX - initialX;
        let newY = event.clientY - initialY;

        draggingElement.style.left = newX + 'px';
        draggingElement.style.top = newY + 'px';
    }
}

input1.addEventListener('input', updateDisplay1);
input2.addEventListener('input', updateDisplay2);
input3.addEventListener('input', updateDisplay3);
input4.addEventListener('input', updateDisplay4);

function updateDisplay1() {
    display1.textContent = input1.value;
}

function updateDisplay2() {
    display2.textContent = input2.value;
}

function updateDisplay3() {
    display3.textContent = input3.value;
}

function updateDisplay4() {
    display4.textContent = input4.value;
}
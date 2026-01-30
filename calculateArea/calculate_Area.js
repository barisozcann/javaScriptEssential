function calculateArea() {
  const length = parseFloat(document.getElementById('length').value);
  const width = parseFloat(document.getElementById('width').value);

  // Validate inputs
  if (isNaN(length) || isNaN(width)) {
    document.getElementById('result').innerText =
      "Please enter valid numbers for both length and width.";
    return;
  }

  if (length <= 0 || width <= 0) {
    document.getElementById('result').innerText =
      "Length and width must be greater than 0.";
    return;
  }

  const area = length * width;

  document.getElementById('result').innerText =
    `The area of the rectangle is: ${area}`;
}

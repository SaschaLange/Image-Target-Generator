const colors = [
    {
      pickerInput: document.getElementById("color-1-picker-input"),
      textInput: document.getElementById("color-1-text-input"),
    },
    {
      pickerInput: document.getElementById("color-2-picker-input"),
      textInput: document.getElementById("color-2-text-input"),
    },
    {
      pickerInput: document.getElementById("color-3-picker-input"),
      textInput: document.getElementById("color-3-text-input"),
    },
  ];
  
  document.addEventListener("DOMContentLoaded", rerollColors);
  
  document.getElementById("rerollButton").addEventListener("click", rerollColors);
  
  colors.forEach((color) => {
    // Sync from text input to picker input
    color.textInput.addEventListener("input", () => {
      const value = color.textInput.value;
      if (/^#([0-9A-F]{6})$/i.test(value)) {
        console.log(value);
        color.pickerInput.value = value;
      }
    });
  
    // Sync from picker input to text input
    color.pickerInput.addEventListener("input", () => {
      color.textInput.value = color.pickerInput.value;
    });
  });
  
  function randomHexCode() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
  }
  
  function rerollColors() {
    colors.forEach((colorPair) => {
      const randomColor = randomHexCode();
      colorPair.pickerInput.value = randomColor;
      colorPair.textInput.value = randomColor;
    });
  }
  
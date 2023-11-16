// app.js
document.addEventListener('DOMContentLoaded', function() {
  fetch('/get-data')
      .then(response => response.json())
      .then(data => {
          const container = document.getElementById("json-editor");
          const options = {};
          const editor = new JSONEditor(container, options);

          // Set JSON data
          editor.set(data);
      })
      .catch(error => console.error('Error fetching JSON:', error));
});

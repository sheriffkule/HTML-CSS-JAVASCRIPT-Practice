document.addEventListener('DOMContentLoaded', function () {
  // Initialize editor
  const editor = ace.edit('editor');
  editor.setTheme('ace/theme/chrome');
  editor.session.setMode('ace/mode/html');
  editor.setFontSize(14);
  editor.setOptions({
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: true,
    showLineNumbers: true,
    showGutter: true,
    tabSize: 2,
    useSoftTabs: true,
  });

  // Default files content
  const files = {
    'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Project</title>
    <link rel="stylesheet" href="styles.css" />
</head>
<body>
    <h1>Hello, World!</h1>
    <p>Welcome to NeonCode editor.</p>
    <button id="demo-btn">Click Me</button>
    <script src="script.js"></script>
</body>
</html>`,
    'styles.css': `body {
    font-family: Arial, sans-serif;
    line-height: 1.5;
    margin: 0;
    padding: 20px;
    background-color: #f2f2f2;
    color: #333;        
}

h1 {
color: #6c4ce7;
}

button {
    background-color: #6c5ce7;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer:
    transition: background-color: 0.3s
}
        
button:hover {
    background-color: #5649c0;
}`,
    'script.js': `document.getElementById('demo-btn).addEventListener('click', function() {
    console.log('Button clicked!');
    alert('Hello from NeonCode!');        
});`,
  };

  // Current file management
  let currentFile = 'index.html';
  const fileList = document.getElementById('file-list');
  const fileTabs = document.getElementById('file-tabs');
  const consoleOutput = document.getElementById('console-output');
  const previewOutput = document.getElementById('preview-output');
  const cursorPosition = document.getElementById('cursor-position');
  const themeSwitch = document.getElementById('theme-switch');
  const currentTheme = document.getElementById('current-theme');

  // Initialize file list and tabs
  function initializeFiles() {
    // Clear existing items
    fileList.innerHTML = '';
    fileTabs.innerHTML = '';

    // Create file items and tabs
    Object.keys(files).forEach((fileName) => {
      createFileItem(fileName);
      createFileTab(fileName);
    });

    // Set active file
    setActiveFile(currentFile);
  }

  // Create file item in sidebar
  function createFileItem(fileName) {
    const fileItem = document.createElement('li')
    fileItem.className = 'file-item'
    fileItem.textContent = fileName
    fileItem.setAttribute('data-file', fileName)

    fileItem.addEventListener('click', () => {
        setActiveFile(fileName)
    })

    fileList.appendChild(fileItem)
  }
});

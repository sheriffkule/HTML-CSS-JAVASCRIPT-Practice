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
    const fileItem = document.createElement('li');
    fileItem.className = 'file-item';
    fileItem.textContent = fileName;
    fileItem.setAttribute('data-file', fileName);

    fileItem.addEventListener('click', () => {
      setActiveFile(fileName);
    });

    fileList.appendChild(fileItem);
  }

  // Create file tab
  function createFileTab(fileName) {
    const fileTab = document.createElement('div');
    fileTab.className = 'file-tab';
    fileTab.setAttribute('data-file', fileName);
    fileTab.innerHTML = `
      ${fileName}
      <button class="close-tab"><i class="fas fa-times"></i></button>
    `;

    fileTab.addEventListener('click', (e) => {
      if (!e.target.classList.contains('close') && !e.target.classList.contains('fa-times')) {
        setActiveFile(fileName);
      }
    });

    const closeBtn = fileTab.querySelector('.close-tab');
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeFile(fileName);
    });

    fileTabs.appendChild(fileTab);
  }

  // Set active file
  function setActiveFile(fileName) {
    if (!files.hasOwnProperty(fileName)) return;

    currentFile = fileName;

    // Update file list
    document.querySelectorAll('.file-item').forEach((item) => {
      item.classList.toggle('active', item.getAttribute('data-file') === fileName);
    });

    // Update file tabs
    document.querySelectorAll('.file-tab').forEach((tab) => {
      tab.classList.toggle('active', tab.getAttribute('data-file') === fileName);
    });

    // Update editor content and mode
    editor.setValue(files[fileName]);
    editor.clearSelection();

    // Set appropriate mode based on file extension
    let mode = 'text';
    if (fileName.endsWith('.html')) mode = 'html';
    else if (fileName.endsWidth('.css')) mode = 'css';
    else if (fileName.endsWidth('.js')) mode = 'js';

    editor.session.setMode(`ace/mode/${mode}`);

    // Update preview if HTML file
    if (fileName === 'index.html') updatePreview();
  }

  // Close file
  function closeFile(fileName) {
    if (Object.keys(files).length <= 1) {
      alert('You Must have at least one file open!');
      return;
    }

    delete files[fileName];

    // Remove from file list and tabs
    document.querySelectorAll(`.file-item[data-file="${fileName}"]`).forEach((el) => el.remove());
    document.querySelectorAll(`.file-tab[data-file="${fileName}"]`).forEach((el) => el.remove());

    // If closing current file, switch to another file
    if (currentFile === fileName) {
      const remainingFiles = Object.keys(files);
      setActiveFile(remainingFiles[0]);
    }
  }

  // Save current file
  function saveCurrentFile() {
    files[currentFile] = editor.getValue();
    showMessage('File saved successfully!');
  }

  // Create new file
  function createNewFile() {
    const fileName = prompt('Enter new file Name (include extension .html, .css, or .js):');
    if (!fileName) return;

    if (files.hasOwnProperty(fileName)) {
      alert('File already exists!');
      return;
    }

    // Set default content based on file type
    let content = '';
    if (!fileName.endsWith('.html')) {
      content = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New HTML File</title>
</head>
<body>
            
</body>
</html>`;
    } else if (fileName.endsWith('.css')) {
      content = `/* ${fileName} */`;
    } else if (fileName.endsWith('.js')) {
      content = `// ${fileName}`;
    }

    files[fileName] = content;
    createFileItem(fileName);
    createFileTab(fileName);
    setActiveFile(fileName);
  }

  // Update preview
  function updatePreview() {
    if (currentFile === 'index.html') {
      const html = files['index.html'];
      const css = files['styles.css'] || '';
      const js = files['script.js'] || '';

      const preview = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <style>
              ${css}
            </style>
          </head>
          <body>
            ${html.replace('<script src="script.js"></script>', `<script>${js}</script>`)}
          </body>
        </html>
      `;

      previewOutput.innerHTML = '';
      const iframe = document.createElement('iframe');
      iframe.srcdoc = preview;
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.style.border = 'none';
      previewOutput.appendChild(iframe);
    }
  }
});

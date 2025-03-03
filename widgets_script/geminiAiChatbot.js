const container = document.querySelector('.container');
const chatsContainer = document.querySelector('.chats-container');
const promptForm = document.querySelector('.prompt-form');
const promptInput = promptForm.querySelector('.prompt-input');
const fileInput = promptForm.querySelector('#file-input');
const fileUploadWrapper = promptForm.querySelector('.file-upload-wrapper');

const API_KEY = 'AIzaSyCH0EzBVFWPXV0GA6KCYudiXPOkMap3hr4';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const chatHistory = [];
const userData = { message: '', file: {} };

const createMsgElement = (content, ...classes) => {
  const div = document.createElement('div');
  div.classList.add('message', ...classes);
  div.innerHTML = content;
  return div;
};

const scrollToBottom = () =>
  container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });

const typingEffect = (text, textElement, botMsgDiv) => {
  textElement.textContent = '';
  const words = text.split(' ');
  let wordIndex = 0;

  const typingInterval = setInterval(() => {
    if (wordIndex < words.length) {
      textElement.textContent += (wordIndex === 0 ? '' : ' ') + words[wordIndex++];
      scrollToBottom();
    } else {
      botMsgDiv.classList.remove('loading');
      clearInterval(typingInterval);
    }
  }, 40);
};

const generateResponse = async (botMsgDiv) => {
  const textElement = botMsgDiv.querySelector('.message-text');

  chatHistory.push({
    role: 'user',
    parts: [
      { text: userData.message },
      ...(userData.file.data
        ? [{ inline_data: (({ fileName, isImage, ...rest }) => rest)(userData.file) }]
        : []),
    ],
  });

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: chatHistory }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error.message);

    const responseText = data.candidates[0].content.parts[0].text
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .trim();
    typingEffect(responseText, textElement, botMsgDiv);

    chatHistory.push({
      role: 'model',
      parts: [{ text: responseText }],
    });

    console.log(chatHistory);
  } catch (error) {
    console.log(error);
  }
};

const handleFormSubmit = (e) => {
  e.preventDefault();
  const userMessage = promptInput.value.trim();

  if (!userMessage) return;

  promptInput.value = '';
  userData.message = userMessage;

  const userMsgHTML = `<p class="message-text"></p>`;
  const userMsgDiv = createMsgElement(userMsgHTML, 'user-message');

  userMsgDiv.querySelector('.message-text').textContent = userMessage;
  chatsContainer.appendChild(userMsgDiv);
  scrollToBottom();

  setTimeout(() => {
    const botMsgHTML = `<img src="/icons/gemini-chatbot-logo.svg" alt="Gemini" class="avatar">
    <p class="message-text">just a sec...</p>`;
    const botMsgDiv = createMsgElement(botMsgHTML, 'bot-message', 'loading');
    chatsContainer.appendChild(botMsgDiv);
    scrollToBottom();
    generateResponse(botMsgDiv);
  }, 600);
};

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (!file) return;

  const isImage = file.type.startsWith('image/');
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = (e) => {
    fileInput.value = '';
    const base64String = e.target.result.split(',')[1];
    fileUploadWrapper.querySelector('.file-preview').src = e.target.result;
    fileUploadWrapper.classList.add('active', isImage ? 'img-attached' : 'file-attached');

    userData.file = {
      fileName: file.name,
      data: base64String,
      mime_type: file.type,
      isImage,
    };
  };
});

document.querySelector('#cancel-file-btn').addEventListener('click', () => {
  fileUploadWrapper.classList.remove('active', 'img-attached', 'file-attached');
});

promptForm.addEventListener('submit', handleFormSubmit);
promptForm
  .querySelector('#add-file-btn')
  .addEventListener('click', () => fileInput.click());

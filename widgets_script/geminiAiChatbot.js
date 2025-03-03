const chatsContainer = document.querySelector('.chats-container');
const promptForm = document.querySelector('.prompt-form');
const promptInput = promptForm.querySelector('.prompt-input');

const API_KEY = 'AIzaSyCH0EzBVFWPXV0GA6KCYudiXPOkMap3hr4';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

let userMessage = '';
const chatHistory = [];

const createMsgElement = (content, ...classes) => {
  const div = document.createElement('div');
  div.classList.add('message', ...classes);
  div.innerHTML = content;
  return div;
};

const generateResponse = async (botMsgHTML) => {
  const textElement = botMsgHTML.querySelector('.message-text');

  chatHistory.push({
    role: 'user',
    parts: [{ text: userMessage }],
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
      textElement.textContent = responseText;
  } catch (error) {
    console.log(error);
  }
};

const handleFormSubmit = (e) => {
  e.preventDefault();
  userMessage = promptInput.value.trim();

  if (!userMessage) return;

  promptInput.value = '';

  const userMsgHTML = `<p class="message-text"></p>`;
  const userMsgDiv = createMsgElement(userMsgHTML, 'user-message');

  userMsgDiv.querySelector('.message-text').textContent = userMessage;
  chatsContainer.appendChild(userMsgDiv);

  setTimeout(() => {
    const botMsgHTML = `<img src="/icons/gemini-chatbot-logo.svg" alt="Gemini" class="avatar">
    <p class="message-text">just a sec...</p>`;
    const botMsgDiv = createMsgElement(botMsgHTML, 'bot-message', 'loading');
    chatsContainer.appendChild(botMsgDiv);
    generateResponse(botMsgDiv);
  }, 500);
};

promptForm.addEventListener('submit', handleFormSubmit);

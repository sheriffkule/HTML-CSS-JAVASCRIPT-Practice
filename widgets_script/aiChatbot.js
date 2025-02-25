const chatBody = document.querySelector('.chat-body');
const messageInput = document.querySelector('.message-input');
const sendMessageButton = document.getElementById('send-message');
const fileInput = document.getElementById('file-input');
const fileUploadWrapper = document.querySelector('.file-upload-wrapper');
const fileCancelButton = document.getElementById('file-cancel');
const chatbotToggler = document.getElementById('chatbot-toggler');
const closeChatbot = document.getElementById('close-chatbot');

const API_KEY = 'AIzaSyCH0EzBVFWPXV0GA6KCYudiXPOkMap3hr4';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const userData = {
  message: null,
  file: {
    data: null,
    mime_type: null,
  },
};

const chatHistory = [];
const initialInputHeight = messageInput.scrollHeight;

const createMessageElement = (content, ...classes) => {
  const div = document.createElement('div');
  div.classList.add('message', ...classes);
  div.innerHTML = content;
  return div;
};

const generateBotResponse = async (incomingMessageDiv) => {
  const messageElement = incomingMessageDiv.querySelector('.message-text');
  chatHistory.push({
    role: 'user',
    parts: [
      { text: userData.message },
      ...(userData.file.data ? [{ inline_data: userData.file }] : []),
    ],
  });

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: chatHistory,
    }),
  };

  try {
    const response = await fetch(API_URL, requestOptions);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error.message);

    const apiResponseText = data.candidates[0].content.parts[0].text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .trim();
    messageElement.innerText = apiResponseText;

    chatHistory.push({
        role: 'model',
        parts: [
          { text: apiResponseText }],
      });
  } catch (error) {
    console.log(error);
    messageElement.innerText = error.message;
    messageElement.style.color = '#ff0000';
  } finally {
    userData.file = {};
    incomingMessageDiv.classList.remove('thinking');
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });
  }
};

const handleOutgoingMessage = (e) => {
  e.preventDefault();
  userData.message = messageInput.value.trim();
  messageInput.value = '';
  fileUploadWrapper.classList.remove('file-upload');
  messageInput.dispatchEvent(new Event('input'));

  const messageContent = `<div class="message-text"></div>
  ${
    userData.file.data
      ? `<img src="data:${userData.file.mime_type};base64,${userData.file.data}" class="attachment" />`
      : ''
  }`;

  const outgoingMessageDiv = createMessageElement(messageContent, 'user-message');
  outgoingMessageDiv.querySelector('.message-text').innerText = userData.message;
  chatBody.appendChild(outgoingMessageDiv);
  chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });

  setTimeout(() => {
    const messageContent = `<div class="message bot-message thinking">
          <svg class="bot-avatar"
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 1024 1024"
          >
            <path
              d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"
            ></path>
          </svg>
          <div class="message-text">
            <div class="thinking-indicator">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
          </div>
        </div>`;

    const incomingMessageDiv = createMessageElement(
      messageContent,
      'bot-message',
      'thinking'
    );
    chatBody.appendChild(incomingMessageDiv);
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });
    generateBotResponse(incomingMessageDiv);
  }, 600);
};

messageInput.addEventListener('keydown', (e) => {
  const userMessage = e.target.value.trim();

  if (e.key === 'Enter' && userMessage && !e.shiftKey && window.innerWidth > 768) {
    handleOutgoingMessage(e);
  }
});

messageInput.addEventListener('input', () => {
  messageInput.style.height = `${initialInputHeight}px`;
  messageInput.style.height = `${messageInput.scrollHeight}px`;
  document.querySelector('.chat-form').style.borderRadius =
    messageInput.scrollHeight > initialInputHeight ? '15px' : '32px';
});

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    fileUploadWrapper.querySelector('img').src = e.target.result;
    fileUploadWrapper.classList.add('file-uploaded');
    const base64String = e.target.result.split(',')[1];

    userData.file = {
      data: base64String,
      mime_type: file.type,
    };

    fileInput.value = '';
  };

  reader.readAsDataURL(file);
});

fileCancelButton.addEventListener('click', () => {
  userData.file = {};
  fileUploadWrapper.classList.remove('file-uploaded');
});

const picker = new EmojiMart.Picker({
  theme: 'light',
  skinTonePosition: 'none',
  previewPosition: 'none',
  onEmojiSelect: (emoji) => {
    const { selectionStart: start, selectionEnd: end } = messageInput;
    messageInput.setRangeText(emoji.native, start, end, 'end');
    messageInput.focus();
  },
  onClickOutside: (e) => {
    if (e.target.id === 'emoji-picker') {
      document.body.classList.toggle('show-emoji-picker');
    } else {
      document.body.classList.remove('show-emoji-picker');
    }
  },
});

document.querySelector('.chat-form').appendChild(picker);

sendMessageButton.addEventListener('click', (e) => handleOutgoingMessage(e));
document.querySelector('#file-upload').addEventListener('click', () => fileInput.click());
chatbotToggler.addEventListener('click', () =>
  document.body.classList.toggle('show-chatbot')
);
closeChatbot.addEventListener('click', () =>
  document.body.classList.remove('show-chatbot')
);

function updateYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('year');
    yearElement.dateTime = currentYear;
    yearElement.textContent = currentYear;
  }
  
  updateYear();

  const canvas = document.getElementById('snowfall');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let numOfflakes = 50;
const snowFlakes = [];

function createSnowFlake() {
	const snowFlake = {
		x: Math.random() * canvas.width,
		y: Math.random() * canvas.height,
		size: Math.random() * 5,
		speedX: Math.random() * 1.1,
		speedY: Math.random() * 1.7,
	};
	snowFlakes.push(snowFlake);
}

for (let i = 0; i < numOfflakes; i++) {
	createSnowFlake();
}

function drawSnowFlake(snowFlake) {
	ctx.beginPath();
	ctx.arc(snowFlake.x, snowFlake.y, snowFlake.size, 0, Math.PI * 2);
	ctx.fillStyle = '#fffafa';
	ctx.fill();
}

function updateSnowFlakes(snowFlake) {
	snowFlake.x += snowFlake.speedX;
	snowFlake.y += snowFlake.speedY;

	if (snowFlake.y > canvas.height) {
		snowFlake.x = Math.random() * canvas.width - 200;
		snowFlake.y = -50;
	}
}

function snowFall() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (let i = 0; i < snowFlakes.length; i++) {
		drawSnowFlake(snowFlakes[i]);
		updateSnowFlakes(snowFlakes[i]);
	}

	requestAnimationFrame(snowFall);
}

snowFall();
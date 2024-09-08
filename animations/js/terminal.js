function consoleText(words, textId, colors, consoleId) {
  if (colors === undefined) colors = ['#fff'];
  var visible = true;
  var con = document.getElementById('console' + consoleId);
  var letterCount = 1;
  var x = 1;
  var waiting = false;
  var target = document.getElementById(textId)
  target.setAttribute('style', 'color:' + colors[0])
  window.setInterval(function () {
    if (letterCount === 0 && waiting === false) {
      waiting = true;
      target.innerHTML = words[0].substring(0, letterCount)
      window.setTimeout(function () {
        var usedColor = colors.shift();
        colors.push(usedColor);
        var usedWord = words.shift();
        words.push(usedWord);
        x = 1;
        target.setAttribute('style', 'color:' + colors[0])
        letterCount += x;

        waiting = false;
      }, 1000)
    } else if (letterCount === words[0].length + 1 && waiting === false) {
      waiting = true;
      window.setTimeout(function () {
        x = -1;
        letterCount += x;
        waiting = false;
      }, 1000)
    } else if (waiting === false) {
      target.innerHTML = words[0].substring(0, letterCount)
      letterCount += x;
    }
  }, 120)
  window.setInterval(function () {
    if (visible === true) {
      con.className = 'console-underscore hidden'
      visible = false;

    } else {
      con.className = 'console-underscore'

      visible = true;
    }
  }, 400)
}

// function([string1, string2],target id,[color1,color2])    
consoleText(['Administração dos Donatários', 'Inquisição e autoridade eclesiástica', 'Influência estrangeira e revoltas'], 'text1', ['#F6E96B', '#BEDC74', '#A2CA71'], 1);
consoleText(['Ciclo do Pau-Brasil', 'Ciclo da Cana-de-açúcar', 'Ciclo do Ouro'], 'text2', ['#F6E96B', '#BEDC74', '#A2CA71'], 2);
consoleText(['Duarte Coelho, o primeiro donatário', 'Francisco José Gomes, um pedreiro renomado', 'Antônio Vieira de Melo, o primeiro cangaceiro?'], 'text3', ['#F6E96B', '#BEDC74', '#A2CA71'], 3);
consoleText(['Guerras Holandesas', 'Conflitos constitucionalistas', 'Revoluções pernambucanas'], 'text4', ['#F6E96B', '#BEDC74', '#A2CA71'], 4);

// Importa a API do Gemini (deve ser incluído no seu projeto via módulo ou CDN)
import { GoogleGenerativeAI } from "@google/generative-ai";

// Substitua pela sua chave da API
const API_KEY = 'AIzaSyDS5P7V_bqJwImf_zJFIHdYvyTeMwX2YFc';

const genAI = new GoogleGenerativeAI(API_KEY);

// Função para adicionar mensagens ao chat
const chatBox = document.getElementById('chat');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

function addMessage(sender, text) {
  const messageDiv = document.createElement('div');
  messageDiv.textContent = text;

  messageDiv.classList.add('message');
  if (sender === 'Você') {
    messageDiv.classList.add('user-message');
  } else {
    messageDiv.classList.add('ai-message');
  }

  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;  // Faz o scroll ir até o final
}

// Função que comunica com a API do Gemini e obtém a resposta
async function fetchAIResponse(userMessage) {
  // Inicializa o modelo com a API
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Cria o prompt base
  const prompt = `Você agora é uma IA chamada HistorIA. Seu papel é responder perguntas com fundamentos históricos, baseados em artigos, fontes e eventos bem documentados. Não utilize marcações Markdown na sua resposta, apenas emoji e texto plano. Responda à seguinte pergunta: "${userMessage}"`;

  // Exibe mensagem de "pensando" enquanto a IA processa a pergunta
  addMessage('HistorIA', 'HistorIA está pensando...');

  // Envia o prompt para a IA e obtém a resposta
  try {
    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();

    // Remove a mensagem temporária de "pensando"
    const lastMessage = chatBox.lastChild;
    if (lastMessage && lastMessage.textContent === 'HistorIA está pensando...') {
      chatBox.removeChild(lastMessage);
    }

    // Exibe a resposta da IA
    addMessage('HistorIA', responseText);
  } catch (error) {
    console.error('Erro ao obter a resposta da IA:', error);

    const lastMessage = chatBox.lastChild;
    if (lastMessage && lastMessage.textContent === 'HistorIA está pensando...') {
      chatBox.removeChild(lastMessage);
    }

    addMessage('HistorIA', 'Desculpe, houve um erro ao obter a resposta.');
  }
}

// Lida com o envio da mensagem do usuário
sendBtn.addEventListener('click', () => {
  const message = userInput.value.trim();
  if (message === '') return;

  addMessage('Você', message);  // Exibe a mensagem do usuário
  userInput.value = '';  // Limpa o campo de input

  fetchAIResponse(message);  // Envia a mensagem para a IA
});
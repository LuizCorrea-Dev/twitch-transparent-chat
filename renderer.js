// renderer.js (ViewModel)
const tmi = require("tmi.js");
const { ipcRenderer } = require("electron");

class ChatViewModel {
  constructor() {
    this.settingsScreen = document.getElementById("settings-screen");
    this.chatScreen = document.getElementById("chat-screen");
    this.channelNameInput = document.getElementById("channel-name-input");
    this.startChatButton = document.getElementById("start-chat-button");
    this.chatContainer = document.getElementById("chat-container");
    this.interactionIndicator = document.getElementById(
      "interaction-indicator"
    );
    this.titleBar = document.getElementById("custom-title-bar");

    // Configura controles da barra de título
    this.setupTitleBarControls();

    // Event listeners
    if (this.startChatButton) {
      this.startChatButton.addEventListener("click", () => {
        const channel = this.channelNameInput.value.toLowerCase().trim();
        if (channel) {
          ipcRenderer.send("save-channel", channel);
          this.init(channel);
          this.showChatScreen(); // Isso agora vai esconder a tela de configurações corretamente
        } else {
          console.log("Tentativa de iniciar chat sem canal.");
        }
      });
    }

    ipcRenderer.on("toggle-interaction-mode", (event, isIgnoring) => {
      if (this.chatScreen.classList.contains("active")) {
        // Se está no chat, mostra diretamente as configurações
        this.showSettingsScreen();
      } else {
        // Se está nas configurações, apenas alterna o modo
        this.setChatMode(!isIgnoring);
      }
    });
  }

  showSettingsScreen() {
    this.settingsScreen.classList.add("active");
    this.settingsScreen.classList.remove("hidden");
    this.chatScreen.classList.add("hidden");
    this.chatScreen.classList.remove("active");
    // Mostra a barra de título
    const titleBar = document.getElementById("custom-title-bar");
    if (titleBar) {
      titleBar.style.display = "flex";
    }

    this.setChatMode(true);
  }

  showChatScreen() {
    this.chatScreen.classList.add("active");
    this.chatScreen.classList.remove("hidden");
    this.settingsScreen.classList.add("hidden");
    this.settingsScreen.classList.remove("active");
    // Esconde completamente a barra de título
    if (this.titleBar) {
      this.titleBar.style.display = "none";
    }
    // Força transparência total
    ipcRenderer.send("set-chat-mode-ui", {
      transparent: true,
      frame: false,
    });

    // Remove qualquer margem branca
    document.body.style.backgroundColor = "transparent";
    this.chatScreen.style.backgroundColor = "transparent";
    this.setChatMode(false);
  }

  setChatMode(isInteractive) {
    // Envia para o processo principal
    ipcRenderer.send("set-window-mode", { interactive: isInteractive });

    // Atualiza a UI - Configurações de interação
    document.body.style.cursor = isInteractive ? "grab" : "default";
    this.interactionIndicator.style.display = isInteractive ? "block" : "none";

    if (isInteractive) {
      // Configura áreas arrastáveis
      if (titleBar) {
        titleBar.style.webkitAppRegion = "drag";
      }
      document.querySelectorAll("button, input").forEach((el) => {
        el.style.webkitAppRegion = "no-drag";
      });
    }
  }

  startChat() {
    const channel = this.channelNameInput.value.trim();
    if (channel) {
      this.init(channel);
      this.showChatScreen();
    }
  }

  init(channel) {
    if (this.client) this.client.disconnect();
    // Limpa o chatContainer antes de iniciar uma nova conexão ou mudar de canal
    if (this.chatContainer) {
      this.chatContainer.innerHTML = "";
    }

    if (this.client) {
      if (this.client.readyState === "OPEN") {
        this.client.disconnect();
      }
      this.client = null;
    }

    this.client = new tmi.Client({ channels: [channel] });
    this.client.on("message", (_, tags, message) => {
      if (!tags["display-name"]) return;
      this.addMessage(tags["display-name"], message, tags["color"]);
    });

    this.client.connect().catch((err) => {
      this.addMessage("Sistema", `Erro: ${err.message}`, "#FF0000");
    });
  }

  addMessage(username, message, color) {
    const msgElement = document.createElement("div");
    msgElement.className = "chat-message";

    const userSpan = document.createElement("span");
    userSpan.className = "username";
    userSpan.textContent = `${username}: `;
    userSpan.style.color = color || "#9146ff";

    msgElement.append(userSpan, document.createTextNode(message));
    this.chatContainer.prepend(msgElement);

    // Limita histórico
    if (this.chatContainer.children.length > 50) {
      this.chatContainer.lastChild.remove();
    }
  }

  setupTitleBarControls() {
    document.getElementById("minimize-btn")?.addEventListener("click", () => {
      ipcRenderer.send("window-control", "minimize");
    });
    document.getElementById("maximize-btn")?.addEventListener("click", () => {
      ipcRenderer.send("window-control", "maximize");
    });
    document.getElementById("close-btn")?.addEventListener("click", () => {
      ipcRenderer.send("window-control", "close");
    });
  }
}

document.addEventListener("DOMContentLoaded", () => new ChatViewModel());

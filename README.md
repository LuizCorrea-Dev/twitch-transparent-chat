# Twitch Transparent Chat

Um aplicativo de chat transparente para streamings na Twitch, construído com Electron. Este aplicativo permite que streamers ou espectadores tenham o chat da Twitch sobreposto na tela de forma não intrusiva, com a opção de alternar entre modos interativo e transparente.

## Funcionalidades

- **Chat Transparente:** Exibe mensagens de chat da Twitch diretamente na sua tela, sem cobrir o conteúdo do jogo ou stream.

- **Modo Interativo/Transparente:** Alterna entre:

- **Modo Transparente:** O chat ignora cliques do mouse, permitindo que você clique através dele para interagir com o que está por baixo.

- **Modo Interativo:** O chat se torna clicável e arrastável, revelando controles para mover a janela ou acessar configurações.

- **Atalho Global:** Utilize `Ctrl + Shift + I` (ou `Command + Shift + I` no macOS) para alternar rapidamente entre os modos.

- **Configurações Simples:** Defina o canal da Twitch a ser monitorado diretamente no aplicativo.

## Download

Você pode baixar a versão mais recente do aplicativo (arquivo `.exe` para Windows, e talvez outras plataformas no futuro) diretamente na página de [Releases](https://github.com/SEU_USUARIO/SEU_REPOSITORIO/releases) deste repositório no GitHub.

**Como Baixar:**

1. Vá para a aba "Releases" no GitHub (ou clique no link acima).

2. Procure a versão mais recente.

3. Na seção "Assets" (Ativos), baixe o arquivo `.exe` (ex: `TwitchTransparentChat-Setup-1.0.0.exe` ou `TwitchTransparentChat-1.0.0-win.zip`).

## Como Usar (Após Baixar e Instalar)

1. Execute o aplicativo `TwitchTransparentChat.exe`.

2. Na tela de configurações (inicialmente visível), insira o nome do canal da Twitch que você deseja monitorar (ex: `casimito`, `gaules`). **Não inclua o `#`**.

3. Clique em "Iniciar Chat".

4. O chat aparecerá na sua tela. Ele estará no **Modo Transparente** por padrão.

5. Para mover a janela ou acessar as configurações novamente, pressione `Ctrl + Shift + I` (ou `Command + Shift + I` no macOS) para ativar o **Modo Interativo**.

6. No Modo Interativo, você pode arrastar a janela pela sua "barra de título" superior ou clicar no botão de configurações para alterar o canal.

7. Pressione `Ctrl + Shift + I` novamente para retornar ao **Modo Transparente**.

![tela de configuração](https://i.pinimg.com/736x/39/1d/c2/391dc21d810582c72b5ca3c0f29b559b.jpg)

![tela de chat](https://i.pinimg.com/736x/94/b4/82/94b48245d6cf978a233eb1e901dfc476.jpg)

## Desenvolvimento

### Pré-requisitos

Certifique-se de ter o Node.js e o npm instalados.

- [Node.js](https://nodejs.org/) (inclui npm)

### Configuração do Projeto

1. Clone este repositório:

```bash

git clone [https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git](https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git)

cd twitch-transparent-chat

```

2. Instale as dependências:

```bash

npm install

```

### Executando em Modo de Desenvolvimento

Para testar o aplicativo sem criar um executável:

```bash

npm  start

```

## Contribuição

Contribuições são bem-vindas! Se você tiver ideias para melhorias, relatar bugs ou quiser adicionar novas funcionalidades, sinta-se à vontade para abrir uma [Issue](https://www.google.com/search?q=https://github.com/SEU_USUARIO/SEU_REPOSITORIO/issues) ou enviar um [Pull Request](https://www.google.com/search?q=https://github.com/SEU_USUARIO/SEU_REPOSITORIO/pulls).

## Licença

Este projeto está licenciado sob a licença [ISC](https://www.google.com/search?q=LICENSE).

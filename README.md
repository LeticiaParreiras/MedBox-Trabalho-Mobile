# Nome do App

MedBox - Aplicativo criado para a matéria de Desenvolvimento Mobile I

## 🏗️ Tecnologias Utilizadas

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma de desenvolvimento
- **AsyncStorage** - Armazenamento local de dados
- **Context API** - Gerenciamento de estado global

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Expo Go](https://expo.dev/client) instalado no seu dispositivo móvel (disponível na App Store e Google Play)

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/LeticiaParreiras/MedBox-Trabalho-Mobile
cd seu-app
```

### 2. Instale as dependências

```bash
npm install
```

ou, se preferir usar yarn:

```bash
yarn install
```

## Instalando o AsyncStorage

- No terminal, use:
```bash
npx expo install @react-native-async-storage/async-storage
```

### 3. Inicie o projeto

```bash
npx expo start
```

ou

```bash
npm start
```

### 4. Execute no seu dispositivo

Após iniciar o projeto, você verá um QR Code no terminal. 

**No Android:**
- Abra o app Expo Go
- Toque em "Scan QR Code"
- Escaneie o QR Code exibido no terminal

**No iOS:**
- Abra a câmera nativa do iPhone
- Aponte para o QR Code
- Toque na notificação que aparecer para abrir no Expo Go

## 🔄 Atualização

### Atualizando dependências

Para atualizar todas as dependências do projeto:

```bash
npm update
```

ou

```bash
yarn upgrade
```

### Atualizando o Expo SDK

Para atualizar para a versão mais recente do Expo:

```bash
npx expo install expo@latest
```

Depois, atualize todas as dependências compatíveis:

```bash
npx expo install --fix
```

### Verificando atualizações disponíveis

Para verificar quais pacotes têm atualizações disponíveis:

```bash
npm outdated
```

## 🛠️ Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run android` - Abre o app no emulador Android
- `npm run ios` - Abre o app no simulador iOS
- `npm run web` - Abre o app no navegador

## 📱 Build para Produção

Para criar uma build de produção:

```bash
npx expo build:android
```

ou

```bash
npx expo build:ios
```

## 🐛 Solução de Problemas

### Problemas com AsyncStorage

Se os dados não estiverem sendo salvos ou recuperados:

```bash
# Limpe o cache do AsyncStorage no dispositivo
# Desinstale e reinstale o app no Expo Go
```

### Cache do Expo

Se encontrar problemas, tente limpar o cache:

```bash
npx expo start -c
```

### Reinstalar dependências

```bash
rm -rf node_modules
npm install
```

### Dados não persistem

O AsyncStorage armazena dados localmente no dispositivo. Se você trocar de dispositivo ou reinstalar o Expo Go, os dados serão perdidos. Para desenvolvimento, isso é normal.

## ⚙️ Funcionalidades

### Armazenamento Local (AsyncStorage)

O app utiliza AsyncStorage para persistir dados localmente no dispositivo, permitindo que as informações sejam mantidas mesmo após fechar o aplicativo.

### Gerenciamento de Estado (Context API)

A Context API é utilizada para gerenciar o estado global da aplicação, facilitando o compartilhamento de dados entre componentes sem prop drilling.

## 📚 Documentação

- [Documentação do Expo](https://docs.expo.dev/)
- [Expo Go](https://expo.dev/client)
- [React Native](https://reactnative.dev/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- [Context API](https://react.dev/reference/react/useContext)

## 📄 Licença

Este projeto está sob a licença MIT.

## 👤 Autores

- Igor Sudo
- Letícia Parreiras
- Mariana Urani

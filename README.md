# Habit Controller

<!---Esses são exemplos. Veja https://shields.io para outras pessoas ou para personalizar este conjunto de escudos. Você pode querer incluir dependências, status do projeto e informações de licença aqui--->

<img src="./front-web/src/assets/logo.svg" alt="exemplo imagem">

> Linha adicional de texto informativo sobre o que o projeto faz. Sua introdução deve ter cerca de 2 ou 3 linhas. Não exagere, as pessoas não vão ler.

---

## Ajustes e melhorias

A seguir algumas sugestões de melhorias:

- Escolher uma data no momento de criação dos hábitos.
- Adicionar notificações.

---

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

<!---Estes são apenas requisitos de exemplo. Adicionar, duplicar ou remover conforme necessário--->

- Instalar a versão `18.13.0` do `Node` e o `npm` na versão `8.19.3`
- Possuir um editor de texto `<VSCode/Vim/SublimeText>`
- Instalar qualquer navegador moderno `Chrome/Opera/Firefox/Edge`

---

## ☕ Usando o Habit Controller

Para usar Habit Controller, primeiramente clone o repositório:

```shell
git clone https://github.com/danilocsm/Habit-Controller.git
```

Depois, navegue até o diretório raiz do repositório e xecute a seguinte sequência de comandos:

```shell
cd server
```

```shell
npm ci
```

Agora, crie um arquivo `.env` na raiz do diretório `server` e adicione as seguintes linhas:

```javascript
DATABASE = 'postgresql_connection_url'
SECRET_KEY = 'your_secret_key'
```

Em sequência, execute os seguintes comandos:

```shell
npx prisma migrate dev
```

```shell
npx prisma db seed
```

Agora, o servidor está pronto para ser executado com o comando:

```shell
npm run dev
```

Volte à raiz repositório e execute:

```shell
cd front-web
```

```shell
npm ci
```

E execute o seguinte comndo para executar a aplição localmente:

```shell
npm run dev
```

A aplicação deve estar disponível no endereço `http://localhost:5173`

## Adicionais

O comando `npx prisma db seed` irá criar um usuário padrão no banco de dados com login `default_user` e senha `123456` para que você possa fazer login na aplicação

Você pode criar novos usuários passando utilizando a API `/signup` e passando no corpo da requisição HTTP o seguinte formato de JSON

```json
{
  "username": "your new username",
  "password": "your new passowrd"
}
```

## 📋 Tech Stack

- Node.js
- React.js
- Fastify
- TailwindCSS
- Vite
- TypeScript

## 🤝 Colaboradores

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://avatars3.githubusercontent.com/u/31936044" width="100px;" alt="Foto do Iuri Silva no GitHub"/><br>
        <sub>
          <b>Danilo Medeiros</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## 📝 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE.md) para mais detalhes.

[⬆ Voltar ao topo](#habit-controller)

# Teste Técnico Innova

## Requisitos de negócio

1. Deve ser possível se cadastrar (Nome, E-mail e Senha);
2. Deve ser possível se autenticar (E-mail e Senha);
3. Deve ser possível cadastrar uma academia (Nome, Descrição, Telefone, Latitude e longitude);
4. Deve ser possível obter o perfil de um usuário logado;
5. Deve ser possível o usuário obter o seu histórico de check-ins;
6. Deve ser possível o usuário buscar academias pelo nome;
7. Deve ser possível o usuário realizar check-in em uma academia;

## RNs (Regras de negócio)

1. O usuário não deve poder se cadastrar com um e-mail duplicado;
2. O usuário não pode fazer 2 check-ins no mesmo dia;
3. A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)
1.  A senha do usuário precisa estar criptografada;
2.  Todas listas de dados precisam estar paginadas com 20 itens por página;
3.  O usuário deve ser identificado por um JWT (JSON Web Token);

<br>
<br>

# InnHealth

Site disponível em inn-health.vercel.app




### Tecnologias

- TypeScript (Linguagem)
- NextJs (FrameWork)
- Prisma (ORM)
- Prostgres (BD)


### Instalação

```bash
npm install
```

### Iniciar serviço

Arquivo .env com as variáveis de ambiente está no repositório para facilitar a avaliação do teste.

```bash
npm run dev
```

Abra http://localhost:3000 em seu navegador para assim utilizar a aplicação.


<br>

# Estrutura do Projeto

## Roteamento

### Front-end

Páginas da aplicação se encontram dentro da pasta (platform).<br>
Em NextJS o roteamento é feito pela estrutura das pastas, logo para alterar a página "Perfil", basta seguir o caminho app\\(platform)\perfil\page.tsx. Este padrão se repete para as demais rotas do front-end.

<br>
Rota web:

```
http://localhost:3000/perfil
```
<br>
Pasta na aplicação:

```
root\app\(platform)\perfil\page.tsx
```

### Back-end
O roteamento das Apis é estruturado de forma semelhante as demais rotas da aplicação, com o diferencial que se encontram na pasta app\api

<br>
Rota web:

```
http://localhost:3000/api/academia
```

<br>
Pasta na aplicação:

```
root\app\api\academia\route.ts
```

<br>

## Server Actions

As Server Actions da aplicação se encontram na pasta actions, na raiz do projeto. 

```
root\actions\index.ts
```

### Disclaimer

As server actions podem ser usada no projeto como um todo, evitando criação de rotas desnecessárias. Durante o desenvolvimento deste projeto optei pela criação de rotas de API consumindo as server actions e servindo os dados ao cliente, assim demonstrando conhecimento na criação e consumo de api via front-end.

## Middleware

<br>
Middleware se encontra na raiz do projeto

```
root\middleware.ts
```

O middleware é responsável por verificar toda requisição que ocorre nas rotas especificadas.
Neste projeto, optei por verificar apenas se o cliente está autenticado, caso não o retorna a página de login. 

<br>
As Rotas especificadas podem ser encontradas no seguinte bloco:

```ts
export const config = { matcher: ["/perfil/", '/academia/cadastrar'] };
```

<br>

## Autenticação

### NextAuth    
A autenticação da aplicação é feita via jwt utilizando a biblioteca NextAuth, a mesma foi escolhida pela sua flexibilidade e facilidade de configuração. Além da autenticação via email, o NextAuth possui suporte a integração com outros serviços como Google e GitHub.

<br>
A configuração do serviço de autenticação se encontra em:

```
root\lib\auth
```


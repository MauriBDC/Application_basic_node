# CI/CD Lab com GitHub Actions

Este repositório é um laboratório de aprendizado prático de CI/CD com GitHub Actions.

## Objetivo

Este laboratório foi criado para treinar:

- estrutura básica de aplicação Node
- pipeline de integração contínua (CI)
- publicação de artefatos de teste e build

## Escopo do laboratório

Inclui:

- desenvolvimento incremental de uma calculadora básica
- testes automatizados
- execução de CI no GitHub Actions
- análise de disparos do pipeline por tipo de alteração

Não inclui (nesta fase):

- deploy em ambiente de produção
- CD com aprovação manual
- infraestrutura em nuvem (AWS/GCP/Azure)

## Aplicação

A aplicação é uma calculadora básica em `src/math.js` com as funções:

- `sum(a, b)`
- `subtract(a, b)`
- `multiply(a, b)`
- `divide(a, b)`

Regra de negócio:

- `divide(a, 0)` lança erro (`Division by zero is not allowed`)

Também há:

- ponto de entrada em `src/index.js`
- testes em `test/math.test.mjs` cobrindo todas as operações

Scripts disponíveis no `package.json`:

- `npm run lint`: validações simples de estilo via `scripts/lint.mjs`
- `npm test -- --coverage`: executa testes e gera `coverage/coverage-summary.json`
- `npm run build`: gera artefato em `dist/index.js`

## Como rodar localmente

Requisitos:

- Node.js 20+
- npm

Comandos:

```bash
npm ci
npm run lint
npm test -- --coverage
npm run build
```

## Como validar o CI localmente

Sequência usada no pipeline:

1. `npm ci` (instala dependências a partir do lockfile)
2. `npm run lint` (valida regras básicas de código)
3. `npm test -- --coverage` (executa testes e gera cobertura)
4. `npm run build` (gera artefato de build)

Saídas esperadas:

- `coverage/coverage-summary.json`
- `dist/index.js`

## Workflow de CI

Arquivo: `.github/workflows/ci.yaml`

### Gatilhos

O workflow executa em:

- `push` para branches `master` e `develop`
- `pull_request` para branch `master`
- com `paths-ignore` para não executar CI quando a mudança for apenas documentação:
  - `README.md`
  - `**/*.md`

### Otimização de disparo (documentação)

Para reduzir execuções desnecessárias, o workflow ignora commits que alteram somente arquivos Markdown.

Isso significa que mudanças apenas em:

- `README.md`
- arquivos `*.md`

não disparam o pipeline em `push` e `pull_request`.

Observação: em `pull_request`, se o conjunto de arquivos alterados do PR incluir código ou configuração (por exemplo `.js` ou `.github/workflows/*.yaml`), o CI continua executando normalmente.

Exemplos práticos:

- Commit alterando apenas `README.md`: CI não dispara
- Commit alterando `README.md` + `src/math.js`: CI dispara
- PR com histórico contendo mudanças de código: CI pode continuar disparando mesmo com novo commit só de `.md`

### Configurações globais

- `permissions: contents: read` para aplicar menor privilégio
- `concurrency` para cancelar execuções antigas da mesma branch

### Job 1: `lint-and-test`

Passos:

1. Checkout do repositório
2. Setup do Node 20 com cache de npm
3. Execução de:
   - `npm ci`
   - `npm run lint`
   - `npm test -- --coverage`
4. Upload do artefato de cobertura (`coverage/`) com retenção de 7 dias

### Job 2: `build`

Características:

- depende do job `lint-and-test` (`needs`)
- roda apenas em evento de `push` (`if: github.event_name == 'push'`)

Passos:

1. Checkout do repositório
2. Setup do Node 20 com cache de npm
3. Execução de:
   - `npm ci`
   - `npm run build`
4. Upload do artefato de build (`dist/`) com retenção de 7 dias

## Evolução do laboratório

Evolução implementada para observar múltiplos disparos de CI:

1. função `sum`
2. adição de `subtract`
3. adição de `multiply`
4. adição de `divide` com proteção para divisão por zero

Cada etapa foi feita com commit atômico e testes correspondentes.

## Estrutura de pastas

```text
.
├── .github/workflows/ci.yaml
├── scripts/
│   ├── build.mjs
│   ├── lint.mjs
│   └── test.mjs
├── src/
│   ├── index.js
│   └── math.js
├── test/
│   └── math.test.mjs
├── package.json
└── package-lock.json
```

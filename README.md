# CI/CD Lab com GitHub Actions

Projeto mínimo em Node.js para praticar CI/CD com GitHub Actions.

## Objetivo

Este repositório foi criado para treinar:

- estrutura básica de aplicação Node
- pipeline de integração contínua (CI)
- publicação de artefatos de teste e build

## Aplicação

A aplicação é propositalmente simples:

- função `sum(a, b)` em `src/math.js`
- ponto de entrada em `src/index.js`
- teste básico em `test/math.test.mjs`

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

## Workflow de CI

Arquivo: `.github/workflows/ci.yaml`

### Gatilhos

O workflow executa em:

- `push` para branches `master` e `develop`
- `pull_request` para branch `master`

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


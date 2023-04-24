# A decentralized exchange for swapping tokens

## Introduction

This project is a decentralized exchange application for swapping between Ether and ERC20 tokens.

## Installation

```bash
npm install -g npm
npm install -g truffle
npm install -g ganache-cli

cd frontend-skeleton_v2
npm install web3
npm install
```

## Development

### Local chain development

```bash
cd frontend-skeleton_v2
npm run ganache

# then open another terminal
npm run migrate
npm run serve  # or npm run design
```

### Test

```bash
truffle test
```

### Deploy

```bash
npm run build
```

### Note
After run serve sucessfully. Click this link [http://127.0.0.1:9966/].
# 从 0 开始创建一个React状态管理库
## 初始化工作

### init
```shell
git init
pnpm init
touch .gitignore
touch README.md
```

### pnpm monorepo
```shell
touch pnpm-workspace.yaml
``` 

### 初始化文件目录

## 安装配置TypeScript
安装TypeScript lib
```shell
pnpm add typescript -wD
pnpm add ts-node -wD
pnpm add tslib -wD
pnpm add @types/node -wD
```

配置tsconfig.json
```shell
touch tsconfig.json
```

tsconfig.json
```json5
{
  "compilerOptions": {
    "module": "esnext", // 使用最新的 JavaScript 标准模块语法
    "esModuleInterop": true, // 实现对非 ECMAScript 模块（例如，CommonJS 模块）的默认导入
    "strict": true, // 启用所有严格类型检查选项，有助于发现潜在的类型错误，提高代码质量
    "target": "esnext", // 编译后的 JavaScript 代码的 ECMAScript 目标版本
    "moduleResolution": "bundler", // 指定了模块解析策略，这里目的是希望交由 rollup 来配置
    "noEmit": true, // 执行类型检查，但不会输出任何编译后的代码，因为编译交由 rollup 来做了
    "jsx": "react-jsx" // 指定了如何处理 JSX 语法
  }
}
```

## 安装配置 eslint
### 安装 eslint & eslint-typescript
```shell
pnpm add eslint -wD 
pnpm add eslint-import-resolver-typescript -wD 
pnpm add eslint-plugin-import -wD
pnpm add @typescript-eslint/eslint-plugin -wD
pnpm add @typescript-eslint/parser -wD
pnpm add eslint-plugin-react-hooks -wD
pnpm add globals -wD
pnpm add typescript-eslint -wD
```

### 安装 prettier & eslint-config-prettier
```shell
pnpm add prettier -wD
pnpm add eslint-config-prettier -wD
pnpm add eslint-plugin-prettier -wD
```

配置eslint rule
```shell
touch eslint.config.mjs
touch .prettierignore
```

## 安装配置 rollup
```shell
pnpm add rollup -wD
```

配置 packges/xxx 各子项的 package.json
```json5
"exports": {
  ".": {
    "import": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.mjs"
    },
    "require": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.cjs"
    }
  }
},
```
```json5
{
  "scripts": {
    "build": "rollup -c"
  }
}
```

### 安装concurrently开启并行编译
```shell
pnpm add concurrently -wD
```

配置rollup.config.ts
```shell
touch rollup.config.ts
```
rollup.config.ts
```typescript
```

### 安装配置 rollup 插件和 babel
安装 rollup 插件
```shell
pnpm add rollup-plugin-dts -wD
pnpm add rollup-plugin-node-resolve -wD
pnpm add rollup-plugin-commonjs -wD
pnpm add @rollup/plugin-commonjs -wD
pnpm add @rollup/plugin-node-resolve -wD
pnpm add @rollup/plugin-typescript -wD
pnpm add @rollup/plugin-babel -wD
pnpm add rollup-plugin-banner2 -wD
```
安装 babel
```shell
pnpm add @babel/core -wD
pnpm add @babel/preset-env -wD
pnpm add @babel/plugin-transform-react-jsx -wD
pnpm add @babel/plugin-transform-typescript -wD
```

## 安装配置 jest
```shell
pnpm add jest -wD
pnpm add ts-jest -wD
pnpm add jsdom -wD
pnpm add jest-environment-jsdom -wD
pnpm add @types/jest -wD
pnpm add @jest/types -wD
```

配置 jest.preset.js, jest.config.ts
```shell
touch jest.config.ts
touch jest.preset.js
``` 

配置 npm script
```json5
"scripts": {
  "test": "jest"
}
```

## 配置github workflows
```shell
mkdir .github
mkdir .github/workflows
touch .github/workflows/test.yml
touch .github/workflows/lint-and-type.yml
```
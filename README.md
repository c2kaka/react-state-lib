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

### 安装配置TypeScript
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



[//]: # (### 安装配置 eslint)

[//]: # (```shell)

[//]: # (pnpm add eslint eslint-config-prettier eslint-import-resolver-typescript eslint-plugin-import eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks -wD)

[//]: # (```)

[//]: # (配置eslint rule)

[//]: # (```shell)

[//]: # (touch .eslintrc.json)

[//]: # (touch .eslintignore)
```

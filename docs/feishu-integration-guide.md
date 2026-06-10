# 飞书项目管理直连说明

目标：让官网项目资料、任务、产品上线计划逐步进入飞书，并让 Codex 可以通过飞书开放平台读取和维护项目记录。

## 当前接入对象

- 飞书应用：帝昂官网项目助手
- App ID：`cli_aa9116bef3781cd8`
- 飞书项目文档：
  `https://rxiu20crahj.feishu.cn/wiki/ZDRZw0iiiiNTa5k3NkBcwqvZnRh`

## 本机密钥配置

不要把 App Secret 发到聊天窗口，也不要提交到 GitHub。请在项目根目录创建或编辑：

```bash
E:\Codex\diang-fire-platform\.env.local
```

加入：

```env
FEISHU_APP_ID="cli_aa9116bef3781cd8"
FEISHU_APP_SECRET="这里填飞书后台的 App Secret"
FEISHU_WIKI_URL="https://rxiu20crahj.feishu.cn/wiki/ZDRZw0iiiiNTa5k3NkBcwqvZnRh"
FEISHU_WIKI_NODE_TOKEN="ZDRZw0iiiiNTa5k3NkBcwqvZnRh"
```

如果后续拿到了多维表格的 app token，再补：

```env
FEISHU_BITABLE_APP_TOKEN="这里填多维表格 app_token"
```

## 检查连接

在项目目录运行：

```bash
npm run feishu:check
```

检查结果分三层：

1. 能拿到 `tenant_access_token`：说明 App ID / App Secret 正确。
2. 能识别 Wiki node token：说明当前飞书文档链接已被脚本读取。
3. 能列出多维表格表名：说明已经拿到多维表格 app token，可以开始自动同步项目记录。

## 后续数据规划

建议先把飞书多维表格按这几张表维护：

- `项目表`：官网改版、产品上线、SEO、服务器运维等大项目。
- `任务表`：每个项目拆成可执行任务，包含负责人、状态、截止日期。
- `产品资料表`：供应商、分类、型号、图片、PDF/PPT来源、整理状态。
- `上线清单表`：产品是否已完成图片处理、参数整理、英文翻译、后台录入、页面检查。

后续我可以把“供应商资料整理 -> 产品资料表 -> 官网后台产品”的流程接起来。

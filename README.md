# 上海帝昂实业有限公司官网与客户平台

第一版目标：消防救援装备 B2B 官网、产品展示、询价线索、运营后台、客户中心与 SaaS 管理雏形。

## 本地开发

```bash
npm install
npm run dev
```

访问：

- 中文官网：`http://localhost:3000/zh`
- 英文官网：`http://localhost:3000/en`
- 管理后台：`http://localhost:3000/zh/admin`
- 客户中心：`http://localhost:3000/zh/portal`
- 询价页：`http://localhost:3000/zh/inquiry`

## 技术栈

- Next.js + React + TypeScript
- Tailwind CSS
- Prisma + PostgreSQL
- 阿里云 ECS / RDS / OSS / 邮件推送预留

## 上线前准备

- 购买阿里云 ECS、RDS PostgreSQL、OSS
- 域名备案并配置解析
- 配置 HTTPS 证书和 Nginx
- 填写真实公司电话、邮箱、地址
- 上传真实产品图片、产品参数、资质证书和案例
- 接入邮件通知、文件上传和后台认证

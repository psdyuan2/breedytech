# 部署说明（Git 仓库）

部署**不再**打包上传本地项目目录，而是在服务器上通过 **Git 克隆或拉取** 代码，再执行构建与 PM2 启动。

## 本地执行

在仓库根目录：

```powershell
.\scripts\deploy.ps1
```

脚本会：

1. 读取本机 `git remote get-url origin` 作为仓库地址（也可用环境变量覆盖）。
2. `scp` 上传小脚本 `scripts/deploy-git.sh` 到服务器 `/tmp`（仅用于引导首次 `git clone`）。
3. SSH 在服务器上：`git clone` 或 `git pull`，然后执行 `scripts/deploy-remote.sh`（`npm ci`、Prisma、构建、PM2）。

## 环境变量（可选）

| 变量 | 说明 | 默认 |
|------|------|------|
| `DEPLOY_HOST` | SSH 目标 | `ubuntu@43.133.43.126` |
| `DEPLOY_PATH` | 服务器上项目目录 | `/home/ubuntu/breedytech` |
| `DEPLOY_REPO_URL` | Git 仓库 URL | 本机 `origin` |
| `DEPLOY_BRANCH` | 分支 | `main` |

示例：

```powershell
$env:DEPLOY_BRANCH = "main"
$env:DEPLOY_REPO_URL = "git@github.com:your-org/breedytech.git"
.\scripts\deploy.ps1
```

## 私有仓库

- 推荐使用 **SSH 地址**，在服务器上配置 **Deploy Key**（只读即可），或配置本机 `ssh-agent` 转发（按需）。
- 若使用 **HTTPS + Token**，可将 `DEPLOY_REPO_URL` 设为带 token 的 URL（勿提交到仓库）。

## 服务器上的 `.env`

生产环境请在服务器 `DEPLOY_PATH` 下配置 `.env`。若不存在，首次部署会从 `env.production.example` 复制一份，请务必修改 `SESSION_SECRET` 等敏感项。

## 端口与 Nginx

部署完成后：

- **Next.js（PM2）** 只监听 **`127.0.0.1:3000`**（不直接对公网暴露）。
- **Nginx** 监听 **80**，按 `deploy/nginx-breedytech.conf` 反代到上述地址。

公网访问请在云安全组/防火墙 **放行 TCP 80**（若仍只放行 3000，请改为放行 80 或同时放行）。

后续若要 HTTPS，可在 Nginx 上配置证书（如 Let’s Encrypt）并增加 443 `server` 块。

# Hours 后端服务

基于 Node.js + Express + TypeScript + MySQL 的后端服务，为工时统计系统提供 RESTful API 接口。

## 📋 目录结构

```
server/
├── src/                      # 源代码目录
│   ├── config/              # 配置文件
│   │   ├── index.ts        # 主配置文件
│   │   └── database.ts     # 数据库配置和连接池
│   ├── middleware/          # 中间件
│   │   ├── error.ts        # 错误处理中间件
│   │   └── logger.ts       # 日志中间件
│   ├── routes/              # 路由
│   │   ├── index.ts        # 基础路由（健康检查等）
│   │   ├── projects.ts     # 项目相关路由
│   │   └── tasks.ts        # 任务相关路由
│   └── server.ts            # 服务器入口文件
├── dist/                     # 编译后的代码
├── node_modules/            # 依赖包
├── .env                     # 环境变量（需自行创建）
├── .env.example             # 环境变量示例
├── .gitignore               # Git 忽略文件
├── .dockerignore            # Docker 忽略文件
├── Dockerfile               # Docker 镜像构建文件
├── docker-compose.yml       # Docker Compose 配置
├── init.sql                 # 数据库初始化脚本
├── package.json             # 项目依赖配置
├── tsconfig.json            # TypeScript 配置
└── README.md                # 本文档
```

## 🚀 快速开始

### 本地开发

1. **安装依赖**
```bash
cd server
npm install
```

2. **配置环境变量**
```bash
cp .env.example .env
# 编辑 .env 文件，配置数据库连接信息
```

3. **启动数据库**（如果本地没有 MySQL）
```bash
# 使用 Docker 启动 MySQL
docker run -d \
  --name hours-mysql \
  -e MYSQL_ROOT_PASSWORD=root_password \
  -e MYSQL_DATABASE=hours_db \
  -e MYSQL_USER=hours_user \
  -e MYSQL_PASSWORD=hours_password \
  -p 3306:3306 \
  mysql:8.0
```

4. **初始化数据库**
```bash
# 连接到 MySQL 并执行 init.sql
mysql -h localhost -u hours_user -p hours_db < init.sql
```

5. **启动开发服务器**
```bash
npm run dev
```

服务器将在 `http://localhost:3000` 启动。

### 使用 Docker 部署

#### 方式一：使用 Docker Compose（推荐）

```bash
# 构建并启动所有服务（包括 MySQL 和后端服务）
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down

# 停止服务并删除数据卷
docker-compose down -v
```

#### 方式二：仅构建后端服务镜像

```bash
# 构建 Docker 镜像
docker build -t hours-server:latest .

# 运行容器（需要已有 MySQL 数据库）
docker run -d \
  --name hours-server \
  -p 3000:3000 \
  -e DB_HOST=your_mysql_host \
  -e DB_USER=hours_user \
  -e DB_PASSWORD=hours_password \
  -e DB_NAME=hours_db \
  hours-server:latest
```

## 🔌 API 端口

- **默认端口**: `3000`
- **可通过环境变量 `PORT` 修改**

## 📡 API 接口文档

### 基础接口

#### 健康检查
```http
GET /api/health
```

响应示例：
```json
{
  "success": true,
  "message": "服务运行正常",
  "timestamp": "2026-02-06T12:00:00.000Z"
}
```

#### 数据库连接检查
```http
GET /api/db-check
```

### 项目管理

#### 获取所有项目
```http
GET /api/projects
```

#### 获取单个项目
```http
GET /api/projects/:id
```

#### 创建项目
```http
POST /api/projects
Content-Type: application/json

{
  "name": "项目名称",
  "description": "项目描述"
}
```

#### 更新项目
```http
PUT /api/projects/:id
Content-Type: application/json

{
  "name": "新项目名称",
  "description": "新项目描述"
}
```

#### 删除项目
```http
DELETE /api/projects/:id
```

### 任务管理

#### 获取所有任务
```http
GET /api/tasks?projectId=1
```

#### 获取单个任务
```http
GET /api/tasks/:id
```

#### 创建任务
```http
POST /api/tasks
Content-Type: application/json

{
  "projectId": 1,
  "name": "任务名称",
  "description": "任务描述",
  "estimatedHours": 40
}
```

#### 更新任务
```http
PUT /api/tasks/:id
Content-Type: application/json

{
  "name": "新任务名称",
  "description": "新任务描述",
  "estimatedHours": 50
}
```

#### 删除任务
```http
DELETE /api/tasks/:id
```

## 🔧 环境变量说明

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `PORT` | 服务器端口 | `3000` |
| `NODE_ENV` | 运行环境 | `development` |
| `DB_HOST` | 数据库主机 | `localhost` |
| `DB_PORT` | 数据库端口 | `3306` |
| `DB_USER` | 数据库用户名 | `root` |
| `DB_PASSWORD` | 数据库密码 | - |
| `DB_NAME` | 数据库名称 | `hours_db` |
| `CORS_ORIGIN` | CORS 允许的源 | `http://localhost:5173` |

## 📦 NPM 脚本

- `npm run dev` - 启动开发服务器（热重载）
- `npm run build` - 编译 TypeScript 代码
- `npm start` - 启动生产服务器
- `npm run lint` - 运行代码检查

## 🗄️ 数据库表结构

### projects（项目表）
- `id` - 主键
- `name` - 项目名称
- `description` - 项目描述
- `created_at` - 创建时间
- `updated_at` - 更新时间

### tasks（任务表）
- `id` - 主键
- `project_id` - 项目ID（外键）
- `name` - 任务名称
- `description` - 任务描述
- `estimated_hours` - 预估工时
- `created_at` - 创建时间
- `updated_at` - 更新时间

### users（用户表）
- `id` - 主键
- `username` - 用户名
- `email` - 邮箱
- `password_hash` - 密码哈希
- `full_name` - 全名
- `created_at` - 创建时间
- `updated_at` - 更新时间

### executions（执行记录表）
- `id` - 主键
- `task_id` - 任务ID（外键）
- `user_id` - 用户ID（外键）
- `hours` - 工时数
- `date` - 日期
- `description` - 描述
- `created_at` - 创建时间
- `updated_at` - 更新时间

## 🛠️ 技术栈

- **运行时**: Node.js 18
- **框架**: Express.js 4.x
- **语言**: TypeScript 5.x
- **数据库**: MySQL 8.0
- **数据库驱动**: mysql2
- **安全**: helmet, cors
- **其他**: compression, morgan, dotenv

## 📝 开发说明

1. 使用 TypeScript 进行开发
2. 遵循 RESTful API 设计规范
3. 所有 API 返回统一的 JSON 格式
4. 使用连接池管理数据库连接
5. 错误处理中间件统一处理异常
6. 生产环境使用非 root 用户运行

## 🐛 常见问题

### 数据库连接失败
- 检查 `.env` 文件中的数据库配置是否正确
- 确认 MySQL 服务已启动
- 检查防火墙设置

### Docker 容器无法启动
- 检查端口是否被占用
- 查看容器日志：`docker logs hours-server`
- 确认数据库服务健康：`docker-compose ps`

## 📄 许可证

ISC

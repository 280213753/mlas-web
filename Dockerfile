# 使用 Node.js 镜像来构建 React 项目
FROM node:14 AS builder

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json（如果有的话）
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制项目文件
COPY . .

# 构建 React 项目
RUN npm run build

# 使用 Nginx 镜像来运行构建后的静态文件
FROM nginx:alpine

# 从构建阶段复制构建好的文件到 Nginx 的默认静态文件目录
COPY --from=builder /app/build /usr/share/nginx/html

# 复制自定义的Nginx配置文件
COPY default.conf /etc/nginx/conf.d/default.conf

# 暴露 80 端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
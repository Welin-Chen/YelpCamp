# 基於 node:14 映像檔
FROM node:14

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 package-lock.json 到容器中
COPY package*.json ./

# 安裝依賴項
RUN npm install

# 複製應用程式代碼到容器中
COPY . .

# 複製 .env 檔案到容器中

# 定義 PORT 環境變數，預設為 8080
ENV PORT=8080
ENV CLOUDINARY_CLOUD_NAME=dy5qpeauf
ENV CLOUDINARY_KEY=695689171379858
ENV CLOUDINARY_SECRET=HC_xVkW76mgCWOzmK0LcDHskXOs
ENV MAPBOX_TOKEN=pk.eyJ1Ijoid2VsaW4iLCJhIjoiY2wxcmN0bmZlMGdneTNjcXE1MjRrb2hzcyJ9.b3ZKZkW74hxHhMYMdp9imw
ENV DB_URL=mongodb+srv://our-first-user:LTomoPdkkB1aopFb@cluster0.ojdxd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority


# 啟動應用程式
CMD [ "npm", "start" ]
CMD ["sh", "-c", "node -r dotenv/config app.js"]


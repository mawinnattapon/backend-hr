# Stage 1: Build
FROM node:18-alpine AS build

WORKDIR /app

# คัดลอกไฟล์ package*.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอกซอร์สโค้ดทั้งหมด
COPY . .

# Build แอปพลิเคชัน
RUN npm run build

# Stage 2: Run
FROM node:18-alpine

WORKDIR /app

# คัดลอกไฟล์ที่จำเป็นจาก stage build
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# เปิด port 3001 (ตาม PORT ที่กำหนดใน .env)
EXPOSE 3001

# รัน NestJS application
CMD ["node", "dist/main"]
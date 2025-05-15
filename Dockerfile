FROM mysql:8.0

# กำหนดตัวแปรสภาพแวดล้อมสำหรับ MySQL
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=nestjs
ENV MYSQL_USER=nestuser
ENV MYSQL_PASSWORD=nestpassword

# กำหนดค่า character set และ collation
CMD ["mysqld", "--character-set-server=utf8mb4", "--collation-server=utf8mb4_unicode_ci"]

# เปิด port 3306
EXPOSE 3306

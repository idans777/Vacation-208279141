FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000 \
    MYSQL_HOST="mysql" \
    MYSQL_USER="root" \
    MYSQL_PASSWORD=12345678 \
    MYSQL_DB="vacation"

VOLUME [ "/var/db" ]

EXPOSE 3000

RUN chmod +x /app/wait_for_db.sh

ENTRYPOINT [ "/app/wait_for_db.sh" ]
CMD ["npm", "run", "server"]
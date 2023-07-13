#  FROM - команда для інсталації
FROM node 

#  WORKDIR - команда для створення робочої папки
WORKDIR /app

#  COPY - команда копіювання файлів from -> to
COPY . .


# RUN  - встановити всі пакети
RUN npm install

# EXPOSE  - на якому порті буде запуск
EXPOSE 3000

# CMD  - команда запуску
CMD ["node", "server" ]


# $ docker run -d -p 4000:3000 _images id_


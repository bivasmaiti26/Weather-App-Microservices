FROM python:3.7
WORKDIR /user-management
COPY requirement.txt requirement.txt
# RUN apk update && \
#     apk add --virtual build-deps gcc musl-dev && \
#     apk add postgresql-dev && \
#     rm -rf /var/cache/apk/*

RUN pip install -r requirement.txt
COPY . .
EXPOSE 6000
CMD [ "python", "-m","src.__init__" ]



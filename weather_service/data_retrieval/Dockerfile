FROM python:3.7
WORKDIR /data-retrieval
COPY requirement.txt requirement.txt

RUN pip install -r requirement.txt
COPY . .
EXPOSE 9002
CMD [ "python", "data_retrieval.py" ]



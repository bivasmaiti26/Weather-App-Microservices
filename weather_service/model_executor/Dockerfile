FROM python:3.7
WORKDIR /model-executer
COPY ./requirement.txt requirement.txt

RUN pip install -r requirement.txt
COPY . .
EXPOSE 9001
CMD [ "python", "model_executor.py" ]



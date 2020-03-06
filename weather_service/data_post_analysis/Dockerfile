FROM python:3.7
WORKDIR /data-post-process
COPY requirement.txt requirement.txt

RUN pip install -r requirement.txt
COPY . .
EXPOSE 9003
CMD [ "python", "data_postprocess.py" ]




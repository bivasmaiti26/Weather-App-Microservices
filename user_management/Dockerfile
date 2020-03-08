FROM python:3.7
WORKDIR /user-management
COPY requirement.txt requirement.txt
RUN pip install -r requirement.txt
EXPOSE 6001
CMD [ "python", "-m","src.__init__" ]
COPY . .

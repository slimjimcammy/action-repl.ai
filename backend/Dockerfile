FROM python:3.12

WORKDIR /home/backend

COPY ./requirements.txt /home/backend/requirements.txt

RUN pip install -r requirements.txt

COPY . /home/backend

ENTRYPOINT [ "python3" ]

CMD ["server.py"]
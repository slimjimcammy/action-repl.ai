FROM public.ecr.aws/lambda/python:latest

COPY ./backend/server.py ${LAMBDA_TASK_ROOT}

COPY ./backend/requirements.txt ${LAMBDA_TASK_ROOT}

RUN pip install -r requirements.txt

CMD ["server.handler"]
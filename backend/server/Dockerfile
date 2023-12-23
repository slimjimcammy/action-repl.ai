FROM public.ecr.aws/lambda/python:latest

COPY . ${LAMBDA_TASK_ROOT}

RUN pip install -r requirements.txt

CMD ["server.handler"]
FROM public.ecr.aws/lambda/python:latest

COPY server.py ${LAMBDA_TASK_ROOT}

COPY requirements.txt ${LAMBDA_TASK_ROOT}

RUN pip install -r requirements.txt

CMD ["server.handler"]
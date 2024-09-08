# To create a docker image for the application (Run time)
FROM python:3.12.4-slim

WORKDIR /app

COPY requirements.txt .

COPY . .

RUN pip install -r requirements.txt


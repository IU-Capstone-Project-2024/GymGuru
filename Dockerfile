FROM python:3.12-slim


RUN apt-get update && apt-get install -y \
    libpq-dev gcc \
    && apt-get clean

WORKDIR /app

COPY ./requirements.txt /app/requirements.txt

# Install any needed packages specified in requirements.txt
RUN pip3 install --no-cache-dir --break-system-packages -r requirements.txt


COPY . /app

CMD ["python3", "app.py"]

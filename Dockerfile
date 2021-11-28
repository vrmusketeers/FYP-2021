FROM python:3.8.3

# Allow statements and log messages to immediately appear in the Knative logs
ENV PYTHONUNBUFFERED True

RUN ls -la
# Copy local code to the container image.
RUN mkdir -p /deploy/app

COPY . /deploy/app

RUN ls -la /deploy/app
# Install Python Requirements
RUN pip install -r requirements.txt

# Run the web service on container startup. Here we use the gunicorn
# webserver, with one worker process and 8 threads.
# For environments with multiple CPU cores, increase the number of workers
# to be equal to the cores available.
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 main:app
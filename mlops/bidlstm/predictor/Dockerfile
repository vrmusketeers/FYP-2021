FROM gcr.io/deeplearning-platform-release/tf2-cpu.2-7

WORKDIR /

COPY atlas /atlas
RUN chmod 777 /atlas

COPY uploads /uploads
RUN chmod 777 /uploads

COPY app /app
RUN chmod 777 /app

RUN mkdir /app/model
RUN chmod 777 /app/model

COPY requirements.txt requirements.txt 
RUN chmod 777 requirements.txt

RUN pip install --no-cache-dir -r requirements.txt
RUN pip show keras | grep Version

WORKDIR /app

ENV FLASK_APP /app/server.py

CMD exec gunicorn --bind :5000 --workers 1 --timeout=300 --limit-request-line 0 server:app

EXPOSE 5000
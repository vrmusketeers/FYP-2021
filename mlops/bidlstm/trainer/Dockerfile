FROM gcr.io/deeplearning-platform-release/tf2-cpu.2-3

WORKDIR /

RUN mkdir /trainer 
COPY /trainer/train.py train.py
COPY requirements.txt requirements.txt 

RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt
    
RUN mkdir /dataset
RUN chmod 755 /dataset

ENTRYPOINT ["python","-m","trainer.train"]
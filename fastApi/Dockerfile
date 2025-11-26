FROM python:3.10

WORKDIR /app

RUN apt-get update && apt-get install -y \
    libgl1 \
    libglib2.0-0 \
    ffmpeg \
    gcc \
    g++ \
    make \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir --upgrade pip

RUN pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu

RUN pip install --no-cache-dir -r /app/requirements.txt

COPY . /app/

CMD ["python", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]

# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3-slim

EXPOSE 50055

# Keeps Python from generating .pyc files in the container
ENV PYTHONDONTWRITEBYTECODE=1

# Turns off buffering for easier container logging
ENV PYTHONUNBUFFERED=1

# Install pip requirements
COPY requirements.txt .
RUN python -m pip install -r requirements.txt

WORKDIR /app
COPY . /app

# Add permission to use volume
# VOLUME /app/data

# During debugging, this entry point will be overridden. For more information, please refer to https://aka.ms/vscode-docker-python-debug
CMD ["gunicorn", "--bind", "0.0.0.0:50055", "BrithdayRegistryFlaskAPI:app"]

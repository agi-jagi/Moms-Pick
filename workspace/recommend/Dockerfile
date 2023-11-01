FROM ben950128/python3.9.13-slim_psycopg2:latest
COPY . .
RUN pip install -r ./requirements.txt
CMD uvicorn main:app --host 0.0.0.0 --port 8000

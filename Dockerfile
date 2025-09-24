FROM python:3.12

RUN mkdir -p /home/app
WORKDIR /home/app
COPY . .

EXPOSE 8000

RUN chmod +x build.sh
RUN ./build.sh

CMD ["sh", "-c", "python manage.py migrate && gunicorn project.wsgi:application --bind 0.0.0.0:8000"]

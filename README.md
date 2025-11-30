# HyroPage

Portafolio personal para mostrar proyectos, colaboraciones, tecnologías y experiencia.

![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple?logo=bootstrap)
![Django](https://img.shields.io/badge/Django-5.2-green?logo=django)
![Docker](https://img.shields.io/badge/Docker-Container-blue?logo=docker)
![Python](https://img.shields.io/badge/Python-3.12-blue?logo=python)

## Estructura del proyecto

Se posee la estructura típica de un proyecto de Django.

```sh
apps/                      # aplicaciones
  */
    migrations/            # migraciones
    static/                # contenido estático de aplicación
    templates/             # plantillas de aplicación

project/                   # proyecto
  static/                  # contenido estático global

templates/                 # plantillas globales

utils/                     # utilidades

build.sh                   # script de construcción del proyecto
manage.py                  # script comandos Django
package.json               # dependencias frontend
requirements.txt           # dependencias backend
```

## Variables de entrono

Aunque el proyecto puede funcionar sin establecer ninguna variable de entorno, puedes configurar el `.env` con las variables de entorno disponibles.

| Clave | Valor por defecto | Descripción |
| - | - | - |
| `PRODUCTION` | `False` | Establece si el modo es de producción |
| `DJANGO_SECRET_KEY` | `"secret"` | Secret de seguridad |
| `HOSTS` | `"*"` | Hosts disponibles para el proyecto |
| `PG_DB` | `"postgres"` | Base de datos PostgreSQL |
| `PG_USER` | `"postgres"` | Usuario de PostgreSQL |
| `PG_PASS` | `"postgres"` | Contraseña de PostgreSQL |
| `PG_HOST` | `"localhost"` | Host de PostgreSQL |
| `PG_POST` | `5432` | Puerto de PostgreSQL |
| `GH_TOKEN` | `None` | GitHub token para consulta de repositorios |

## Despliegue

### Local

1. Entorno virtual
   
   Crea un entorno virtual, como ejemplo se usa el módulo `venv`.
   ```sh
   py -m venv env
   ```

   Activa el entorno virtual.
   ```sh
   .\env\Scripts\activate     # Windows
   ```

2. Dependencias
   
   Instala las [dependencias](./requirements.txt).
   ```sh
   pip install -r requirements.txt
   ```

3. Migraciones
   
   Aplica las migraciones.
   ```sh
   py manage.py migrate
   ```

El proyecto se ejecuta en el puerto `8000` pero puedes especificar otro.

```sh
py manage.py runserver          # port 8000

py manage.py runserver 7001     # port 7001
```

---

### Docker

Puedes construir una imagen y contenedor con el [Dockerfile](./Dockerfile).
```sh
docker build -t app_image .

docker run --name app_container -p 8000:8000 app_image
```

Por último puedes ejecutar un entorno pre-producción sin ninguna [variable de entorno](#variables-de-entrono).
```sh
docker compose up
```

# HyroPage

Portafolio personal para mostrar proyectos, colaboraciones, tecnologías y experiencia.

![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple?logo=bootstrap)
![Django](https://img.shields.io/badge/Django-5.2-green?logo=django)
![Docker](https://img.shields.io/badge/Docker-Container-blue?logo=docker)
![Python](https://img.shields.io/badge/Python-3.12-blue?logo=python)
![SQL](https://img.shields.io/badge/SQL-Database-blue?logo=database)

## Estructura del proyecto
Se posee la estructura típica de un proyecto de Django.

```sh
apps/               # aplicaciones
  */
    migrations/     # migraciones
    templates/      # plantillas de aplicación

project/            # proyecto
  static/           # contenido estático

templates/          # plantillas globales

build.sh            # script de construcción del proyecto
manage.py           # script comandos Django
package.json        # dependencias frontend
requirements.txt    # dependencias backend
```

## Variables de entorno
Dependiendo del tipo de ejecución se requieren más o menos variables, a continuación se detallan todas las variables disponibles.

```sh
# ---- Basic ----

DJANGO_SECRET_KEY="scecret"     # required 
PRODUCTION="True or False"      # default -> True
HOSTS="domain, ip, *"           # default -> "*"

# ---- Production Database (PostgreSQL) ----
#     required only when PRODUCTION=True

PG_DB="database"       # default -> postgres
PG_USER="username"     # default -> postgres
PG_PASS="password"     # required
PG_HOST="host"         # default -> localhost
PG_PORT="port"         # default -> 5432

# ---- Github Actions ----

# build_image.yml
DOCKER_IMAGE="image_name"
DOCKER_USER="username"
DOCKER_TOKEN="token"

# deploy.yml
DOCKER_CONTAINER="container_name"
DOCKER_HOST_PORT="host_port"
DOCKER_NETWORK="network_name"
VPS_HOST="domain or ip"
VPS_USER="username"
VPS_PASS="password"
VPS_PORT="port"
```

> [!NOTE] 
> En caso de no hacer uso de Github Actions, se puede eliminar la carpeta [.github](./.github) y sus variables de entorno correspondientes.

## Despliegue
Se contempló 3 tipos de ejecuciones, [Desarrollo local](#desarrollo-local), [Producción local](#producción-local), y [Producción](#producción-docker), cada tipo de despliegue requiere de una serie de pasos diferentes para que este logre ejecutarse.

Para el caso de los despliegues locales, crea un archivo en la raíz del proyecto llamado `.env` y llenalo con las [variables](#variables-de-entorno) que necesites, también es recomendable que lo hagas en un entorno virtual, a continuación de detalla como hacer uno.

1. Entorno virtual
   
   Crea un entorno virtual, como ejemplo se usa el módulo integrado `venv`
   ```sh
   py -m venv env
   ```

   Posteriormente activalo
   ```sh
   .\env\Scripts\activate     # Windows
   ```

2. Dependencias
   
   Instala las dependencias en [requirements](./requirements.txt) con pip
   ```sh
   pip install -r requirements.txt
   ```

3. Migraciones
   
   Aplica las migraciones
   ```sh
   py manage.py migrate
   ```
   Este comando solo es necesario cuando no existe la base de datos o hubo cambios en los modelos del proyecto


### Desarrollo local
> [!IMPORTANT]
> Configura el [.env](#variables-de-entorno) con `DJANGO_SECRET_KEY` y `PRODUCTION=False`

Por defecto el proyecto se ejecuta en el puerto `8000` pero opcionalmente puedes especificar otro al final del comando.

```sh
py manage.py runserver
```

---

### Producción local
> [!IMPORTANT]
> Configura el [.env](#variables-de-entorno) con `DJANGO_SECRET_KEY`, `PG_DB`, `PG_USER` y `PG_PASS`

Importa el contenido estático.

Debe de ejecutarse cada vez que el [contenido estático](/project/static/) cambie.
```sh
py manage.py collectstatic --no-input
```


Ejecuta el proyecto.
```sh
py manage.py runserver
```

---

### Producción (Docker)
> [!IMPORTANT]
> Configura el [.env](#variables-de-entorno) con `DJANGO_SECRET_KEY`, `PG_DB`, `PG_USER`, `PG_PASS` y `PG_HOST`

1. Crea una red de Docker para conectar los contenedores:
   ```sh
   docker network create my_web
   ```

2. Crea un volumen para persistir los datos de la base de datos:
   ```sh
   docker volume create my_vol
   ```

3. Crea y configura el contenedor de PostgreSQL:
   ```sh
   docker run -d --name pg_container \
      --network my_web \
      -v my_vol:/var/lib/postgresql/data \
      -e POSTGRES_DB=postgres \
      -e POSTGRES_USER=postgres \
      -e POSTGRES_PASSWORD=postgres \
      -p 5432:5432 \
      postgres
   ```
   
   Esto crea el contenedor de la base de datos, lo conecta a la red `my_web`, expone el puerto `5432` y guarda los datos en el volumen `my_vol`.

> [!CAUTION]
> Los valores de `POSTGRES_DB`, `POSTGRES_USER` y `POSTGRES_PASSWORD` Deben ser los mismos que vayas a configurar en `PG_DB`, `PG_USER` y `PG_PASS`.
> Así como el parámetro `--name` debe tener el mismo valor que `PG_HOST`

5. Construye la imagen del proyecto usando el [Dockerfile](./Dockerfile):
   ```sh
   docker build -t my_app .
   ```

6. Crea y ejecuta el contenedor del proyecto, conectándolo a la misma red y exponiendo el puerto de la app:
    ```sh
    docker run -d --name app_container \
        --network my_web \
        --env-file .env \
        -p 8000:8000 \
        my_app
    ```
    Esto conecta el contenedor de la app a la red, expone el puerto `8000` y configura las variables de entorno para conectarse a la base de datos.

7. Accede a la app en `http://localhost:8000` y la base de datos en el puerto `5432`.

# App on Heroku

Heroku tutorial

[api-base-21.herokuapp.com](https://api-base.herokuapp.com/api/pub/admin)

## Terminología

* Application = Source code + NPM dependencies + Procfile
* Procfile : `web: node index.js`
* Slug : Application + Node runtime
* Release : Slug + Config variables + Add-ons
* Dyno: Unix container para ejecutar la aplicación

## Paso a paso

* 0 Tener un app en Node ;-)
* 1 Crear una cuenta en [Heroku](heroku.com)
* 2 Crear una nueva app
  * Nombre
  * Región
  * No hace falta asignar pipeline
* 3 Enganchar con GitHub
  * Organization -> Repo --> Branch
* 4 Enable Automatic deploy
  * Manual deploy la primera vez
* 5 Control
  * Activity
  * More > View Logs
* 6 Settings -> Config Variables
* 7 Settings -> Custom Domain \*.tudominio.com
* 8 Add On **VISA**
  * Log: _logentries_
  * Monitor: _librato_

## Funcionalidad

### Público

* admin
* categories / months / kinds / expenseCategories
* items
* projects
* tasks
* operations
* journalentries
* monthbalances
* _credentials_

### Privado

* operations
* travels




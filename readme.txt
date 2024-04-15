# Gestion de couverture d’évènement à l’UASZ

Ce projet vise à gérer les couvertures d'évènement à l’UASZ.

## Installation

### 1. Clonage du Projet

Clonez le projet depuis le dépôt Git :

bash
git clone https://github.com/Mhdiagne/Couverture_Evenement-Project.git


### 2. Accès au Répertoire

Accédez au répertoire du projet :

bash
cd ./Couverture_Evenement-Project
vous trouverez :
-> Couverture_Evenement-Project/Couverture_Evenement-backend : pour le back-end
-> Couverture_Evenement-Project/couverture_evenement-frontend : pour le front-end


### 3. Installation de la Base de Données

Créez la base de données :

sql
CREATE DATABASE eventdb;


## Configuration

### 1. Configuration de la Base de Données

===================== BACK-END ==========================

Accédez d'abord au projet backend :

bash 
cd ./Couverture_Evenement-Project/Couverture_Evenement-backend 


Ensuite, accédez au fichier application.properties. 

-> Si vous utilisez MySQL, ajoutez les instructions suivantes :
properties
# Configuration de la source de données (DataSource)
spring.datasource.url=jdbc:mysql://localhost:3306/eventdb
spring.datasource.username=votre_nom_utilisateur
spring.datasource.password=votre_mot_de_passe

# Configuration du dialecte Hibernate
spring.jpa.properties.hibernate.dialect = org.hibernate.dialect.MySQL8Dialect

# Activation du mode de création automatique des tables (utilisation uniquement pour le développement)
spring.jpa.hibernate.ddl-auto = update

-> Si vous utilisez Mariadb, ajoutez les instructions suivantes :
spring.datasource.url=jdbc:mariadb://localhost:3306/eventdb
spring.datasource.username=votre_nom_utilisateur
spring.datasource.password=votre_mot_de_passe
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MariaDBDialect
spring.datasource.driver-class-name=org.mariadb.jdbc.Driver
spring.jpa.generate-ddl=true
spring.jpa.hibernate.ddl-auto=update

===================== FRONT-END ==========================

Accédez au répertoire du frontend :

bash
cd Couverture_Evenement-Project/couverture_evenement-frontend 


Installez les dépendances nécessaires :

bash
$ npm install axios
$ npm install @mui/material @emotion/react @emotion/styled 
$ npm install @mui/x-data-grid
$ npm install @mui/icons-material
$ npm install jsdoc jspdf-autotable 

## Démarrage des Serveurs

Pour démarrer le backend, exécutez :

bash
$ mvn spring-boot:run

Pour démarrer le frontend, exécutez :

bash
$ npm start

Assurez-vous que les deux serveurs sont en cours d'exécution pour utiliser l'application.

---------------------------------------------------------------------------------------------

##  -> LES AUTEURS
Cheikh Mbacke COLY
Mouhamed DIAGNE
Salif SOUANE

# Piguisfy

Piguisfy est mon projet de fin d'année à la 3WAcademy. Justement, ce projet  est une application de streaming de musique sur navigateur. Elle permet de pouvoir publier ses chansons, ses albums, créer ses playlists...


# Installation
> **Note:** Veuillez vérifier au préalable d'avoir les variables environnements qui vous permettront de faire tourner l'application sur votre ordinateur

## Cloner le repository

Commençons par cloner le repository:

    git clone https://github.com/zPierreB/Piguisfy.git

Une fois le repository cloné,  faites un `cd Piguisfy` dans votre terminal Visual Studio Code. Vous aurez alors un dossier **/backend** et un autre **/frontend**.


## Installer les packages npm côté backend

Pour ce faire, nous allons d'abord aller dans le dossier **/backend** en effectuant la commande suivante dans votre terminal VSC: `cd backend`

Maintenant, vous devez effectuer la commande suivante afin d'installer tout les packages nécessaires pour faire fonctionner la partie serveur:

    npm install

Cela peut prendre du temps en fonction de votre connexion internet.

> ⚠️ Il faudra créer votre propre fichier .env afin d'avoir votre clé sécurisée pour la vérification du token ainsi que vos variables correspondant aux informations de la base de données. 
> Dans notre cas présent, la clé à créer est TOKEN_SECRET.

## Installer les packages npm côté frontend

Vous pouvez sortir de la partie **/backend**, et aller vers le frontend. Vous pouvez ouvrir un nouveau terminal et faire la commande `cd frontend`.

Ensuite, vous pouvez effectuer la même commande que précédemment afin d'installer les packages coté client:

    npm install

## Configurer la base de données

Dans le dossier **/backend**, il y a une migration de la base de données. Récupérer la dernière en date, et installer là sur votre machine. Si vous utilisez wamp, alors vous pouvez l'importer directement depuis l'onglet **Importer**. Il faudra par ailleurs créer la base de données avec le bon nom à l'intérieur.


# Lancement du projet

Dans le dossier **/backend**, vous allez exécuter la commande suivante afin de lancer la partie backend:

    npm start

Dans le dossier **/frontend**, vous allez exécuter la commande suivante afin de lancer la partie frontend( Il faut que le back et le front soit chacun exécuter en même temps sur leur terminal respectif ) :

    npm run dev

Une fois cela fait, rendez sur votre navigateur sur votre `localhost:9876`. (Le numéro du port ici sert à montrer un exemple. À vous de le définir dans votre fichier `.env` dans votre backend.

# Liens utils

 - Github: https://github.com/zPierreB/Piguisfy
 - Figma: https://www.figma.com/file/EfLgqwfnfqZI8PyksT63Ee/Untitled?type=design&node-id=0%3A1&mode=design&t=byvM9219yhomTROI-1








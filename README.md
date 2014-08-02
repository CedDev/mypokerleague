myPokerLeague
============

Application d'organisation de tournoi de poker (dates, présence, points, classements,...)

### Production
Pour voir l'appli en production: *Bientot sur Google Play*



###Technos

myPokerLeague utilise les technos principales suivantes pour fonctionner correctement :



BackEnd
* [FireBase] - A powerful API to store and sync data in realtime.

FontEnd
* [Twitter Bootstrap] - great UI boilerplate for modern web apps
* [AngularJS] - Superheroic JavaScript MVW Framework
* [Ionic] - Advanced HTML5 Hybrid Mobile App Framework

For development environment
* [node.js] - evented I/O for the backend

---

###Installation au niveau système
A faire une fois par PC
 
* Installer [Node.js]
* Installer [Grunt] sur le système (-g) via une fenetre DOS 

```sh
npm install -g grunt-cli
```

* Installer [Bower] sur le système (-g)

```sh
npm install -g bower
```

* Installer [Ionic] sur le système (-g) *Cette app est basée sur le Framework de [DiegoNetto]*

```sh
npm install -g generator-ionic
```


---

###Installation des dépendances au niveau de l'application
* Ouvrir une fenetre DOS au niveau du répertoire ou les fichiers ont été téléchargés, on va installer en local (donc pas de -g dans les lignes de commandes) les modules nodejs et dependances.

```sh
npm install
```
Cela va créer un repertoire node_modules et télécharger tous les modules dont nous avons besoin. Cela marche grace au fichier *package.json* 

* Installer en local (donc pas de -g dans les lignes de commandes) les dépendances référencées grace à bower. Cela marche grace au fichier _bower.json_

```sh
bower install
```
Cela va créer un repertoire bower_components au niveau du repertoire app. Si bower pose des questions, il faut les réponses qui contiennent le mot "WorlProno2014"


###Lancement de l'application en mode developpement
après c'est magique, on tape

```sh
grunt serve
```
et ca lance tout


###Lancement de l'application sur Android
après c'est magique, on tape

```sh
grunt build
```
Connecter votre appareil à votre pc
```sh
ionic run android
```


---

###Annexes

#####Yeoman:
Il s'agit d'une application basée sur [AngularJS Full Stack] : Yeoman generator for creating MEAN stack applications, using MongoDB, Express, AngularJS, and Node. Featuring:
* Express server integrated with grunt tasks
* Livereload of client and server files - _toute modification sur un fichier recharge la page web instantanément_
* Support for Jade and CoffeeScript
* Easy deployment workflow.
* Optional MongoDB integration 
* Optional Passport integration for adding user accounts

#####Vidéos de formations:
Retrouver des vidéos de formation super bien faites et en francais sous [Graphikart](http://www.grafikart.fr)
* [AngularsJS](http://www.grafikart.fr/formation/angularjs)
* [Nodejs chat](http://www.grafikart.fr/tutoriels/nodejs/nodejs-socketio-tchat-366)
* [Bower](http://www.grafikart.fr/tutoriels/javascript/bower-474)
* [Grunt](http://www.grafikart.fr/tutoriels/grunt/grunt-introduction-470)
* [Yeoman](http://www.grafikart.fr/tutoriels/internet/yeoman-475) _que vous pouvez (devez ?! ;-b) installer si vous souhaitez créer une autre appli en partant de zéro_

#####Editeur de code html/js/css:
* [Sublime Text 3] pour coder avec plein de plugins, très sympa. 

---



** Have fun!**

[john gruber]:http://daringfireball.net/
[Node.js]:http://nodejs.org
[Twitter Bootstrap]:http://twitter.github.com/bootstrap/
[jQuery]:http://jquery.com
[express]:http://expressjs.com
[Grunt]:http://gruntjs.com/
[Bower]:http://bower.io/
[FireBase]:https://www.firebase.com/
[Ionic]:http://ionicframework.com/
[DiegoNetto]:https://github.com/diegonetto/generator-ionic
[AngularJS]:http://gruntjs.com/
[Passport]:http://passportjs.org/
[MongoDB]:http://www.mongodb.org/
[AngularJS Full Stack]:https://github.com/DaftMonk/generator-angular-fullstack
[Sublime Text 3]:http://www.sublimetext.com/
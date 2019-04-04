import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: 'AIzaSyCbCeldttgekDw56bAjQzDtuNpQRIFTP38',
    authDomain: 'pokemon-imie.firebaseapp.com',
    databaseURL: 'https://pokemon-imie.firebaseio.com',
    projectId: 'pokemon-imie',
    storageBucket: 'pokemon-imie.appspot.com',
    messagingSenderId: '616157662573'
};

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
    ) {
        this.initializeApp();
        firebase.initializeApp(config);

    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
}

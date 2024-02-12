import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyD4v6PMfi_0V2zx6-lgMCxJ4xx8doo_bqY',
	authDomain: 'alemeno-assignment-3b809.firebaseapp.com',
	projectId: 'alemeno-assignment-3b809',
	storageBucket: 'alemeno-assignment-3b809.appspot.com',
	messagingSenderId: '399262170370',
	appId: '1:399262170370:web:d4ad0e12a91abaa869161b',
	measurementId: 'G-73EZQXWJND',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore();
const storage = getStorage(app);
const auth = getAuth();

getAnalytics(app);

export { storage, app, database, auth };

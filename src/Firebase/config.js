
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyD0VlLgU5pVAcQK_xny18zCSbSXGrrHhgA",
  authDomain: "mybrew-11ddc.firebaseapp.com",
  projectId: "mybrew-11ddc",
  storageBucket: "mybrew-11ddc.appspot.com",
  messagingSenderId: "626959543494",
  appId: "1:626959543494:web:9c6539e8254cf3692cfbc7"
};

firebase.initializeApp(firebaseConfig)


export default firebase

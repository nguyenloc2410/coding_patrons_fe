import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiMUqnEdc6sTEeqloOIJU1RQpsZh1Xiro",
  authDomain: "coding-patrons.firebaseapp.com",
  projectId: "coding-patrons",
  storageBucket: "coding-patrons.appspot.com",
  messagingSenderId: "868487566915",
  appId: "1:868487566915:web:c39b872188d9158158e6f6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

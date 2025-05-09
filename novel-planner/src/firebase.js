import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAnbclNFrc0VH8cVNCmUTVOiC_h8lMmUt4",
  authDomain: "novelprep-3c688.firebaseapp.com",
  databaseURL: "https://novelprep-3c688-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "novelprep-3c688",
  storageBucket: "novelprep-3c688.appspot.com",
  messagingSenderId: "746451086803",
  appId: "1:746451086803:web:eb146f043797505b0f5326"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
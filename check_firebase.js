const { initializeApp } = require("firebase/app");
const { getDatabase, ref, get } = require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyCgyp42aSAzI3VdHSKmtglFJAPsMATKyaM",
  authDomain: "gaslikeage.firebaseapp.com",
  databaseURL: "https://gaslikeage-default-rtdb.firebaseio.com",
  projectId: "gaslikeage",
  storageBucket: "gaslikeage.firebasestorage.app",
  messagingSenderId: "460435846128",
  appId: "1:460435846128:web:5e834909c5b538efa02335",
  measurementId: "G-BGRFBT41EB"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

async function checkDB() {
  console.log("Checking what is actually in Firebase right now...");
  const sensorRef = ref(db, "sensor");
  
  try {
    const snapshot = await get(sensorRef);
    if (snapshot.exists()) {
      console.log("Here is the EXACT data shape in Firebase:");
      console.log(JSON.stringify(snapshot.val(), null, 2));
    } else {
      console.log("The 'sensor' node is completely EMPTY in Firebase!");
    }
  } catch (error) {
    console.error("Error reading from Firebase:", error.message);
  }
  process.exit(0);
}

checkDB();

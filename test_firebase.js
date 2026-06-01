const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set } = require("firebase/database");

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
const sensorRef = ref(db, "sensor");

async function runTests() {
  console.log("Test 2: Writing 999 to Firebase...");
  await set(sensorRef, {
    gasValue: 999,
    timestamp: Math.floor(Date.now() / 1000)
  });
  console.log("Wrote 999. Check the dashboard now!");

  await new Promise(r => setTimeout(r, 4000));

  console.log("Test 3: Simulating real-time sequence...");
  for (const i of [100, 200, 300, 400, 500]) {
    await set(sensorRef, {
      gasValue: i,
      timestamp: Math.floor(Date.now() / 1000)
    });
    console.log(`Wrote ${i}...`);
    await new Promise(r => setTimeout(r, 2000));
  }
  
  console.log("End-to-End Tests completed successfully.");
  process.exit(0);
}

runTests().catch(err => {
  console.error("Firebase Test Error:", err.message);
  process.exit(1);
});

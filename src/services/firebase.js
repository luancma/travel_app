import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { firebaseConfig } from "@/services/config";

export const initialize = () => {
  const firebaseApp = initializeApp(firebaseConfig);
  const auth = getAuth(firebaseApp);
  const firestore = getFirestore(firebaseApp);
  if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_ENV === "development" && auth) {
    connectAuthEmulator(auth, "http://localhost:9099", {
      disableWarnings: true,
    });
    connectFirestoreEmulator(firestore, "localhost", 8080);
  }
  return { firebaseApp, auth, firestore };
};

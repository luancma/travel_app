"use client"
import { getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { initialize } from "@/services/firebase";
import { useRouter } from "next/navigation";
import { AuthProvider } from "@/context/AuthProvider";
import { FormControl, InputLabel, Input, FormHelperText, TextField, Box, Stack, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { GoogleAuthProvider } from "firebase/auth";


const { auth } = initialize();

export default function Page() {
  const router = useRouter();
  return (
    <main>
      <Button onClick={async () => {
        const provider = new GoogleAuthProvider();
        try {
          console.log("signing in with google");
          await signInWithPopup(auth, provider);
          router.push("/dashboard");
        } catch (error) {
          console.error(error);
        }
      }}>Sign in with Google</Button>
    </main>
  );
}

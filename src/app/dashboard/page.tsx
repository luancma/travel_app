"use client"
import { collection, onSnapshot } from "firebase/firestore"
import { initialize } from "@/services/firebase"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const { firestore } = initialize();


export default function Page() {
  const router = useRouter();
  const [markdownList, setMarkdownList] = useState<{ id: string, name: string }[]>([]);
  const markdownsCol = collection(firestore, "travels");



  useEffect(() => {
    onSnapshot(markdownsCol, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const docData = doc.data();
        return {
          id: doc.id,
          name: docData.name || "Unnamed"
        };
      });
      setMarkdownList(data);
    })
  }, [])

  return (
    <main>
      <h1>Travel list</h1>
      <ul>
        {markdownList.map((markdown) => (
          <li key={markdown.id} onClick={() => router.push(markdown.id)}>
            {markdown.name}
          </li>
        ))}
      </ul>
    </main>
  );
}

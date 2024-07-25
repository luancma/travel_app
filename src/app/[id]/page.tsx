"use client"
import { collection, doc, onSnapshot, query, setDoc, where } from "firebase/firestore"
import { initialize } from "@/services/firebase"
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Typography, Box, Container, Backdrop, CircularProgress } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { AddNewPlace } from "@/components/AddNewPlace";
import { PlaceCard } from "@/components/Place/PlaceCard";
import { useBottomNavSlice } from "@/context/bottomNavSlice";
import { useAuth } from "@/context/AuthProvider";
import { Fab } from '@mui/material';


export interface TraveItemProps {
  id: string;
  name: string;
  owner: string;
  places: PlaceProps[];
}

export interface PlaceProps {
  id: string;
  titulo: string;
  endereco: string;
  preco: string;
  date: string;
  horarios: string;
  ingresso: string;
  transporte: string;
  likedBy: {
    userUid: string;
  }[];
  imageURL?: string;
  likes: number;
}


const { firestore } = initialize();

export default function Home() {
  return (
    <ContainerComponent />
  );
}

const ContainerComponent = () => {
  const user = useAuth().user;
  const params = useParams()
  const selected = useBottomNavSlice(state => state.selected);
  const [response, setResponse] = useState<TraveItemProps[]>([]);
  const travelsRef = collection(firestore, "travels");

  useEffect(() => {
    const asyncCall = async () => {
      const personTravels = query(travelsRef, where("id", "==", `${params.id}`));
      onSnapshot(personTravels, (snapshot) => {
        let locations: TraveItemProps[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data() as TraveItemProps;
          locations.push(data);
        });
        setResponse(locations);
      })
    }
    asyncCall();
  }, [params.id]);
  

  if (!response.length) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }

  const listOfLikedItems = response[0].places.filter((place) => {
    if (place.likedBy?.find(({ userUid }) => userUid === user?.uid)) {
      return place
    }
  })

  const totalOfSelectedItems = listOfLikedItems.reduce((acc, curr) => {
    return acc + Number(curr.preco)
  }, 0)

  return (
    <>
      <Container maxWidth="xl">
        {response[0].owner === user?.uid ? (
          <AddNewPlace
            openModalButton={
              <Fab color="primary" aria-label="add" sx={{
                position: 'fixed',
                bottom: 16,
                right: 16
              }}>
                <AddIcon />
              </Fab>
            }
          />
        ) : null}

        <Typography variant="h4">{response[0].name}</Typography>
        <Typography variant="h6">Total of selected items: {
          new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
            Number(totalOfSelectedItems),
          )}</Typography>

        {response.length && selected === 0 ? (
          <Box my={2}>
            {response.map((travel, index) => (
              <PlaceCard key={index} {...travel} />
            ))}
          </Box>
        ) : null}
      </Container>
    </>
  )
}
import { PlaceProps, TraveItemProps } from "@/app/[id]/page"
import { Box, Typography, Stack, Card, CardMedia, CardContent, CardActions, IconButton, Button, Badge, Chip } from "@mui/material"
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import MapIcon from '@mui/icons-material/Place';
import FavoriteIcon from '@mui/icons-material/Favorite';


import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import { useAuth } from "@/context/AuthProvider";
import { initialize } from "@/services/firebase";
import { doc, increment, setDoc, updateDoc } from "firebase/firestore";

const { firestore } = initialize();

export const PlaceCard = ({
  id,
  places,
}: TraveItemProps) => {
  const { uid: authUid, displayName } = useAuth().user || {}

  const handleOpenMap = ({
    location = ""
  }) => {
    window.open(location, "_blank");
  }

  const handleClickHeart = (place: PlaceProps) => {
    const check = place.likedBy?.find(item => item?.userUid === authUid);

    const newObjRef = doc(firestore, "travels", `${id}`);

    const incrementLikedBy = () => {
      if (check) {
        return place.likedBy;
      }
      return [...(place.likedBy || []), {
        userUid: authUid,
        name: displayName,
        updatedAt: new Date().toISOString()
      }];
    }

    const newList = places.map((placeItem: PlaceProps) => {
      if (placeItem.id === `${place?.id}`) {
        return {
          ...placeItem,
          likes: check ? placeItem.likes : (placeItem.likes || 0) + 1,
          likedBy: incrementLikedBy()
        };
      }
      return placeItem;
    });
    updateDoc(newObjRef, {
      places: newList
    });
  }

  const handleClickDislike = (place: PlaceProps) => {
    const removeLikedBy = () => place.likedBy?.filter(item => item?.userUid !== authUid);
    const newObjRef = doc(firestore, "travels", `${id}`);
    const newList = places.map((placeItem: PlaceProps) => {
      if (placeItem.id === `${place?.id}`) {
        return {
          ...placeItem,
          likes: placeItem.likes - 1 > 0 ? placeItem.likes - 1 : 0,
          likedBy: removeLikedBy()
        };
      }
      return placeItem;
    });

    updateDoc(newObjRef, {
      places: newList
    });
  }


  return (
    <Box key={id}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={{
          xs: "center",
          sm: "space-between",
          md: "space-around",
          lg: "space-between",
          xl: "space-around",
        }}
        useFlexGap
        spacing={2}
        flexWrap={"wrap"}
        margin={"auto"}
      >
        {places?.map((place: PlaceProps) => (
          <Card sx={{ width: {
            xs: "100%",
            md: "45%",
          }, position: "relative" }}
            key={place.id}>
            {place.likedBy?.find(item => item?.userUid === authUid) ? (
              <Chip sx={{
                position: "absolute",
                top: 4,
                right: 4,
                zIndex: 1,
              }}
                color="primary"
                label="Selecionado" />
            ) : null}
            <CardMedia
              component="img"
              height="240"
              image={place?.imageURL || "https://thumbs.dreamstime.com/b/paris-eiffel-tower-river-seine-sunset-france-one-most-iconic-landmarks-107376702.jpg"}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {place.titulo}
              </Typography>
              <Chip label={<span style={{ fontSize: 16 }}>{place.transporte}</span>} />
              <Typography variant="body2" color="text.secondary">
                Valor: {Number(place.preco) > 0 ? new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(Number(place.preco)) : "Grátis"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Horários: {place.horarios ? place.horarios : "24h | Público"}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites" onClick={() => handleClickHeart(place)}>
                <FavoriteIcon color={place.likedBy?.find(({ userUid }) => userUid === authUid) ? "primary" : "action"} />
              </IconButton>
              <IconButton aria-label="add to favorites">
                <HeartBrokenIcon onClick={() => handleClickDislike(place)} />
              </IconButton>
              {place.endereco ? (
                <Button onClick={() => handleOpenMap({
                  location: place.endereco || "#"
                })} variant="text" startIcon={<MapIcon />}>
                  Location
                </Button>
              ) : null}
            </CardActions>
          </Card>
        ))}
      </Stack>
    </Box>
  )
}
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { initialize } from '@/services/firebase'
import { useParams } from 'next/navigation';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { FormControlLabel, Stack, Switch } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


const { firestore } = initialize()

export function AddNewPlace({
  openModalButton
}: {
  openModalButton: React.ReactElement;
}) {
  const [open, setOpen] = React.useState(false);
  const [availableAllDay, setAvailableAllDay] = React.useState(true);

  const {
    id
  } = useParams();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const reactNode = React.cloneElement(openModalButton, {
    onClick: handleClickOpen
  });


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>

      {reactNode}
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
          },
        }}
      >
        <DialogTitle>Add new place</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus={true}
            required
            margin="dense"
            id="nome"
            name="nome"
            label="Nome"
            type="text"
            fullWidth
            variant="outlined"

          />
          <FormControlLabel control={<Switch value={availableAllDay} onClick={() => {
            setAvailableAllDay((prev) => !prev);
          }} />} label="24 horas" />

          {!availableAllDay ? (
            <Stack flex="flex"
              flexDirection={{
                xs: "column",
                sm: "row",
                md: "row",
                lg: "row",
                xl: "row",
              }}
              justifyContent={{
                xs: "center",
                sm: "space-between",
                md: "space-around",
                lg: "space-between",
                xl: "space-around",
              }}
              gap={2}
            >
              <MobileTimePicker
                name="horario"
                label="Horário de Abertura"
              />

              <MobileTimePicker
                name="horario"
                label="Horário de Fechamento"
              />
            </Stack>
          ) : null}

          {/* <TextField
            autoFocus={false}
            required={false}
            margin="dense"
            id="preco"
            name="preco"
            label="Preço"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue={new Intl.NumberFormat('sfb', {
              style: 'currency',
              currency: 'EUR',
              minimumFractionDigits: 2
            }).format(Number(0))}
            onInput={(e) => {
              const target = e.target as HTMLInputElement;
              let value = target.value.replace(/\D/g, "");
              const convertedPrice = new Intl.NumberFormat('sfb', {
                style: 'currency',
                currency: 'EUR',
                minimumFractionDigits: 2
              }).format(Number(value))
              const reconvertNumber = convertedPrice.split(".00")[0]
              let removeSymbol = reconvertNumber.split("€")[1]
              const pureNumber = removeSymbol.replaceAll(",", "")
            }}
          /> */}

          <TextField
            autoFocus={false}
            required={false}
            margin="dense"
            id="preco"
            name="preco"
            label="Preço"
            type="text"
            fullWidth
            variant="outlined"
            placeholder={
              new Intl.NumberFormat('de-DE', {
                style: 'currency',
                currency: 'EUR',
                minimumFractionDigits: 2
              }).format(Number(0))
            }
            onInput={(_event) => {
              const target = _event.target as HTMLInputElement;
              let value = target.value.replace(/\D/g, "");
              target.value = value;
              let formattedValue = new Intl.NumberFormat('de-DE', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              }).format(Number(value) / 100);
              target.value = formattedValue;
            }}
          />

          <TextField
            autoFocus={false}
            required={false}
            margin="dense"
            id="name"
            name="endereco"
            label="Endereço do google"
            type="text"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="warning">Fechar</Button>
          <Button type="submit" variant="contained" >Adicionar</Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}

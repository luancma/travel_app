import { uuid } from 'uuidv4';


const newList = [
  {
      "titulo": "Torre de Belém",
      "endereco": "https://maps.app.goo.gl/V6vgbZjXmHSxkLag7",
      "preco": "8",
      "date": "September 2, 2024",
      "horarios": "24 horas",
      "ingresso": "",
      "transporte": "🚃",
      "imageURL": "https://media.istockphoto.com/id/694266928/pt/foto/belem-tower-in-lisbon-at-sunset-portugal.jpg?s=612x612&w=0&k=20&c=B_rU6NqPIZspeb-8VoOfWnU0OgQAOp960uyCov6CqTg=",
      "id": "669c5983-eb58-44ed-bc94-56473a005d27"
  },
  {
      "titulo": "Jardim Botânico Tropical",
      "endereco": "https://maps.app.goo.gl/NBVasazS1AR2Aaax9",
      "preco": "5",
      "date": "",
      "horarios": "9h00 às 20h00 todos os dias",
      "ingresso": "",
      "transporte": "🚇"
  },
  {
      "titulo": "Jardim do Rio",
      "endereco": "",
      "preco": "",
      "date": "",
      "horarios": "",
      "ingresso": "",
      "transporte": "⛴️"
  },
  {
      "titulo": "Eduardo IIV - Estufa Fria",
      "endereco": "",
      "preco": "3.50",
      "date": "",
      "horarios": "10-19h Terça a Domingo",
      "ingresso": "",
      "transporte": "🚶"
  },
  {
      "titulo": "Cascata de Fervença - Bajouca",
      "endereco": "",
      "preco": "",
      "date": "",
      "horarios": "",
      "ingresso": "",
      "transporte": "🚂"
  },
  {
      "titulo": "Sesimbra",
      "endereco": "",
      "preco": "",
      "date": "",
      "horarios": "",
      "ingresso": "",
      "transporte": "🚌"
  },
  {
      "titulo": "Aqueduto e Museu da água (Reservatório Mãe D’Água)",
      "endereco": "",
      "preco": "11",
      "date": "",
      "horarios": "Terça a Domingo | 10 às 13:30h",
      "ingresso": "",
      "transporte": "🚇"
  },
  {
      "titulo": "Mirante de Santa Luzia",
      "endereco": "",
      "preco": "",
      "date": "",
      "horarios": "",
      "ingresso": "",
      "transporte": "🚇"
  },
  {
      "titulo": "Palácio Marquês de Fronteira",
      "endereco": "https://maps.app.goo.gl/MLpL8rosAS5926yWA",
      "preco": "5",
      "date": "",
      "horarios": "Segunda a sexta: 10h - 17h | Sábado: 10h - 13h",
      "ingresso": "",
      "transporte": "🚶"
  },
  {
      "titulo": "Passeio de barco Berlengas - Peniche",
      "endereco": "",
      "preco": "22",
      "date": "September 11, 2024",
      "horarios": "",
      "ingresso": "https://www.feelingberlenga.pt/?utm_source=julho_pesquisa&utm_medium=google_pt&utm_campaign=google_julho_pt&gad_source=1&gclid=Cj0KCQjwv7O0BhDwARIsAC0sjWNm39HHbDQDMpPgBRFoWR5hB7xdl97T6QjoB046lMtURTlqk9LXi9kaApfVEALw_wcB",
      "transporte": "🚌"
  },
  {
      "titulo": "Parque Monsanto",
      "endereco": "",
      "preco": "",
      "date": "",
      "horarios": "24h | todos os dias",
      "ingresso": "",
      "transporte": "🚶"
  },
  {
      "titulo": "Maat",
      "endereco": "",
      "preco": "11",
      "date": "",
      "horarios": "Quarta a Segunda | 10h às 19h",
      "ingresso": "",
      "transporte": "🚃"
  },
  {
      "titulo": "Porto",
      "endereco": "",
      "preco": "",
      "date": "September 13, 2024",
      "horarios": "",
      "ingresso": "",
      "transporte": "🚌"
  },
  {
      "titulo": "Évora",
      "endereco": "",
      "preco": "",
      "date": "",
      "horarios": "",
      "ingresso": "",
      "transporte": "🚌"
  },
  {
      "titulo": "Alfama",
      "endereco": "",
      "preco": "",
      "date": "",
      "horarios": "",
      "ingresso": "",
      "transporte": "🚇"
  },
  {
      "titulo": "Cascais",
      "endereco": "",
      "preco": "",
      "date": "",
      "horarios": "",
      "ingresso": "",
      "transporte": "🚂"
  },
  {
      "titulo": "Jardim do Campo Grande",
      "endereco": "",
      "preco": "",
      "date": "",
      "horarios": "",
      "ingresso": "",
      "transporte": "🚇"
  },
  {
      "titulo": "Gulbenkian",
      "endereco": "",
      "preco": "",
      "date": "",
      "horarios": "Todos os dias | 9h às 20:30",
      "ingresso": "",
      "transporte": "🚶"
  },
  {
      "titulo": "Sintra",
      "endereco": "",
      "preco": "",
      "date": "September 10, 2024",
      "horarios": "",
      "ingresso": "",
      "transporte": "🚂"
  },
  {
      "titulo": "Óbidos",
      "endereco": "",
      "preco": "",
      "date": "",
      "horarios": "",
      "ingresso": "",
      "transporte": "🚂"
  },
  {
      "titulo": "Museu do Azulejo",
      "endereco": "",
      "preco": "8",
      "date": "",
      "horarios": "Terça a Domingo | 10 às 18h",
      "ingresso": "",
      "transporte": "🚌"
  },
  {
      "titulo": "Panteão Nacional",
      "endereco": "",
      "preco": "4",
      "date": "",
      "horarios": "Terça a Domingo | 10h00 às 18h00",
      "ingresso": "",
      "transporte": "🚇"
  },
  {
      "titulo": "Ericeira",
      "endereco": "",
      "preco": "",
      "date": "",
      "horarios": "",
      "ingresso": "",
      "transporte": ""
  },
  {
      "titulo": "Parque das Nações - Teleférico",
      "endereco": "",
      "preco": "7",
      "date": "",
      "horarios": "Todos os dias - 10:30 às 22h",
      "ingresso": "",
      "transporte": "🚂"
  },
  {
      "titulo": "Terreiro do Paço",
      "endereco": "",
      "preco": "",
      "date": "",
      "horarios": "",
      "ingresso": "",
      "transporte": "🚇"
  }
].map(item => item.id = uuid())


console.log(newList)
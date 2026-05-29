# ExplorarPe

## Funcionalidades nesta versão

- Tela inicial com apresentação do app, resumo dos recursos e acesso rápido.
- Lista de pontos turísticos usando `FlatList` com mais de 10 itens.
- Cards com imagem, categoria, avaliação, endereço e tempo sugerido.
- Tela de detalhes recebendo dados por parâmetro via React Navigation.
- Navegação com Stack Navigator e Bottom Tab Navigator.
- GPS com mapa, localização atual e lista de locais mais próximos.
- Tela de perfil com foto pela câmera ou pela galeria.
- Componentes reutilizáveis: `AppButton`, `PlaceCard` e `StatCard`.
- Interface responsiva com paleta de cores e ícones.

## Tecnologias utilizadas

- React Native
- Expo
- React Navigation
- Expo Camera
- Expo Image Picker
- Expo Location
- React Native Maps
- JavaScript

## Estrutura do projeto

```txt
ExplorarPe/
├── App.js
├── package.json
├── README.md
├── screens/
│   ├── HomeScreen.js
│   ├── ListScreen.js
│   ├── DetailScreen.js
│   ├── gpsScreen.js
│   └── ProfileScreen.js
├── components/
│   ├── AppButton.js
│   ├── PlaceCard.js
│   └── StatCard.js
├── navigation/
│   ├── RootNavigator.js
│   ├── StackNavigator.js
│   └── BottomTabNavigator.js
├── data/
│   └── places.js
├── theme/
│   └── colors.js
└── assets/
```

## Como instalar

```bash
npm install
```

## Como executar

```bash
npx expo start
```

Depois, abra no celular usando o aplicativo **Expo Go** ou execute em um emulador Android/iOS.

## Dados do aluno

- Nome completo: **preencher**
- Matrícula: **preencher**

## Checklist dos requisitos

- [x] Versão funcional
- [x] 3 telas principais
- [x] React Navigation com Stack e Tabs
- [x] Passagem de parâmetros entre telas
- [x] FlatList com 10+ itens
- [x] Componentes reutilizáveis
- [x] Interface profissional e responsiva
- [x] GPS/geolocalização
- [x] Câmera/galeria

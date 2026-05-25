
## Funcionalidades nesta versao

- Tela inicial com apresentacao do app, resumo dos recursos e acesso rapido.
- Lista de pontos turisticos usando `FlatList` com mais de 10 itens.
- Cards com imagem, categoria, avaliacao, endereco e tempo sugerido.
- Tela de detalhes recebendo dados por parametro via React Navigation.
- Navegacao com Stack Navigator e Bottom Tab Navigator.
- Componentes reutilizaveis: `AppButton`, `PlaceCard` e `StatCard`.
- Interface responsiva com paleta de cores e icones.

## Partes removidas por enquanto

- Tela de GPS/geolocalizacao.
- Mapa nativo/web.
- Tela de perfil.
- Camera e galeria.

## Tecnologias utilizadas

- React Native
- Expo
- React Navigation
- Expo Vector Icons
- JavaScript

## Estrutura do projeto

```txt
ExplorarPe Parcial/
├── App.js
├── package.json
├── README.md
├── screens/
│   ├── HomeScreen.js
│   ├── ListScreen.js
│   └── DetailScreen.js
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
- Matricula: **preencher**

## Checklist dos requisitos

- [x] Versao parcial funcional
- [x] 3 telas principais
- [x] React Navigation com Stack e Tabs
- [x] Passagem de parametros entre telas
- [x] FlatList com 10+ itens
- [x] Componentes reutilizaveis
- [x] Interface profissional e responsiva
- [X] GPS/geolocalizacao
- [ ] Camera/galeria

<h1 align="center">
    <img alt="Trailspot" src="https://res.cloudinary.com/iredhd/image/upload/c_scale,w_256/v1592958094/trailspot/PNG-file-1_ccp7n3.png" />
    <br>
    Trailspot
</h1>
<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/iredhd/trailspot.svg">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/iredhd/trailspot.svg">

  <a href="https://github.com/iredhd/trailspot/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/iredhd/trailspot.svg">
  </a>
  
  <img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/w/iredhd/trailspot.svg">
</p>

<p align="center">
  <a href="#technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#installation">Installation</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#contributing">Contributing</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#license">License</a>
</p>

The content of this repository is an open-source mobile application for the tourism and entertainment sector.

The application consists of a network of people where they can find people with the same tourist interests, tourist guides and places to be visited.

The entire project backend will use Google Firebase with some native services and custom functions.

## Technologies
- React Native
- Prop-Types
- i18n-js
- Unform
- Yup
- React Native Google Places Autocomplete
- React Native Reanimated
- Expo
  - Expo Facebook Auth
  - Expo Updates (OTA)
- Redux
  - Redux Thunk
  - Redux Persist
  - Redux Persist Transform Encrypt
- Firebase
  - Firebase Realtime Database
  - Firebase Firestore
  - Firebase Storage
  - Firebase Functions
  - Firebase Facebook Auth
  - Firebase Auth

## Installation
```
git clone https://github.com/iredhd/trailspot.git
cd trailspot
yarn
yarn start
```
**After you have cloned the project, be aware of the environment variables that must be filled in .env. All your Firebase configuration files will be automatically generated on yarn start.**

**"google-services.json" will not be automatically generated. You must put this file on project source directory before run the project**

## Contributing
This project is under development and it will be a long time yet. It will be a pleasure to have your help.

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
This project is under the MIT license. See the [LICENSE](https://github.com/iredhd/trailspot/blob/master/LICENSE) for more information.
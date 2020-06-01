---
to: app.json
---
{
  "expo": {
    "name": "Trilhas",
    "slug": "iredhd-trilhas",
    "privacy": "public",
    "sdkVersion": "36.0.0",
    "platforms": [
      "ios",
      "android",
    ],
    "version": "0.0.1-0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "cover",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": false
    },
    "extra": <%- JSON.stringify(h.extra) %>
  }
}
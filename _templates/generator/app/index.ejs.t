---
to: app.json
---
{
  "expo": {
    "name": "<%= h.app.name %>",
    "slug": "<%= h.app.slug %>",
    "privacy": "public",
    "sdkVersion": "36.0.0",
    "platforms": [
      "ios",
      "android"
    ],
    "version": "<%= h.app.version %>",
    "orientation": "portrait",
    "icon": "./src/assets/icon.png",
    "splash": {
      "image": "./src/assets/splash.png",
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
    "extra": <%- JSON.stringify(h.app.extra) %>
  }
}
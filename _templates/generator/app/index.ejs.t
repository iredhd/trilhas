---
to: app.json
---
{
  "expo": {
    "name": "<%= h.name %>",
    "slug": "<%= h.slug %>",
    "privacy": "public",
    "sdkVersion": "36.0.0",
    "platforms": [
      "ios",
      "android"
    ],
    "version": "<%= h.version %>",
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
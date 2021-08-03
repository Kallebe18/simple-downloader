import React from 'react'
import { Navigation, Options } from "react-native-navigation";
import { NavigationProvider } from 'react-native-navigation-hooks'

import { Yt } from "./screens/yt";
import { TikTok } from "./screens/tiktok"

// wrapping context in screens for use of hooks

Navigation.registerComponent(
  'youtubeScreen',
  () => (props) => {
    return (
      <NavigationProvider value={{ componentId: props.componentId }}>
        <Yt {...props} />
      </NavigationProvider>    
    )
  },
  () => Yt
);

Navigation.registerComponent(
  'tiktokScreen',
  () => (props) => {
    return (
      <NavigationProvider value={{ componentId: props.componentId }}>
        <TikTok {...props} />
      </NavigationProvider>    
    )
  },
  () => TikTok
);

function getScreenOptions(screenTitle: string): Options | undefined  {
  let icon = ''
  switch (screenTitle) {
    case 'Youtube Downloader':
      icon = require('./assets/youtubeIcon.png')
      break;
    case 'TikTok Downloader':
      icon = require('./assets/tiktokIcon.png')
      break;
    default:
      break;
  }

  return ({
    topBar: {
      rightButtons: [
        {
          id: 'folderButton',
          text: 'Abrir Arquivos',
          icon: require('./assets/folderIcon.png')
        }
      ],
      title: {
        text: screenTitle,
        color: '#fff',
        fontWeight: "bold"
      },
      barStyle: 'black',
      background: {
        color: '#000',
      },
    },
    bottomTab: {
      icon
    }
  })
}

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        options: {
          bottomTabs: {
            backgroundColor: '#000',
          }
        },
        children: [
          {
            stack: {
              options: getScreenOptions('Youtube Downloader'),
              children: [
                {
                  component: {
                    name: 'youtubeScreen'
                  }
                }
              ]
            }
          },
          {
            stack: {
              options: getScreenOptions('TikTok Downloader'),
              children: [
                {
                  component: {
                    name: 'tiktokScreen'
                  }
                }
              ]
            }
          }
        ]
      }
    }
  });
});

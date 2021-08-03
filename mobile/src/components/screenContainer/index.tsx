import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

export const ScreenContainer = (props: any) => {
  const colors = ['#010408', '#061b24', '#002d3b', '#00414b', '#005654', '#006a53', '#007e4a', '#339139']

  return (
    <LinearGradient
      useAngle={true} 
      angle={170} 
      colors={colors}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%'
      }}
    >
      {props.children}
    </LinearGradient>
  )
}

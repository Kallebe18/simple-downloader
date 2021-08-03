import React, { useEffect, useRef, useState } from 'react'
import { ScrollView } from 'react-native'
import { FetchBlobResponse } from 'react-native-fetch-blob'
import Video from 'react-native-video';
import { useNavigationButtonPress } from 'react-native-navigation-hooks'
import RNClipboard from '@react-native-clipboard/clipboard';

import ytdl from '../../utils/ytdl'
import { ScreenContainer } from '../../components/screenContainer'
import { LinkInput } from '../../components/linkInput'
import { TemplateButton } from '../../components/templateButton'
import { VideoTitle } from '../../components/videoTitle'
import { fetchVideoData, openFileViewer } from '../../utils/systemActions';
import { requestFilesPermission } from '../../utils/permissions';
import { ButtonContainer, ButtonsContainer, ButtonsText, WarningText } from '../styles';
import { Clipboard, Download } from 'react-native-feather';

export const Yt = ({ componentId }: any) => {
  const videoRef: any = useRef(null)
  const [warningText, setWarningText] = useState('')
  const [videoThumbnail, setVideoThumbnail] = useState('')
  const [linkInputBorderColor, setLinkInputBorderColor] = useState('#fff')
  const [videoUrl, setVideoUrl] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [videoTitle, setVideoTitle] = useState('')
  const [downloadStatus, setDownloadStatus] = useState('')

  useEffect(() => {
    getCopiedText()
  }, [])

  const getCopiedText = async () => {
    const text = await RNClipboard.getString();
    handleLinkChange(text)
  };

  useNavigationButtonPress(
    () => openFileViewer(),
    { componentId }
  )

  const downloadVideo = async () => {
    try {
      requestFilesPermission()
      setDownloadStatus('')
      const res: FetchBlobResponse = await fetchVideoData(videoUrl)
      setDownloadStatus('Arquivo salvo em ' + res.path())
    } catch {
      setDownloadStatus('Falha ao baixar arquivo')
    }
  }

  const handleLinkChange = async (text: string) => {
    setYoutubeUrl(text);
    try {
      const video = await ytdl(text)
      setVideoUrl(video[0].url)
      const info = await ytdl.getBasicInfo(text)
      const thumbnailsLength = info.videoDetails.thumbnails.length
      console.log(info.videoDetails.thumbnails[thumbnailsLength-1].url)
      setVideoThumbnail(info.videoDetails.thumbnails[0].url)
      setVideoTitle(info.videoDetails.title)
      setLinkInputBorderColor('#47ba27')
      setWarningText('Link Válido')
    } catch(e) {
      setWarningText('Link Inválido')
      setLinkInputBorderColor('#e30909')
    }
  }

  const renderVideo = () => {
    if (videoUrl !== '') {
      return (
        <ScrollView style={{ width: '100%' }}>
          <VideoTitle text={videoTitle}/>
          <Video
            source={{uri: videoUrl}}
            ref={ref => videoRef}
            paused={true}
            style={{
              backgroundColor: '#000',
              width: '100%',
              height: 280,
            }}
            onReadyForDisplay={() => {
              console.log(videoRef.current)
            }}
            audioOnly={false}
            controls={true}
            posterResizeMode='contain'
            poster={videoThumbnail}
          />
        </ScrollView>
      )
    }
    return null
  }

  const clearText = () => {
    setVideoUrl("")
    setYoutubeUrl("")
  }

  return (
    <ScreenContainer>
      <WarningText>
        {warningText}
      </WarningText>
      <LinkInput
        borderColor={linkInputBorderColor}
        defaultValue={youtubeUrl}
        onChangeText={handleLinkChange}
        placeholder="Link do Vídeo"
        placeholderTextColor="#888"
        clearText={clearText}
      />
      <ButtonsContainer>
        <ButtonContainer>
          <TemplateButton onPress={downloadVideo}>
            <Download
              color='#fff'
              strokeWidth={2}
              height={30}
              width={30}
            />
          </TemplateButton>
          <ButtonsText>
            Baixar Vídeo
          </ButtonsText>
        </ButtonContainer>
        <ButtonContainer>
          <TemplateButton onPress={getCopiedText}>
            <Clipboard
              color='#fff'
              strokeWidth={2}
              height={30}
              width={30}
            />
          </TemplateButton>
          <ButtonsText>
            Colar Link
          </ButtonsText>
        </ButtonContainer>
      </ButtonsContainer> 
      {renderVideo()}
    </ScreenContainer>
  )
}

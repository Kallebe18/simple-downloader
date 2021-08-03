import React, { useEffect, useRef, useState } from 'react'
import { FetchBlobResponse } from 'react-native-fetch-blob'
import RNClipboard from '@react-native-clipboard/clipboard';
import { useNavigationButtonPress } from 'react-native-navigation-hooks'
import { Download, Clipboard } from 'react-native-feather'

import { ScreenContainer } from '../../components/screenContainer'
import { LinkInput } from '../../components/linkInput'
import { TemplateButton } from '../../components/templateButton'
import { ScrollView, Text } from 'react-native';
import { VideoTitle } from '../../components/videoTitle';
import { openFileViewer, fetchVideoData } from '../../utils/systemActions'
import { requestFilesPermission } from '../../utils/permissions';
import { api } from '../../services/api'
import { ButtonsContainer, ButtonsText, ButtonContainer, WarningText } from '../styles'

export const TikTok = ({ componentId }: any) => {
  const ref = useRef()
  const [warningText, setWarningText] = useState('')
  const [linkInputBorderColor, setLinkInputBorderColor] = useState('#fff')
  const [tiktokUrl, setTiktokUrl] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [videoHeaders, setVideoHeaders] = useState({} as any)
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
      const res: FetchBlobResponse = await fetchVideoData(videoUrl, videoHeaders)
      setDownloadStatus('Arquivo salvo em ' + res.path())
    } catch {
      setDownloadStatus('Falha ao baixar arquivo')
    }
  }

  const handleLinkChange = async (text: string) => {
    setTiktokUrl(text);
    await api.post('/tiktok/info', {
      url: text,
    }).then(result => {
      const headers = result.data.headers
      setVideoHeaders(headers)
      setVideoTitle(result.data.collector[0].text)
      setVideoUrl(result.data.collector[0].videoUrl)
      setLinkInputBorderColor('#47ba27')
      setWarningText('Link Válido')
    }).catch(error => {
      setWarningText('Link Inválido')
      setLinkInputBorderColor('#e30909')
    })
  }

  const clearText = () => {
    setVideoUrl("")
    setTiktokUrl("")
  }

  return (
    <ScreenContainer>
      <WarningText>
        {warningText}
      </WarningText>
      <LinkInput
        borderColor={linkInputBorderColor}
        defaultValue={tiktokUrl}
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
      {
        videoUrl !== '' &&
        <ScrollView style={{
          width: '100%'
        }}>
          <VideoTitle text={videoTitle} />
          <Text style={{textAlign: 'center'}}>Video preview with authorization headers isn't working with react-native-video package</Text>
        </ScrollView>
      }
    </ScreenContainer>
  )
}

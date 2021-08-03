import DocumentPicker from "react-native-document-picker";
import RNFetchBlob, { FetchBlobResponse } from "react-native-fetch-blob";
import FileViewer from 'react-native-file-viewer';
import uuid from 'react-native-uuid';

export const openFileViewer = async () => {
  let dirs = RNFetchBlob.fs.dirs // absolute-path-to-my-local-file.
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.video],
    });
    await FileViewer.open(res.uri);
  }
  catch(e) {
    // error
  }
}

interface Headers {
  [key: string]: string
}

export const fetchVideoData = async (videoUrl: string, headers?: Headers) => {
  let dirs = RNFetchBlob.fs.dirs
  return await RNFetchBlob
    .config({
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mime: 'video/mp4',
        title: `simple-downloader-${uuid.v4()}.mp4`,
        path: `${dirs.DownloadDir}/simple-downloader-${uuid.v4()}.mp4`,
        description: 'Simple Downloader'
      },
    }).fetch('GET', videoUrl, headers)
}
import {UploadFile} from "element-plus"
import mime from "mime"
const videoTypes = ['mp4', 'webm', 'ogg', 'avi']
/**
 * 校验视频文件
 * @param file
 */
export const validateVideo = (file: UploadFile): boolean => {
  const fileType = file.raw?.type as string
  const type = mime.getExtension(fileType)
  if(type === null) {
    return false
  }
  return videoTypes.includes(type?.toLowerCase())
}

/**
 *  生成视频关键帧
 *  @param url 视频url
 *  @param s 关键帧所在时长(秒)
 */
export const generateFrame = (url: string, s: number): Promise<string> => {
  const video = document.createElement('video')
  video.setAttribute("src", url)
  video.currentTime = s
  return new Promise((resolve, reject) => {
    video.addEventListener('loadeddata',() => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
      ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
      const image = canvas.toDataURL('image/jpeg')
      resolve(image)
    })
  })
}

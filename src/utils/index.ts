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
export interface Frame {
  image: string;
  s: number;
}
export const generateFrame = (url: string, s: number): Promise<Frame> => {
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
      resolve({image, s})
    })
  })
}
/**
 * 格式化时间线展示
 * @param s
 */
export const dateTimeLineFormat = (time: number) => {
  const nm = Math.floor(time / 60)
  const m = nm < 10 ? `0${nm}` : nm
  const ns = parseInt(String(time % 60))
  const s = ns < 10 ? `0${ns}`: ns
  return `${m}'${s}`
}
/**
 * 格式化总时长展示
 * @param time
 */
export const dateTimeDuration = (time: number) => {
  const poor = Math.floor(Number((time % 1).toFixed(3)) * 1000)
  const ms = poor < 10 ? `00${poor}`: poor < 100 ? `0${poor}` : poor
  const s = Math.floor(time % 60) < 10 ? `0${Math.floor(time % 60)}` : Math.floor(time % 60)
  const m = Math.floor(time / 60) < 10 ? `0${Math.floor(time / 60)}` : Math.floor(time / 60)
  return `${m}'${s}'${ms}`
}


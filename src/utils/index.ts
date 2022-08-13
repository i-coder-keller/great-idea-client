import {UploadFile} from "element-plus"
import mime from "mime"
const videoTypes = ['mp4', 'webm', 'ogg', 'avi']
export const validateVideo = (file: UploadFile): boolean => {
  const fileType = file.raw?.type as string
  const type = mime.getExtension(fileType)
  if(type === null) {
    return false
  }
  return videoTypes.includes(type?.toLowerCase())
}

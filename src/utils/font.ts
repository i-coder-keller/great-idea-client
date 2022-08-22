/**
 * 加载字体
 * @param key
 * @param arrayBuffer
 * @returns {Promise<void>}
 */
export const loadFont = async(fontFamily: string, arrayBuffer: ArrayBuffer) => {
  try {
    const font = new FontFace(fontFamily, arrayBuffer, {})
    const face = await font.load()
    document.fonts.add(face)
  } catch (e) {
    console.error('字体加载失败:', e)
  }
}
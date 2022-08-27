const menus = [
  {
    className: 'video-control-menus hint--top hint--rounded',
    unselectedClassName: 'video-volume',
    selectedClassName: 'video-volume-selected video-control-menus-selected',
    mark: 'volume',
    ariaLabel: '播放音量'
  },
  {
    className: 'video-control-menus hint--top hint--rounded',
    unselectedClassName: 'video-speed',
    selectedClassName: 'video-speed-selected video-control-menus-selected',
    mark: 'speed',
    ariaLabel: '播放速度'
  },
  {
    className: 'video-control-menus hint--top hint--rounded',
    unselectedClassName: 'video-cut',
    selectedClassName: 'video-cut-selected video-control-menus-selected',
    mark: 'cutVideo',
    ariaLabel: '视频裁剪'
  },
  {
    className: 'video-control-menus hint--top hint--rounded',
    unselectedClassName: 'video-cut-mark',
    selectedClassName: 'video-cut-mark-selected video-control-menus-selected',
    mark: 'cutMark',
    ariaLabel: '水印裁剪'
  },
  {
    className: 'video-control-menus hint--top hint--rounded',
    unselectedClassName: 'video-text',
    selectedClassName: 'video-text-selected video-control-menus-selected',
    mark: 'text',
    ariaLabel: '文字水印'
  },
  {
    className: 'video-control-menus hint--top hint--rounded',
    unselectedClassName: 'video-image',
    selectedClassName: 'video-image-selected video-control-menus-selected',
    mark: 'image',
    ariaLabel: '图片水印'
  },
  {
    className: 'video-control-menus hint--top hint--rounded',
    unselectedClassName: 'video-voice',
    selectedClassName: 'video-voice-selected video-control-menus-selected',
    mark: 'voice',
    ariaLabel: '人工配音'
  }
]
type Selected_Menu = 'volume' | 'cutMark' | 'speed' | 'text' | 'image' | 'voice'

export {
  menus,
  Selected_Menu
}

const menus = [
  {
    className: 'video-control-menus',
    unselectedClassName: 'video-volume',
    selectedClassName: 'video-volume-selected video-control-menus-selected',
    mark: 'volume'
  },
  {
    className: 'video-control-menus',
    unselectedClassName: 'video-speed',
    selectedClassName: 'video-speed-selected video-control-menus-selected',
    mark: 'speed'
  },
  {
    className: 'video-control-menus',
    unselectedClassName: 'video-cutMark',
    selectedClassName: 'video-cutMark-selected video-control-menus-selected',
    mark: 'cutMark'
  },
  {
    className: 'video-control-menus',
    unselectedClassName: 'video-text',
    selectedClassName: 'video-text-selected video-control-menus-selected',
    mark: 'text'
  },
  {
    className: 'video-control-menus',
    unselectedClassName: 'video-image',
    selectedClassName: 'video-image-selected video-control-menus-selected',
    mark: 'image'
  },
  {
    className: 'video-control-menus',
    unselectedClassName: 'video-voice',
    selectedClassName: 'video-voice-selected video-control-menus-selected',
    mark: 'voice'
  }
]
type Selected_Menu = 'volume' | 'cutMark' | 'speed' | 'text' | 'image' | 'voice'

export {
  menus,
  Selected_Menu
}

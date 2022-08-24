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
  }
]
type Selected_Menu = 'volume' | 'cutMark' | 'speed'

export {
  menus,
  Selected_Menu
}

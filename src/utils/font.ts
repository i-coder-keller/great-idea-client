export const loadFont = (family: string, font: string) => {
  const f = new FontFace(family, font)
  document.fonts.add(f)
}


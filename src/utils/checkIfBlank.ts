export const checkIfBlank = async (imageLink: string) => {
  return new Promise((resolve) => {
    const img = new Image()
    img.src = imageLink
    img.crossOrigin = `Anonymous`

    img.onload = function () {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const context = canvas.getContext('2d')

      if (!context) return

      context.drawImage(img, 0, 0)

      const imageData = context.getImageData(0, 0, img.width, img.height).data
      const isWhite = imageData.every((value) => value === 0)

      resolve(isWhite)
    }
  })
}

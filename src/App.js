import React, { useState, useRef } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'

const getPixelColor = (image, x, y) => {
  console.log(x, y)
  const canvas = document.createElement('canvas')
  canvas.width = image.width
  canvas.height = image.height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(image, 0, 0)
  const pixel = ctx.getImageData(x, y, 1, 1).data
  console.log(image)
  return `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`
}

const ImageUploader = ({ onUpload }) => (
  <div className="flex flex-col justify-center items-center">
    <label htmlFor="image-upload" className="mb-2 cursor-pointer">
      <AiOutlineCloudUpload className="mr-2" />
      Upload an image
    </label>
    <input
      type="file"
      id="image-upload"
      accept="image/*"
      className="hidden"
      onChange={onUpload}
    />
  </div>
)

const ImagePreview = ({ src, onImageClick, imageRef }) => (
  <img
    src={src}
    alt="uploaded"
    className="w-64 h-64 object-contain mb-4 cursor-pointer"
    onClick={onImageClick}
    ref={imageRef}
  />
)

export default function App() {
  const [image, setImage] = useState(null)
  const imageRef = useRef(null)

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = async () => {
      const image = new Image()
      image.src = reader.result
      setImage(image.src)
    }
  }

  const handleImageClick = (event) => {
    const x = event.nativeEvent.offsetX
    const y = event.nativeEvent.offsetY
    const pixelColor = getPixelColor(imageRef.current, x, y)
    console.log(pixelColor) // display pixel color in console
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      {image ? (
        <ImagePreview
          src={image}
          onImageClick={handleImageClick}
          imageRef={imageRef}
        />
      ) : (
        <ImageUploader onUpload={handleImageUpload} />
      )}
    </div>
  )
}

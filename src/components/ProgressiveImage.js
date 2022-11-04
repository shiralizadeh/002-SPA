import { useEffect, useRef, useState } from "react"
import styled from "styled-components/macro"

const ProgressiveImage = (props) => {
  const [imageOpacity, setImageOpacity] = useState(0)

  const imageRef = useRef()

  useEffect(() => {
    if (imageRef.current?.complete) {
      setImageOpacity(1)
    }
  }, [imageRef])

  return (
    <ImageWithOpacity {...props} ref={imageRef} onLoad={() => setImageOpacity(1)} style={{ opacity: imageOpacity }} />
  )
}

const ImageWithOpacity = styled.img`
  transition: opacity 0.5s ease-out;
`

export default ProgressiveImage

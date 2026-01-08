import { useState } from 'react'
import './ImageGallery.css'

function ImageGallery({ images = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)

  if (!images || images.length === 0) {
    return (
      <div className="image-gallery">
        <div className="image-gallery-placeholder">
          No images available
        </div>
      </div>
    )
  }

  const sortedImages = [...images].sort((a, b) => {
    if (a.isPrimary) return -1
    if (b.isPrimary) return 1
    return a.displayOrder - b.displayOrder
  })

  const selectedImage = sortedImages[selectedIndex] || sortedImages[0]

  return (
    <div className="image-gallery">
      <div className="image-gallery-thumbnails">
        {sortedImages.map((image, index) => (
          <div
            key={image.id}
            className={`thumbnail ${index === selectedIndex ? 'thumbnail-active' : ''}`}
            onClick={() => setSelectedIndex(index)}
          >
            <img src={image.imageUrl} alt={`Thumbnail ${index + 1}`} />
          </div>
        ))}
      </div>
      <div
        className="image-gallery-main"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <img
          src={selectedImage.imageUrl}
          alt="Product"
          className={`main-image ${isZoomed ? 'main-image-zoomed' : ''}`}
        />
      </div>
    </div>
  )
}

export default ImageGallery

const IMAGE_BASE_URL = 'https://fastcard-1-o23z.onrender.com/images/'

export const getImageUrl = (imagePath: string | null | undefined): string => {
  if (!imagePath) {
    return 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=300'
  }
  
  if (imagePath.startsWith('http')) {
    return imagePath
  }

  // Handle Unsplash images that were saved without the origin
  if (imagePath.startsWith('photo-')) {
    return `https://images.unsplash.com/${imagePath}`
  }

  return `${IMAGE_BASE_URL}${imagePath}`
}

import React, { useState, useEffect } from 'react';
import { Image, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

// Function to generate the remote image URL
const getImageUrl = (name) => 
  `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${name}?raw=true`;

export default CachedImage = ({ imageName, style, accessibilityLabel }) => {
  const [localUri, setLocalUri] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      // Define a local path in the cache directory
      const fileUri = `${FileSystem.cacheDirectory}${imageName}`;
      console.log('fileUri', fileUri);

      // Check if the image exists locally
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (fileInfo.exists) {
        setLocalUri(fileInfo.uri);
      } else {
        try {
          // If not, download the image and cache it locally
          const imageUrl = getImageUrl(imageName);
          const downloadedImage = await FileSystem.downloadAsync(imageUrl, fileUri);
          setLocalUri(downloadedImage.uri);
        } catch (error) {
          console.error('Error caching image:', error);
        }
      }
    };

    loadImage();
  }, [imageName]);

  if (!localUri) {
    // Optionally, render a placeholder while loading
    console.log('Image not found', imageName);
    return null;
  }

  return (
    <Image
      source={{ uri: localUri }}
      style={style}
      accessibilityLabel={accessibilityLabel}
    />
  );
};

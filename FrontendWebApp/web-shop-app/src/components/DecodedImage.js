import { useEffect, useState } from 'react';
import { Card, CardMedia } from '@mui/material';

export const DecodedImage = ({ base64String }) => {
  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {
    const decodedImage = new Image();
    decodedImage.src = `data:image/jpeg;base64,${base64String}`;
    decodedImage.onload = () => {
      setImageSrc(decodedImage.src);
    };
  }, [base64String]);

  return (
    <Card>
      <CardMedia
        component="img"
        alt="Decoded Image"
        image={imageSrc}
      />
    </Card>
  );
};

// src/components/ProductCard.js
import React from 'react';
import { Box, Image, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={product.image} alt={product.title} />
      <Box p="6">
        <Text fontWeight="bold">{product.title}</Text>
        <Text>{product.category}</Text>
        <Text>${product.price}</Text>
        <Link to={`/product/${product.id}`}>
          <Button mt={4} colorScheme="teal">More Details</Button>
        </Link>
      </Box>
    </Box>
  );
};

export default ProductCard;

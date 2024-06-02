import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, GridItem, Button } from '@chakra-ui/react';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products/${id}`);
        setProduct(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <Grid>
      {product && (
        <>
          <GridItem>
            <Card>
              <CardTitle>{product.title}</CardTitle>
              <CardText>{product.category}</CardText>
              <CardText>${product.price}</CardText>
            </Card>
          </GridItem>
          <GridItem>
            <Button as={Link} to={`/product/${product.id}/edit`}>
              Edit Product
            </Button>
          </GridItem>
        </>
      )}
    </Grid>
  );
};

export default ProductDetailsPage;
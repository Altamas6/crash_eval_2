import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Grid, GridItem, Button, Select } from '@chakra-ui/react';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState('ascending');
  const [category, setCategory] = useState('all');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products');
        setProducts(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSortChange = (e) => {
    setSort(e.target.value);
    setSearchParams({ sort: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSearchParams({ category: e.target.value });
  };

  const filteredProducts = products.filter((product) => {
    if (category!== 'all') {
      return product.category === category;
    }
    return true;
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sort === 'ascending') {
      return a.price - b.price;
    }
    return b.price - a.price;
  });

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={4}>
      {sortedProducts.map((product) => (
        <GridItem key={product.id}>
          <Card>
            <CardTitle>{product.title}</CardTitle>
            <CardText>{product.category}</CardText>
            <CardText>${product.price}</CardText>
            <Button as={Link} to={`/product/${product.id}`}>
              More Details
            </Button>
          </Card>
        </GridItem>
      ))}
      <Select value={sort} onChange={handleSortChange}>
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
      </Select>
      <Select value={category} onChange={handleCategoryChange}>
        <option value="all">All</option>
        <option value="category1">Category 1</option>
        <option value="category2">Category 2</option>
      </Select>
    </Grid>
  );
};

export default HomePage;
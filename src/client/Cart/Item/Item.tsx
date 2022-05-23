import Button from '@material-ui/core/Button';
// Types
import { ItemProps } from '../../types';
// Styles
import { Wrapper } from './Item.styles';

const Item: React.FC<ItemProps> = ({ item, handleAddToCart, handleViewDetails }) => (
  <Wrapper>
    <img src={item.image} alt={item.title} />
    <div>
      <h3>{item.title}</h3>
      <h3>${item.price}</h3>
    </div>
    <Button
      onClick={() => handleAddToCart(item)}
      data-cy={`add-to-cart-${item.id}`}>Add to cart</Button>
    <Button variant="text" onClick={() => handleViewDetails(item)}>Details</Button>
  </Wrapper>
);

export default Item;


import {
  Add,
  Circle,
  East,
  FavoriteBorder,
  Star,
  StarsRounded,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

type Props = {
  title: string;
  price: number;
  originalPrice: number;
  freeShipping: boolean;
  shopName: string;
  images: string[];
};

function Item({
  title,
  price,
  originalPrice,
  freeShipping,
  shopName,
  images,
}: Props) {
  const navigate = useNavigate();
  return (
    <div
      className='w-full group cursor-pointer'
      onClick={() => navigate("/ui/details")}
    >
      {/* image */}
      <div className='w-full aspect-square relative'>
        <img
          className='w-full h-full'
          src={
            images.length
              ? images[0]
              : "https://i.etsystatic.com/32449061/c/1736/1736/1001/247/il/3016e0/5603975653/il_300x300.5603975653_lo3t.jpg"
          }
          alt=''
        />
        <div className='absolute top-3 left-3 py-1 px-4 text-[12px] font-medium rounded-full border border-gray-400 bg-white hover:shadow-lg hover:shadow-gray-500'>
          Popular Now
        </div>
        <div className='absolute top-3 right-3 p-1 rounded-full border border-gray-400 bg-white hover:shadow-lg hover:shadow-gray-500 hidden group-hover:block duration-500 transition-all'>
          <FavoriteBorder fontSize={"small"} />
        </div>
      </div>
      {/* details */}
      {/* header */}
      <h3 className='overflow-hidden w-full text-ellipsis whitespace-nowrap mt-2'>
        {title}
      </h3>
      {/* rating */}
      <div className='flex items-center'>
        <p className='me-1'>4.9</p>
        <div className='flex text-[15px]'>
          <Star fontSize='inherit' />
        </div>
        <p className='ms-1'>(5.3k)</p>
        <div className='text-[4px] px-1'>
          <Circle fontSize='inherit' />
        </div>
        <p className='text-gray-600 flex-items-center gap-1'>
          <StarsRounded
            fontSize='inherit'
            sx={{
              color: "darkviolet",
            }}
          />{" "}
          {shopName}
        </p>
      </div>
      {/* price */}
      <div className='order-3 md-order-none flex items-center gap-2 mt-1'>
        <h3 className='text-green-700 text-[11px] md:text-[16px] font-medium'>
          USD {price}
        </h3>
        <p className='text-gray-600'>
          <span className='line-through text-[11px]'>USD{originalPrice}</span>
          <span className='ms-2'>
            ({((100 * price) / originalPrice).toFixed(2)} % off)
          </span>
        </p>
      </div>
      <p className='text-green-700 text-[13px] font-medium'>
        Sale ends in 3 hours
      </p>
      <p className='w-fit text-[11px] font-medium text-gray-500'>
        {freeShipping && "Free shipping"}
        {!freeShipping && "\u00A0"}
      </p>
      {/* buttons */}
      <div className='flex xs:flex-col lg:flex-row lg:items-center gap-6 mt-6'>
        <button className='ui-btn-base py-1 flex items-center gap-1'>
          <Add />
          <span className='pe-2'>Add to cart</span>
        </button>
        <button className='flex items-center gap-2 text-[13px] font-medium'>
          <span>More like this</span>
          <East />
        </button>
      </div>
    </div>
  );
}

export default Item;

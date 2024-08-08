import {
  CardGiftcard,
  FavoriteBorder,
  MenuOutlined,
  ShoppingCartOutlined,
  Subject,
} from "@mui/icons-material";
import Hoverable from "@/components/UIChallenge/Nav/Hoverable";
import Search from "./Search";

function Nav() {
  return (
    <>
      <nav className='px-5 max-w-[1325px] mx-auto flex items-center gap-1 md:gap-5 py-3 justify-between flex-wrap md:flex-nowrap'>
        <h1 className='text-orange-500  text-[30px] md:text-[40px] font-medium font-serif w-[45%] sm:w-[70%] md:w-fit'>
          Etsy
        </h1>
        <div className='hidden md:flex items-center gap-2 font-medium hover-gray'>
          <MenuOutlined />
          <p className=''>Categories</p>
        </div>
        <div className='flex items-center order-7 md:order-none w-[100%] md:w-[65%] gap-2 mt-3 md:mt-0'>
          <div className='md:hidden hover-gray'>
            <Subject />
          </div>

          <Search />
        </div>
        <Hoverable>
          <p className='font-medium'>Sign in</p>
        </Hoverable>

        <Hoverable type='info'>
          <FavoriteBorder />
          <Hoverable.Info>Favourites</Hoverable.Info>
        </Hoverable>
        <Hoverable type='info'>
          <CardGiftcard />
          <Hoverable.Info>Gift Mode</Hoverable.Info>
        </Hoverable>
        <Hoverable type='info'>
          <ShoppingCartOutlined />
        </Hoverable>
      </nav>
      <div className='border-b-2 border-b-gray-300  justify-center gap-10 pb-3 hidden md:flex'>
        <Hoverable>
          <p className='font-medium'>Gift Mode</p>
        </Hoverable>
        <Hoverable>
          <p className='font-medium'>Back-to-School Savings</p>
        </Hoverable>

        <Hoverable>
          <p className='font-medium'>Home Favorites</p>
        </Hoverable>

        <Hoverable>
          <p className='font-medium'>Fashion Finds</p>
        </Hoverable>
        <Hoverable>
          <p className='font-medium'>Registry</p>
        </Hoverable>
      </div>
    </>
  );
}

export default Nav;

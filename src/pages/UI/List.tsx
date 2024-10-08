import Nav from "@/components/UIChallenge/Nav";
import { useEffect } from "react";
import "../../index.css";
import "../../ui-challenge-styles.css";
import SearchResultTopItem from "@/components/UIChallenge/SearchResultTopItem";
import SearchFilter from "@/components/UIChallenge/SearchFilter";
import ProductItem from "@/components/UIChallenge/ProductItem";

function List() {
  useEffect(() => {
    document.title = "Etsy";
  }, []);
  return (
    <main className='text-sm ui-font'>
      <Nav />
      <SearchResultTopItem />
      <SearchFilter />
      <ProductItem />
    </main>
  );
}

export default List;

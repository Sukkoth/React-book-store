import Nav from "@/components/UIChallenge/Nav";
import "../../index.css";
import "../../ui-challenge-styles.css";

function Details() {
  return (
    <main className='text-sm ui-font'>
      <Nav />
      <div className='px-5 max-w-[1325px] mx-auto mt-10'>
        <div className='w-[40rem] aspect-square bg-stone-100'></div>
      </div>
    </main>
  );
}

export default Details;

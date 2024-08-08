import { Clear, SearchOutlined } from "@mui/icons-material";
import { useRef, useState } from "react";
import Hoverable from "./Hoverable";

function Search() {
  const [isFocused, setIsFocused] = useState(false);
  const [fieldValue, setFieldValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const showClearBtn = fieldValue.length > 0;

  return (
    <div
      className={`w-full border-2  rounded-3xl flex group overflow-hidden ${
        isFocused ? "border-gray-400" : "border-gray-800"
      }`}
    >
      <input
        ref={inputRef}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => setFieldValue(e.target.value)}
        placeholder='Search for anything'
        type='text'
        value={fieldValue}
        className='px-5 w-full py-3 border-none text-[16px] rounded-3xl rounded-r-none outline-none'
      />
      <div
        className={`flex w-12 justify-center items-center relative text-white}`}
      >
        <div
          className={`text-white relative after:absolute after:bg-orange-600 after:-z-10 ${
            isFocused
              ? "after:-inset-5"
              : "after:-inset-[6px] after:rounded-full group-hover:after:-inset-5 group-hover:after:bg-orange-400"
          } after:duration-300 after:transition-all`}
        >
          <SearchOutlined />
        </div>
        <div
          className={`text-black absolute -left-10 ${
            showClearBtn ? "block" : "hidden"
          }`}
        >
          <Hoverable
            onClick={() => {
              setFieldValue("");
              inputRef?.current?.focus();
            }}
          >
            <Clear />
          </Hoverable>
        </div>
      </div>
    </div>
  );
}

export default Search;

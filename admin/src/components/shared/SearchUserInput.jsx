import { Search } from "lucide-react";
import { useUserData } from "../../hooks/useContext";
import { searchUser } from "../../api/UserApi";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";

const SearchUserInput = () => {
  const { setSearchResult, activeBtn, setActiveBtn } = useUserData();
  const [searchVal, setSearchVal] = useState("");
  const inputRef = useRef()

  const searchUserHandler = async () => {
    const trimmed = searchVal.trim();
    if (!trimmed) {
      toast.error("Invalid input!");
      inputRef.current.focus()
      setActiveBtn("all")
      return;
    }
    const res = await searchUser(searchVal);
    if (res.success) {
      setSearchResult(res.data.data);
      setActiveBtn("search");
    } else toast.error(res.message);
  };

  useEffect(()=>{
    if(activeBtn === 'search'){
      inputRef.current.focus()
    }else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSearchVal('')
    }
  }, [activeBtn])

  return (
    <div className="border rounded-full overflow-hidden bg-(--clr-input-bg) items-center gap-2 flex">
      <button onClick={searchUserHandler} className="border-r px-3">
        <Search
          color="var(--clr-text-secondary)"
          className="shrink-0"
          size={18}
        />
      </button>
      <input
      ref={inputRef}
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        className="py-1.5 px-2 w-full outline-none text-ellipsis"
        type="text"
        placeholder="Search by name, email or phone"
        name="search"
      />
    </div>
  );
};

export default SearchUserInput;

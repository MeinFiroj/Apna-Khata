import {UserRoundPlus } from "lucide-react";
import Button from "./Button.jsx";
import SearchUserInput from "./SearchUserInput.jsx";
import FadeInContainer from "./FadeInContainer.jsx";
import { useState } from "react";

const Header = () => {
  const [isActive, setIsActive] = useState(false)
  return (
    <header className="flex items-center justify-between p-(--pad-phone) md:px-6 shadow-md sticky top-0 bg-(--clr-bg) z-10">
      <div className="md:hidden">
        <h2 className="font-bold text-(--clr-primary) text-lg">Apna Khata</h2>
      </div>
      <div className="min-w-1/2 hidden md:block">
        <SearchUserInput />
      </div>
      <div className="shrink-0 flex items-center gap-5">
        <Button
        onClick={()=> setIsActive(true)}
          text={
            <UserRoundPlus/>
          }
          btnStyle={
            "hidden md:flex rounded-full md:py-1.5"
          }
        />
        <img
          className="rounded-full w-7 aspect-square shadow border md:w-9 "
          src="https://imgcdn.stablediffusionweb.com/2024/5/30/45b6deec-9bb2-452c-abdf-58fdd6f71894.jpg"
          alt="Profile Icon"
        />
      </div>
      <FadeInContainer
        isActive={isActive}
        setIsActive={setIsActive}
        content="newCustomer"
      />

    </header>
  );
};

export default Header;

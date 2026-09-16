import SearchUserInput from "../components/shared/SearchUserInput";
import { useUserData } from "../hooks/useContext";
import { ClipLoader } from "react-spinners";
import { ArrowBigLeft, UserRoundPlus } from "lucide-react";
import CustListingTemplate from "../components/customer/CustListingTemplate";
import Button from "../components/shared/Button";
import { useState } from "react";
import FadeInContainer from "../components/shared/FadeInContainer";
import BackButton from "../components/shared/BackButton";

const Customers = () => {
  const { users, searchResult, overdue, activeBtn, setActiveBtn } =
    useUserData();
  const [isActive, setIsActive] = useState(false);

  const filteredUsers =
    activeBtn === "all"
      ? users.map((user) => {
          const balance = user.totalBalance || user.balance || 0;
          let status;
          if (balance === 0) status = "settled";
          else if (overdue.some((e) => e._id === user._id)) status = "overdue";
          else status = "pending";
          return { ...user, status };
        })
      : searchResult;

  return (
    <main className=" h-full min-h-0 flex flex-col overflow-hidden pb-(--footer-space) md:pb-2">
      <div className="flex shrink-0 flex-col gap-3 px-(--pad-phone) pt-5 md:pt-0">
        <div className="md:hidden ">
          <SearchUserInput />
        </div>

        {activeBtn === "search" && <BackButton setActiveBtn={setActiveBtn} />}
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto pt-5">
        {!filteredUsers ? (
          <ClipLoader />
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map((user) => {
            const { _id, name, number, image, status, totalBalance, balance } =
              user;
            return (
              <CustListingTemplate
                key={_id}
                id={_id}
                name={name}
                number={number}
                image={image}
                status={status}
                balance={totalBalance || balance}
              />
            );
          })
        ) : (
          <p className="text-center font-medium text-(--clr-text-muted)">
            0 items
          </p>
        )}
      </div>

      <Button
        onClick={() => setIsActive(true)}
        text={<UserRoundPlus size={22} />}
        btnStyle={"rounded-full fixed bottom-15 right-3 md:hidden"}
      />
      <FadeInContainer
        isActive={isActive}
        setIsActive={setIsActive}
        content="newCustomer"
      />
    </main>
  );
};

export default Customers;

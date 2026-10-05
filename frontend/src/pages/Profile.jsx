import { format } from "date-fns";
import FullPageLoader from "../components/shared/FullPageLoader";
import { useAuth } from "../context/auth/useAuth";
import { logoutUser } from "../api/authApi";
import toast from "react-hot-toast";

const Profile = () => {
  const { userData,setUserData, isUserLoading } = useAuth();

  const handleLogoutUser = async() =>{
    try {
      const res = await logoutUser()
      setUserData(null)
      toast.success(res.data.message)
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <main className="w-full relative">
      {isUserLoading && <FullPageLoader />}
      <div className="bg-gray-200 absolute top-0 left-0 w-full h-40"></div>
      <section className="w-full max-w-100 mx-auto down-shadow p-(--pad-desk) rounded-lg">
        <div className="w-full pt-10 box-border relative p-(--pad-phone) flex items-center justify-center">
          <img
            className="h-40 aspect-square object-cover object-top rounded-3xl shadow-xl relative"
            src={userData.image}
            alt="profile-image"
          />
        </div>
        <div className="">
          <h3 className="text-center font-semibold capitalize mb-5">
            {userData.name}
          </h3>
          <div className="flex items-center gap-2 text-sm md:text-base">
            <span className="font-medium text-(--clr-text-muted)">
              Mail ID -
            </span>
            <p className="font-medium">{userData.email}</p>
          </div>
          <div className="flex items-center gap-2 text-sm md:text-base">
            <span className="font-medium text-(--clr-text-muted)">
              Contact -
            </span>
            <p className="font-medium">+91 {userData.number}</p>
          </div>
          <div className="flex items-center gap-2 text-sm md:text-base">
            <span className="font-medium text-(--clr-text-muted)">
              Member Since -
            </span>
            <p className="font-medium">
              {format(new Date(userData.createdAt), "MMM, yyyy")}
            </p>
          </div>
          <button onClick={()=> handleLogoutUser()} className="font-medium w-full cursor-pointer bg-gray-200 text-(--clr-primary) text-sm rounded px-6 pt-2 pb-1 uppercase mt-10 md:py-2 md:w-fit ">
            Logout
          </button>
        </div>
      </section>
    </main>
  );
};

export default Profile;

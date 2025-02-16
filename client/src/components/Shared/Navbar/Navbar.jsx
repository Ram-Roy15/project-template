import Container from "../Container";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/images/placeholder.jpg";
import HostModal from "../../Modal/HostModal";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAxiosCommon from "../../../hooks/useAxiosCommon";

const Navbar = () => {
  const { user, logOut } = useAuth();
  // const axiosSecure = useAxiosSecure();
  const axiosCommon = useAxiosCommon();
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = async () => {
    // setIsModalOpen(true);
    // handleModalClose(false);
    try {
      const currentUser = {
        email: user?.email,
        role: "guest",
        status: "Requested",
      };
      const { data } = await axiosCommon.put(
        `/user`,
        currentUser
        // { withCredentials: true }
      );
      if (data.modifiedCount > 0) {
        toast.success("Please wait for admin approval");
      } else {
        toast.error("You are already send request to admin");
      }
      console.log(data);
      return data;
    } catch (error) {
      console.log(error.message);
    } finally {
      handleModalClose();
    }
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const logedOut = () => {
    logOut();
  };

  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row  items-center justify-between gap-3 md:gap-0">
            {/* Logo */}
            <Link to="/">
              <img
                // className='hidden md:block'
                src="https://i.ibb.co/4ZXzmq5/logo.png"
                alt="logo"
                width="100"
                height="100"
              />
            </Link>
            {/* Dropdown Menu */}
            <div className="relative">
              <div className="flex flex-row items-center gap-3">
                {/* Become A Host btn */}
                {/* <div className="hidden md:block"> */}
                {/* {!user && ( */}
                <button
                  // disabled={!user}
                  onClick={() => setIsModalOpen(true)}
                  className="disabled:cursor-not-allowed cursor-pointer hover:bg-neutral-100 py-3 px-4 text-sm font-semibold rounded-full  transition"
                >
                  Host your home
                </button>
                {/* )} */}
                {/* </div> */}
                <HostModal
                  isModalOpen={isModalOpen}
                  handleModal={handleModal}
                  handleModalClose={handleModalClose}
                ></HostModal>
                {/* Dropdown btn */}
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                  <AiOutlineMenu />
                  <div className="hidden md:block">
                    {/* Avatar */}
                    <img
                      className="rounded-full"
                      referrerPolicy="no-referrer"
                      src={user && user.photoURL ? user.photoURL : avatarImg}
                      alt="profile"
                      height="30"
                      width="30"
                    />
                  </div>
                </div>
              </div>
              {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
                  <div className="flex flex-col cursor-pointer">
                    <Link
                      to="/"
                      className="block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                    >
                      Home
                    </Link>

                    {user ? (
                      <>
                        <Link
                          to="/dashboard"
                          className="btn w-full px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
                        >
                          Deshboard
                        </Link>
                        <button
                          onClick={logedOut}
                          className="btn w-full px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;

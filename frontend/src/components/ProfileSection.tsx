import { useContext, useEffect } from "react";
import { AppContext, Context } from "../context/AppContext";
import { FaRegCircleDot } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const ProfileSection = () => {
  const navigate = useNavigate();
  const { user, loading, setUser, status } = useContext(AppContext) as Context;
  const name = user.name;

  useEffect(() => {
    if (status === 403) {
      toast((t) => (
        <div className="flex justify-between bg-red-700 text-white p-4 rounded-md shadow-lg -mx-5 -my-3 w-96">
          <span className="font-bold">Please Set up your profile first</span>
          <button
            className="ml-2 text-red-500"
            onClick={() => {
              toast.dismiss(t.id);
            }}
          >
            ❌
          </button>
        </div>
      ));
    }
  }, [status]);

  useEffect(() => {
    setUser(user);
  }, [loading]);

  return (
    <>
      <Toaster />
      {!loading ? (
        status === 200 ? (
          user.name !== "" ? (
            <section className="bg-dark-green mt-20 flex font-medium items-center justify-center min-h-screen text-black">
              <section className="mx-auto mt-6 mb-6 bg-dark-green md:bg-dark-green md:rounded-2xl flex flex-col justify-center items-center px-8 py-6 md:shadow-2xl w-full max-w-md md:max-w-lg lg:max-w-xl border-2 border-light-green">
                <div className="mt-6 w-fit mx-auto">
                  <div className="rounded-full font-playwrite flex items-center justify-center text-3xl text-black w-28 h-28 border-4 border-light-green">
                    {name[0].toUpperCase()}
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <h2 className="text-black font-bold text-2xl tracking-wide">
                    {name}
                  </h2>
                </div>

                <div className="mt-4 w-full">
                  <table className="text-black text-xl tracking-wide w-full">
                    <tbody>
                      <tr className="mt-4 flex items-center">
                        <td className="flex items-center">
                          <FaRegCircleDot
                            fill="black"
                            size={20}
                            className="mt-[0.3rem] mr-3"
                          />
                          <span className="text-2xl">Age : </span>
                        </td>
                        <td className="ml-2 mt-1">{user?.age}</td>
                      </tr>
                      <tr className="mt-4 flex items-center">
                        <td className="flex items-center">
                          <FaRegCircleDot
                            fill="black"
                            size={20}
                            className="mt-[0.3rem] mr-3"
                          />
                          <span className="text-2xl">Country : </span>
                        </td>
                        <td className="ml-2 mt-1">{user?.country}</td>
                      </tr>
                      <tr className="mt-4 flex items-center">
                        <td className="flex items-center">
                          <FaRegCircleDot
                            fill="black"
                            size={20}
                            className="mt-[0.3rem] mr-3"
                          />
                          <span className="text-2xl">State : </span>
                        </td>
                        <td className="ml-2 mt-1">{user?.state}</td>
                      </tr>
                      <tr className="mt-4 flex items-center">
                        <td className="flex items-center">
                          <FaRegCircleDot
                            fill="black"
                            size={20}
                            className="mt-[0.3rem] mr-3"
                          />
                          <span className="text-2xl">City : </span>
                        </td>
                        <td className="ml-2 mt-1">{user?.city}</td>
                      </tr>
                      <tr className="mt-4 flex items-center">
                        <td className="flex items-center">
                          <FaRegCircleDot
                            fill="black"
                            size={20}
                            className="mt-[0.3rem] mr-3"
                          />
                          <span className="text-2xl">Area : </span>
                        </td>
                        <td className="ml-2 mt-1">{user?.area}</td>
                      </tr>
                      <tr className="mt-4 flex flex-col break-all">
                        <td className="flex items-center mb-2">
                          <FaRegCircleDot
                            fill="black"
                            size={20}
                            className="mt-[0.3rem] mr-3"
                          />
                          <span className="text-2xl">Email : </span>
                        </td>
                        <td className="flex">
                          <FaArrowRight
                            className="mr-2 mt-[0.3rem]"
                            size={20}
                          />
                          {user.email}
                        </td>
                      </tr>
                      <tr className="mt-6 flex justify-center items-center break-all whitespace-normal">
                        <td>
                          <button
                            onClick={() => navigate("/setProfile")}
                            className="flex justify-center items-center hover:bg-green-300 text-xl border-black border-2 bg-dark-green p-4 rounded-lg text-black hover:bg-light-green"
                          >
                            Edit Profile
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </section>
          ) : (
            <Loading />
          )
        ) : (
          <div className="min-h-screen flex items-center justify-center bg-dark-green text-black">
            <button
              onClick={() => navigate("/setProfile")}
              className="rounded-lg text-black bg-dark-green flex justify-center items-center border-black border-2 text-xl font-semibold p-8 hover:bg-light-green"
            >
              Set your Profile
            </button>
          </div>
        )
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ProfileSection;

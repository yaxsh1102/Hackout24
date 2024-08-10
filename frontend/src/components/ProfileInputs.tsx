import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext, Context } from "../context/AppContext";
import Loading from "./Loading";

const ProfileInputs = () => {
  const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;
  const navigate = useNavigate();
  const { user, setUser } = useContext(AppContext) as Context;
  const [userInput, setUserInput] = useState({
    age: "",
    area: "",
    city: "",
    state: "",
    country: "",
    name: user.name,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
      setUserInput({
        area: user?.area || "",
        age: user?.age || "",
        city: user?.city || "",
        state: user?.state || "",
        country: user?.country || "",
        name: user.name,
      });
    }, 2000);
  }, [user]);

  async function updateProfile() {
    const headers = {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    };

    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/v1/user/updateProfile`,
        userInput,
        {
          headers: headers,
        }
      );
      if (res.status !== 200) {
        toast((t) => (
          <div className="flex justify-between bg-red-700 text-white p-4 rounded-md shadow-lg -mx-5 -my-3 w-96">
            <span className="font-bold">Error in updating profile</span>
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
      } else {
        toast("Profile updated successfully", {
          icon: "✅",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        setUser({
          ...user,
          name: userInput.name,
        });
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      alert("Error while sending request");
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    field: "area" | "age" | "city" | "state" | "country" | "name"
  ) {
    setUserInput({
      ...userInput,
      [field]: e.target.value,
    });
  }

  return (
    <>
      {loading ? (
        <div className="w-screen min-h-full p-6 bg-white flex items-center mt-12  justify-center">
          <Toaster />
          <div className="container max-w-screen-md h-full mx-auto py-10 flex flex-col items-center">
            <div className="text-black text-5xl font-bold font-playwrite mb-10 mt-10">
              {user ? <span>Update</span> : <span>Set</span>} Your Profile
            </div>
            <div className="px-8">
              <div className="bg-white border-2 border-black rounded shadow-lg p-4 px-4 md:p-12 mb-6">
                <div className="lg:col-span-2 gap-4">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 text-black  md:grid-cols-5">
                    {user ? (
                      <div className="md:col-span-5 mb-6">
                        <label className="text-xl">Name :</label>
                        <input
                          onChange={(e) => handleChange(e, "name")}
                          type="text"
                          className="h-14 text-lg text-black border mt-1 rounded px-4 w-full bg-gray-50"
                          defaultValue={user.name}
                        />
                      </div>
                    ) : null}

                    <div className="md:col-span-5 mb-6">
                      <label className="text-xl">Address :</label>
                      <input
                        onChange={(e) => handleChange(e, "area")}
                        type="text"
                        className="h-14 text-lg text-black border mt-1 rounded px-4 w-full bg-gray-50"
                        defaultValue={user ? user.area : ""}
                      />
                    </div>

                    {/* <div className="md:col-span-3 mb-6">
                      <label className="text-xl">Phone no. :</label>
                      <input
                        onChange={(e) => handleChange(e, "phone")}
                        type="number"
                        className="h-10 text-lg text-black border mt-1 rounded px-4 w-full bg-gray-50"
                        defaultValue={profile ? profile.phone : ""}
                        placeholder="9876543221"
                      />
                    </div> */}

                    <div className="md:col-span-2 mb-6">
                      <label className="text-xl">City : </label>
                      <input
                        type="text"
                        onChange={(e) => handleChange(e, "city")}
                        className="h-10 border text-black text-lg mt-1 rounded px-4 w-full bg-gray-50"
                        defaultValue={user ? user.city : ""}
                        placeholder="Ahmedabad"
                      />
                    </div>

                    <div className="md:col-span-2 mb-4 md:mr-4">
                      <label className="text-xl">Country : </label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <input
                          onChange={(e) => handleChange(e, "country")}
                          defaultValue={user ? user.country : ""}
                          placeholder="India"
                          className="px-4 text-lg text-black appearance-none outline-none  w-full bg-transparent"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-2 mb-4  md:mr-4">
                      <label className="text-xl">State : </label>
                      <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                        <input
                          onChange={(e) => handleChange(e, "state")}
                          defaultValue={user ? user.state : ""}
                          placeholder="Gujarat"
                          className="px-4 text-lg text-black appearance-none outline-none  w-full bg-transparent"
                        />
                      </div>
                    </div>

                    <div className="md:col-span-1">
                      <label className="text-xl">Age : </label>
                      <input
                        type="number"
                        onChange={(e) => handleChange(e, "age")}
                        className="transition-all text-lg text-black flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        defaultValue={user ? user.age : ""}
                        placeholder="18"
                      />
                    </div>

                    <div className="md:col-span-5 text-center mt-6">
                      <div className="inline-flex items-end">
                        <button
                          onClick={updateProfile}
                          className="bg-black text-xl hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ProfileInputs;

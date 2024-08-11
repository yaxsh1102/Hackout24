import { useNavigate } from "react-router-dom";
import axios from "axios";
import pic from "../assets/qr.jpg";
import toast, { Toaster } from "react-hot-toast";

const PaymentGateway = () => {
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;
  async function clickHandler() {
    toast((t) => (
      <div className="flex justify-between items-center bg-green-700 text-white p-4 rounded-md shadow-lg -mx-2 -my-4 w-96">
        <span className="font-bold">Payment Completed Successfully</span>
        <button
          className="ml-2 text-white text-[1.5rem] my-auto "
          onClick={() => {
            toast.dismiss(t.id);
          }}
        >
          ❎
        </button>
      </div>
    ));
    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/v1/user/updateType`,
        { type: "annual" },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      if (res) {
        window.location.reload();
        navigate("/");
      } else console.log("error while making payment");
    } catch (error) {
      console.log(error);
    }
  }
  const styles = {};
  return (
    <>
      <Toaster></Toaster>
      <div>
        <div className="min-w-screen min-h-screen flex flex-col items-center justify-center px-5 pb-10 pt-16 gap-y-8">
          <div
            className="w-full flex flex-col items-center justify-center mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700 space-y-5 max-w-[600px] border-black border-[1px] "
            style={styles}
          >
            <div className="w-full pt-1">
              <div
                className="bg-green-800 text-white font-extrabold overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center"
                style={styles}
              >
                <i className="mdi mdi-credit-card-outline text-[30px] font-playwrite">
                  AQ
                </i>
              </div>
            </div>
            <div className="mb-10">
              <h1 className="text-center font-bold  flex flex-wrap text-xl uppercase">
                Secure payment info
              </h1>
            </div>

            <div className="space-y-3 flex flex-col items-center justify-center">
              <img src={pic} width={250}></img>

              <div className="text-lg flex flex-wrap">
                Scan above QR using mobile phone
              </div>
            </div>
          </div>
          <button
            className=" w-[20rem] h-[3rem] bg-green-800 text-white rounded-sm hover:bg-green-900"
            onClick={clickHandler}
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentGateway;

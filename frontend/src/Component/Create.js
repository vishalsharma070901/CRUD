import axios from "axios";
import React, { useState } from "react";
import { URL } from "../URLs";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Create = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hobby, setHobby] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!name ||! email || !phone|| !hobby){
      toast.error('Please fill all the fields correctly', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
    
    }
     if(name && email && phone && hobby){
      axios
      .post(URL + "/api/user/create", { name, email, phone, hobby })
      .then((res) => { window.location.reload()})
      .catch((err) => console.log(err));
      
      toast.success('Thank You!, Your data added', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
        
     }
   
    
  };
  return (
    <>
      <ToastContainer
     position="top-center"
     autoClose={5000}
     hideProgressBar={false}
     newestOnTop={false}
     closeOnClick
     rtl={false}
     pauseOnFocusLoss
     draggable
     pauseOnHover
     theme="colored"
     transition={Bounce}
     />
    <section className="bg-gray-800 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
              Add Data
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg  block w-full p-2.5 "
                  placeholder="Enter your Name"
                  required=""
                  onChange={(e) => setName(e.target.value)}
                  />
              </div>
              <div>
                <input
                  type="email"
                  className="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg  block w-full p-2.5 "
                  placeholder="Enter your Email"
                  required=""
                  onChange={(e) => setEmail(e.target.value)}
                  />
              </div>
              <div>
                <input
                  type="tel"
                  className="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg  block w-full p-2.5 "
                  placeholder="Enter your Phone"
                  required=""
                  onChange={(e) => {
                    let phonenumber = e.target.value;
                    let a = parseInt(phonenumber);

                    if (a) {
                      if (phonenumber.length <= 10) {
                        setPhone(phonenumber);
                      }
                    } else {
                      setPhone("");
                    }
                  }}
                />
              </div>
              <div>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg  block w-full p-2.5 "
                  placeholder="Enter your Hobby"
                  required=""
                  onChange={(e) => setHobby(e.target.value)}
                  />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                Add Data
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
   
     </>
  );
};

export default Create;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { URL } from "../URLs";

const Update = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [hobby, setHobby] = useState("");
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    axios
      .get(URL + "/api/user/" + id)
      .then((res) => {
        console.log(res);
        setName(res.data.name);
        setEmail(res.data.email);
        setPhone(res.data.phone);
        setHobby(res.data.hobby);
      })
      .catch((err) => console.log(err));
  }, []);

  const updateData = (e) => {
    e.preventDefault();
    axios
      .put(URL + "/api/user/update/" + id, { name, email, phone, hobby })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    navigate("/");
  };
  return (
    <section class="bg-gray-800 ">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
              Update Data
            </h1>
            <form class="space-y-4 md:space-y-6" onSubmit={updateData}>
              <div>
                <input
                  type="text"
                  class="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg  block w-full p-2.5 "
                  placeholder="Enter your Name"
                  required=""
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="email"
                  class="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg  block w-full p-2.5 "
                  placeholder="Enter your Email"
                  required=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  value={phone}
                  class="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg  block w-full p-2.5 "
                  placeholder="Enter your Phone"
                  required=""
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  class="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg  block w-full p-2.5 "
                  placeholder="Enter your Hobby"
                  required=""
                  value={hobby}
                  onChange={(e) => setHobby(e.target.value)}
                />
              </div>

              <button
                type="submit"
                class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Update Data
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Update;

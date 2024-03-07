import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { URL } from "../URLs";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get(URL + "/api/user")
      .then((users) => setUsers(users.data))
      .catch((err) => console.log(err));
  }, []);

  const HandleDelete = (id) => {
    axios.delete(URL + "/api/user/delete/" + id).then((res) => {
      console.log(res);
      window.location.reload();
    });
    alert("Data Deleted");
  };
  const [userId, setuserId] = useState("");
  const [ischecked, setIsChecked] = useState([]);

  const handleSend = async () => {
    try {
      const id = ischecked;
      console.log(id);
      await axios.post(URL + "/api/user/send-data/" + id);
      alert("Data sent sucessfully");

      console.log(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className=" flex justify-center items-center mt-10 ">
        <div className=" overflow-x-auto shadow-md sm:rounded-lg">
          <Link to={"/create"}>
            {" "}
            <button
              type="button"
              className=" text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              ADD
            </button>
          </Link>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => handleSend()}
          >
            SEND
          </button>
          <table className="w- text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Select
                </th>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Hobby
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((val, key) => {
                return (
                  <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <div className="flex items-center mb-4">
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          value={val._id}
                          checked={val.ischecked}
                          onChange={() => setIsChecked(val._id)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                    </th>
                    <td className="px-6 py-4">{key + 1}</td>
                    <td className="px-6 py-4">{val.name}</td>
                    <td className="px-6 py-4">{val.email}</td>
                    <td className="px-6 py-4">{val.phone}</td>
                    <td className="px-6 py-4">{val.hobby}</td>
                    <td className="px-6 py-4">
                      <Link
                        to={"/update/" + val._id}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        {" "}
                        Edit{" "}
                      </Link>{" "}
                      /{" "}
                      <Link
                        onClick={() => HandleDelete(val._id)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underlin"
                      >
                        delete
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

       
      </div>
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
    </>
  );
};

export default Users;

import React, { useState } from "react";
import { createUser, getUser } from "../services/api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import './layout.css'

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const userData = await getUser(formData.username)
      Cookies.set("userId", userData.user_id, { expires: 7 });
      navigate('/');
      console.log("user logged in", formData);
    } catch (err) {
      console.log(err.response)
      if(err.response.status === 404){
        try{
          const createdUserData = await createUser(formData.username, formData.email)
          console.log(createdUserData)
          Cookies.set("userId", createdUserData.userId, { expires: 7 });
          navigate('/');
          console.log('created user')
        }
        catch(err){
          console.log('err in creating user')
        }
      }
      console.log('err in getting user data',err);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            // required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

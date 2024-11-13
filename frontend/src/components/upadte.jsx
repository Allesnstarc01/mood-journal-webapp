import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PostContext } from "../store/contextAPI";

const UpdateJournal = () => {
  const { getProducts } = useContext(PostContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [value, selectedValue] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getDataForUpdate();
  }, []);
  const getDataForUpdate = async () => {
    let result = await fetch(`http://localhost:5000/update/${params.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setTitle(result.title);
    setContent(result.content);
    selectedValue(result.value);
  };

  const updateJournal = async () => {
    let result = await fetch(`http://localhost:5000/update/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({ title, content, value }),
      headers: {
        "Content-type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    navigate("/my-journal");
    getProducts();
  };
  return (
    <div className="addContainer">
      <div className="input label">Enter Title</div>
      <input
        type="text"
        placeholder="Enter title"
        className="input"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <div className="input label">Content</div>
      <input
        type="text"
        placeholder="Enter content"
        className="input"
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />
      <div className="input label">
        <label htmlFor="dropdown"> Choose an option : </label>
        <select
          id="dropdown"
          onChange={(e) => selectedValue(e.target.value)}
          value={value}
        >
          <option value="">Select</option>
          <option value="Happy">Happy</option>
          <option value="Sad">Sad</option>
          <option value="Confused">Confused</option>
          <option value="Demotivated">Demotivated</option>
          <option value="Motivated">Motivated</option>
        </select>
      </div>
      <button type="button" className="add-button" onClick={updateJournal}>
        Update Journal
      </button>
    </div>
  );
};
export default UpdateJournal;

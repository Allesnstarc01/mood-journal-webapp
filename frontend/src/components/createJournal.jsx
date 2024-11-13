import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../store/contextAPI";
import Quotes from "../store/quotes";

const AddJournal = () => {
  const { getProducts } = useContext(PostContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [value, selectedValue] = useState("");

  const [validInput, setValidInput] = useState(false);
  const navigate = useNavigate();

  const addProduct = async () => {
    let quotes = Quotes[Math.floor(Math.random() * Quotes.length)];
    console.log(quotes);
    if (!title || !content || !value) {
      setValidInput(true);
      return false;
    }
    // console.log(title, content, value, quotes);

    const userId = JSON.parse(localStorage.getItem("users"))._id;
    let result = await fetch("http://localhost:5000/create-journal", {
      method: "post",
      body: JSON.stringify({
        title,
        content,
        value,
        userId,
        quotes,
        createdDate: Date().toString().slice(0, 10),
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      getProducts();
      navigate("/my-journal");
    }
  };
  return (
    <>
      <div className="addContainer">
        <div className="input label">Enter Title</div>
        <input
          maxLength={20}
          type="text"
          placeholder="Enter title"
          className="input"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        {validInput && !title && (
          <span className="validation">Title Cannot be blank..</span>
        )}

        <div className="input label">Enter Content</div>
        <input
          maxLength={50}
          type="text"
          placeholder="Enter content"
          className="input"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        {validInput && !content && (
          <span className="validation">Content Cannot be blank..</span>
        )}
        <div className="input label">
          <label htmlFor="dropdown"> Choose an option : </label>
          <select id="dropdown" onChange={(e) => selectedValue(e.target.value)}>
            <option value="">Select</option>
            <option value="Happy">Happy</option>
            <option value="Sad">Sad</option>
            <option value="Confused">Confused</option>
            <option value="Demotivated">Demotivated</option>
            <option value="Motivated">Motivated</option>
          </select>
          {validInput && !value && (
            <span className="validation">Mood Cannot be blank..</span>
          )}
        </div>
        <button type="button" className="add-button" onClick={addProduct}>
          Add Journal
        </button>
      </div>
    </>
  );
};
export default AddJournal;

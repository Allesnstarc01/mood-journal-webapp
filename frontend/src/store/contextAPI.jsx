import { createContext, useEffect, useState } from "react";
export const PostContext = createContext({
  productsList: [],
  getProducts: () => {},
  setProductsList: () => {},
  fetchingPost: false,
});

const PostContextAPI = (props) => {
  const [fetchingPost, setfetchingPost] = useState(false);
  const [productsList, setProductsList] = useState([]);
  // console.log(productsList);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setfetchingPost(true);
    let journal = await fetch("http://localhost:5000/journal", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    journal = await journal.json();
    setfetchingPost(false);
    setProductsList(journal);
  };
  return (
    <PostContext.Provider
      value={{ productsList, getProducts, setProductsList, fetchingPost }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostContextAPI;

import style from "../assets/productlist.module.css";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { PostContext } from "../store/contextAPI";
import LoadingBar from "./loadingbar";

const MyJournal = () => {
  const { productsList, getProducts, fetchingPost } = useContext(PostContext);
  // console.log(productsList);
  const userId = JSON.parse(localStorage.getItem("users"))._id;
  const deteProduct = async (id, title) => {
    let result = await fetch(`http://localhost:5000/delete/${id}`, {
      method: "delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });

    result = await result.json();
    if (result) {
      alert("deleted :  " + title);
      getProducts();
    }
  };

  return (
    <>
      <div className={style.productListContainer}>
        {fetchingPost ? (
          <LoadingBar />
        ) : productsList.length > 0 ? (
          productsList.map((items) => (
            <>
              {userId === items.userId ? (
                <div className={style.productContainer} key={items._id}>
                  <div className={style.productImg}>{items.quotes}</div>
                  <div className={style.specContainer}>
                    <div className={style.categoryBrand}>
                      <p className={style.Bcategory}>
                        {items.title} ({items.value})
                      </p>
                      <div className={style.functionBtn}>
                        <Link to={`/update/${items._id}`}>
                          <FaRegEdit className={style.updateBtn} />
                        </Link>
                        <MdDeleteOutline
                          className={style.deleteBtn}
                          onClick={() => deteProduct(items._id, items.title)}
                        />
                      </div>
                    </div>
                    <div className={style.priceTitleContainer}>
                      <p className={style.priceTitle}>{items.content}</p>
                      <p className={style.priceTitle}>
                        Created on : {items.createdDate}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </>
          ))
        ) : fetchingPost ? (
          <LoadingBar />
        ) : (
          <h1>Result not found</h1>
        )}
      </div>
    </>
  );
};

export default MyJournal;

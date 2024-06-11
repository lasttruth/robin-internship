import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Timer from "../UI/Timer";
import Skeleton from "../UI/Skeleton";
import axios from "axios";

const ExploreItems = ({ exploreItems }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [newItems, setNewItems] = useState([]);
  const [visibleItems, setVisibleIems] = useState(8);

  async function fetchNewItems() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    );
    setNewItems(data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchNewItems();
  }, []);

  const loadMore = () => {
    setVisibleIems(visibleItems + 4);
  };

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {isLoading
        ? Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Skeleton width="50px" height="50px" borderRadius="50%" />
                  <i className="fa fa-check"></i>
                </div>
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <Skeleton
                        width="100px"
                        height="30px"
                        borderRadius="5px"
                      />
                    </div>
                  </div>
                  <Skeleton width="100%" height="300px" borderRadius="10px" />
                </div>
                <div className="nft__item_info">
                  <Skeleton width="150px" height="20px" borderRadius="5px" />
                  <div className="nft__item_price">
                    <Skeleton width="80px" height="20px" borderRadius="5px" />
                  </div>
                  <div className="nft__item_like">
                    <Skeleton width="20px" height="20px" borderRadius="50%" />
                    <span>
                      <Skeleton width="30px" height="20px" borderRadius="5px" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        : exploreItems.slice(0, visibleItems).map((item, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to="/author"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {item.expiryDate ? (
                  <div className="de_countdown">
                    <Timer item={item} />
                  </div>
                ) : (
                  <></>
                )}

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to="/item-details">
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{item.title}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price}</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      <div className="col-md-12 text-center">
        {exploreItems.length > visibleItems && (
          <button onClick={loadMore} className="btn-main lead">
            Load more
          </button>
        )}
      </div>
    </>
  );
};

export default ExploreItems;

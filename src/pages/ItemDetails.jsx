import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { nftId } = useParams();
  const [nftInfo, setNftInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchNft() {
    try {
      const nftRoute = nftId ? `?nftId=${nftId}` : "";
      const { data } = await axios.get(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails${nftRoute}`
      );
      console.log(data);
      setNftInfo(data);
      setIsLoading(false);
    } catch (error) {
      console.error("error find this nft item: ", error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNft();
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="row">
          <div className="col-md-6 text-center">
            <Skeleton width={500} height={550} borderRadius={0} />
          </div>
          <div className="col-md-6">
            <div className="item_info">
              <h2>
                <Skeleton width={300} height={50} borderRadius={0} />
              </h2>

              <div className="item_info_counts">
                <Skeleton width={50} height={30} borderRadius={0} />
                <Skeleton width={50} height={30} borderRadius={0} />
              </div>
              <p>
                <Skeleton width={400} height={100} borderRadius={0} />
              </p>
              <div className="d-flex flex-row">
                <div className="mr40">
                  <Skeleton width={60} height={20} borderRadius={0} />
                  <div className="item_author">
                    <div className="author_list_pp">
                      <Skeleton width={50} height={50} borderRadius={100} />
                    </div>
                    <div className="author_list_info">
                      <Skeleton width={60} height={20} borderRadius={0} />
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
              <div className="de_tab tab_simple">
                <div className="de_tab_content">
                  <Skeleton width={60} height={20} borderRadius={0} />
                  <div className="item_author">
                    <div className="author_list_pp">
                      <Skeleton width={50} height={50} borderRadius={100} />
                    </div>
                    <div className="author_list_info">
                      <Skeleton width={60} height={20} borderRadius={0} />
                    </div>
                  </div>
                </div>
                <div className="spacer-40"></div>
                <Skeleton width={40} height={15} borderRadius={0} />
                <div className="nft-item-price">
                  <Skeleton width={100} height={35} borderRadius={0} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div id="wrapper">
          <div className="no-bottom no-top" id="content">
            <div id="top"></div>
            <section aria-label="section" className="mt90 sm-mt-0">
              <div className="container">
                <div className="row">
                  <div className="col-md-6 text-center">
                    <img
                      src={nftInfo.nftImage}
                      className="img-fluid img-rounded mb-sm-30 nft-image"
                      alt=""
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <h2>{nftInfo.title}</h2>

                      <div className="item_info_counts">
                        <div className="item_info_views">
                          <i className="fa fa-eye"></i>
                          {nftInfo.views}
                        </div>
                        <div className="item_info_like">
                          <i className="fa fa-heart"></i>
                          {nftInfo.likes}
                        </div>
                      </div>
                      <p>{nftInfo.description}</p>
                      <div className="d-flex flex-row">
                        <div className="mr40">
                          <h6>Owner</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${nftInfo.ownerId}`}>
                                <img
                                  className="lazy"
                                  src={nftInfo.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${nftId.ownerId}`}>
                                {nftInfo.ownerName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                      <div className="de_tab tab_simple">
                        <div className="de_tab_content">
                          <h6>Creator</h6>
                          <div className="item_author">
                            <div className="author_list_pp">
                              <Link to={`/author/${nftInfo.creatorId}`}>
                                <img
                                  className="lazy"
                                  src={nftInfo.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </Link>
                            </div>
                            <div className="author_list_info">
                              <Link to={`/author/${nftInfo.creatorId}`}>
                                {nftInfo.creatorName}
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="spacer-40"></div>
                        <h6>Price</h6>
                        <div className="nft-item-price">
                          <img src={EthImage} alt="" />
                          <span>{nftInfo.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default ItemDetails;

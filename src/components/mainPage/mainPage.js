import { useState } from "react";
import "../mainPage/mainPage.scss";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getPostList, likeStatus } from "../../api/statusApi";
import CommentModal from "../commentModal/commentModal";

const MainPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [postList, setPostList] = useState([]);
  const [showComment, setShowComment] = useState(false);
  const [postData, setPostData] = useState({});

  const listContent = async () => {
    const data = await getPostList();
    setPostList(data.DT);
  };

  const handleLike = async (userId) => {
    const data = await likeStatus(userId);
    await listContent();
    setPostData({ ...postData, React: data.DT });
  };

  const handleComment = (data) => {
    setShowComment(true);
    setPostData(data);
  };
  const handleCloseModal = () => {
    setShowComment(false);
  };

  useState(() => {
    listContent();
  }, []);
  return (
    <>
      <div className="body_mainpage">
        <div className="body_intro">
          <div className="main_wallpaper"></div>
          <div className="main_introduction">
            <h1>Check this out</h1>
          </div>
        </div>
        <div className="main_content">
          <div className="container">
            {postList && postList.length ? (
              postList.map((items, index) => {
                return (
                  <>
                    <div key={index} className="row px-3 px-sm-0">
                      <div className="col-sm-3"></div>
                      <div id="post" className="col-sm-6 mb-5 px-0">
                        <div className="user_profile">
                          <img
                            className="user_avatar"
                            src={items.User.avatar}
                            alt="avatar"
                          ></img>
                          <div>
                            <p className="my-0">{items.User.username}</p>
                            <small>public</small>
                          </div>
                        </div>
                        <p id="content">{items.content}</p>
                        <div id="post_image_container">
                          {items.image && items.image.length > 0 ? (
                            items.image.map((img, index) => {
                              return (
                                <div key={index} id="image_tag">
                                  <img
                                    id="post_image"
                                    src={img}
                                    alt="img"
                                  ></img>
                                </div>
                              );
                            })
                          ) : (
                            <></>
                          )}
                        </div>
                        <hr className="my-1"></hr>
                        {items.React.quantity !== 0 ? (
                          <>
                            <div className="ms-2">
                              <i className="fa-solid fa-thumbs-up me-2"></i>
                              <span>{items.React.quantity}</span>
                            </div>
                            <hr className="my-1"></hr>
                          </>
                        ) : (
                          <></>
                        )}
                        <div className="post_footer">
                          <div className="post_footer_ele">
                            <button
                              onClick={() => {
                                handleLike({
                                  userid: currentUser.id,
                                  postId: items.id,
                                });
                              }}
                              className="react_btn"
                            >
                              {items.React.userid.includes(currentUser.id) ? (
                                <>
                                  <i
                                    className="fa-solid fa-thumbs-up me-3"
                                    style={{ color: "#0055ff" }}
                                  ></i>
                                  <span style={{ color: "#0055ff" }}>Like</span>
                                </>
                              ) : (
                                <>
                                  <i
                                    className="fa-regular fa-thumbs-up me-3"
                                    style={{ color: "#000" }}
                                  ></i>
                                  <span>Like</span>
                                </>
                              )}
                            </button>
                          </div>
                          <div className="post_footer_ele">
                            <button
                              onClick={() => handleComment(items)}
                              className="react_btn"
                            >
                              <i className="fa-solid fa-comment me-3"></i>
                              <span>Comment</span>
                            </button>
                          </div>
                        </div>
                        <hr className="my-1"></hr>
                      </div>
                      <div className="col-sm-3"></div>
                    </div>
                  </>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <CommentModal
        show={showComment}
        hide={handleCloseModal}
        postCurrentData={postData}
        handleLike={handleLike}
      ></CommentModal>
    </>
  );
};
export default MainPage;
{
  /* <CommentModal
  show={showComment}
  hide={handleCloseModal}
  user={items.User.username}
></CommentModal>; */
}

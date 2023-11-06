import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import _ from "lodash";
import "./commentModal.scss";
import { useSelector } from "react-redux";
import { commentStatus } from "../../api/statusApi";

const CommentModal = (props) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);

  const handleChange = (e) => {
    setComment(e.target.value);
  };
  const handleSubmit = async (e) => {
    if (e.keyCode === 13) {
      const data = {
        postid: props.postCurrentData.id,
        userid: currentUser.id,
        content_comment: comment,
      };
      const res = await commentStatus(data);
      setCommentList(res.DT);
      setComment("");
    }
  };

  useEffect(() => {
    const textArea = document.getElementById("input_comment");
    if (textArea !== null) {
      textArea.addEventListener("input", (e) => {
        textArea.style.height = "60px";
        textArea.style.height = textArea.scrollHeight + "px";
      });
    }
  }, []);
  useEffect(() => {
    setCommentList(props.postCurrentData.Comments);
  }, [props.postCurrentData.Comments]);
  return (
    <>
      {!_.isEmpty(props.postCurrentData) &&
      !_.isEmpty(props.postCurrentData.User) ? (
        <Modal show={props.show} onHide={props.hide} top="true" size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              Status of {props.postCurrentData.User.username}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <>
              <div id="content_prime">
                <div className="user_profile">
                  <img
                    className="user_avatar"
                    src={props.postCurrentData.User.avatar}
                    alt="avatar"
                  ></img>
                  <div>
                    <p className="my-0">
                      {props.postCurrentData.User.username}
                    </p>
                    <small>public</small>
                  </div>
                </div>
                <p id="content">{props.postCurrentData.content}</p>
                {props.postCurrentData.image &&
                props.postCurrentData.image.length > 0 ? (
                  <div className="img_container">
                    {props.postCurrentData.image.map((img, index) => {
                      return (
                        <div key={index} id="image_tag">
                          <img id="post_image" src={img} alt="img"></img>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <></>
                )}
                <hr className="my-1"></hr>
                {props.postCurrentData.React.quantity !== 0 ? (
                  <>
                    <div className="ms-2">
                      <i className="fa-solid fa-thumbs-up me-2"></i>
                      <span>{props.postCurrentData.React.quantity}</span>
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
                        props.handleLike({
                          userid: currentUser.id,
                          postId: props.postCurrentData.id,
                        });
                      }}
                      className="react_btn"
                    >
                      {props.postCurrentData.React.userid.includes(
                        currentUser.id
                      ) ? (
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
                    <button className="react_btn">
                      <i className="fa-solid fa-comment me-3"></i>
                      <span>Comment</span>
                    </button>
                  </div>
                </div>
                <div className="comments_user">
                  {!_.isEmpty(commentList) ? (
                    <>
                      <hr></hr>
                      {commentList && commentList.length > 0 ? (
                        commentList.map((items, index) => {
                          return (
                            <div className="comment_container_child">
                              <div className="comment_container_child_avatar">
                                <img src={items.User.avatar}></img>
                              </div>
                              <div className="comment_container_child_content">
                                <span>{items.User.username}</span>
                                <span>{items.content}</span>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </>
          </Modal.Body>
          <hr></hr>
          <div className="comment_footer">
            <div className="comment_avatar">
              <img
                className="comment_avatar_img"
                src={currentUser.avatar}
              ></img>
            </div>
            <textarea
              onKeyDown={(e) => handleSubmit(e)}
              value={comment}
              onChange={(e) => handleChange(e)}
              placeholder="Write your think"
              id="input_comment"
            ></textarea>
          </div>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
};
export default CommentModal;

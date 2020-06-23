import React, { Component } from "react";
import Constant from '../../utils/Constants';

class User extends Component {
    render() {
        return (
            <div className="header container p-2 my-1 d-flex align-items-center justify-content-between">
                <a className="d-flex align-items-center text-decoration-none text-dark ml-1 insta-bold" href={`/${this.props.username}`} aria-haspopup="true" aria-expanded="false"
                    style={{ fontSize: ".9rem" }}>
                    <img src={`${Constant.host}${this.props.userAvatar}`}
                        className="img-fluid rounded-circle mr-2 ml-1"
                        style={{ objectFit: "cover", width: "35px", height: "35px" }}
                        alt="" />
                    <span className="ml-1">{this.props.username}</span>
                </a>
                <OptionDropdown isHorizontal={this.props.isHorizontal} canEdit={this.props.canEdit} handleViewFullPost={this.props.handleViewFullPost}
                    handleDelete={this.props.handleDelete} handleEdit={this.props.handleEdit} />
            </div>
        );
    }
}

class PhotoList extends Component {
    render() {
        const carouselId = `pcrs_${this.props.postId}`;
        if (this.props.photos.length > 1)
            return (
                <div id={carouselId} className={`carousel slide p-0 ${this.props.isHorizontal ? "col-sm-7" : ""}`} data-ride="carousel" data-interval="0" onDoubleClick={this.props.onLike}>
                    <ol className="carousel-indicators">
                        {this.props.photos.map((photo, index) => {
                            if (index === 0) {
                                return <li data-target={`#${carouselId}`} data-slide-to="0" className="active" key={index}></li>;
                            } else {
                                return <li data-target={`#${carouselId}`} data-slide-to={index} key={index}></li>
                            }
                        })}
                    </ol>
                    <div className="carousel-inner" role="listbox">
                        {this.props.photos.map((photo, index) => {
                            if (index === 0) {
                                return <div className="carousel-item active" key="0">
                                    <img className="d-block w-100" src={`${Constant.host}${photo.link}`} alt="First slide" />
                                </div>;
                            } else {
                                return <div className="carousel-item" key={index}>
                                    <img className="d-block w-100" src={`${Constant.host}${photo.link}`} alt="First slide" />
                                </div>;
                            }
                        })}
                    </div>
                    <a className="carousel-control-prev" href={`#${carouselId}`} role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon m-0" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href={`#${carouselId}`} role="button" data-slide="next">
                        <span className="carousel-control-next-icon m-0" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>

            );
        else {
            return (<div onDoubleClick={this.props.onLike} className={`${this.props.isHorizontal ? "col-sm-7" : ""} p-0`}>
                {this.props.photos.map((photo, index) => <img src={`${Constant.host}${photo.link}`} className="card-img-top" alt="redundant-alt" key={index} />)}
            </div>)
        }
    }
}

class Reaction extends Component {
    render() {
        return (
            <>
                <div className="mb-1" style={{ fontSize: "1.5rem" }}>
                    <button type="button" className="btn btn-lg btn-primary bg-transparent text-dark border-0 p-0 mr-2" onClick={this.props.onLikeClicked}>
                        <i className={this.props.liked ? "fas fa-heart fa-lg text-danger" : "far fa-heart fa-lg"}></i>
                    </button>
                    <button type="button" className="btn btn-lg btn-primary bg-transparent text-dark border-0 p-0" onClick={this.props.onCommentClicked}>
                        <i className="far fa-comment fa-lg" aria-hidden="true"></i>
                    </button>
                </div>
                <div>
                    <span>{`${this.props.likeCount} ${this.props.likeCount > 1 ? "likes" : "like"}, ${this.props.commentCount} ${this.props.commentCount > 1 ? "comments" : "comment"}`}</span>
                </div>
            </>
        )
    }
}

class Comment extends Component {
    constructor(props) {
        super(props);
        this.optionButton = undefined;
        this.inputField = undefined;
        this.submitBtn = undefined;
        this.visible = true;
        this.state = {
            ...props, 
            isEditing: this.props.isEditing !== undefined ? this.props.isEditing : false,
            value: this.props.content
        };
    }

    onHover = () => {
        if (this.optionButton) {
            this.optionButton.classList.remove("d-none");
        }
    }

    onHoverExit = () => {
        if (this.optionButton) {
            this.optionButton.classList.add("d-none");
            if (this.optionButton.classList.contains("show")) {
                this.optionButton.classList.remove("show");
                this.optionButton.querySelector(".dropdown-menu").classList.remove("show");
            }
        }
    }

    onInputFocusLost = () => {
        if (this.submitBtn !== document.activeElement) {
            return;
        }
        this.props.handleEditExit();
    }

    componentDidUpdate() {
        if (this.inputField) {
            this.inputField.focus();
        }
    }

    handleChange = () => {
        this.setState({ value: this.inputField.value });
    }

    render() {
        return (
            <div className="d-flex justify-content-between align-items-center mt-1" onMouseOver={this.onHover} onMouseLeave={this.onHoverExit}>
                <div className="d-flex align-items-center mt-1 w-100">
                    <a className="insta-bold text-decoration-none text-dark" href={`/${this.props.username}`}>{this.props.username}</a>
                    {this.props.isEditing ?
                        <div className="d-flex w-100">
                            <input ref={input => this.inputField = input} type="text"
                                class="form-control d-inline ml-1 px-2" value={this.props.handleChange ? this.props.content : this.state.value}
                                onChange={this.props.handleChange ? this.props.handleChange : this.handleChange}
                                onBlur={this.onInputFocusLost}
                            />
                            <button ref={btn => this.submitBtn = btn} className="btn btn-md btn-success" 
                                disabled={this.props.canCommitEdit === false} onClick={this.props.handleCommitEdit}>
                                <i class="fas fa-check fa-sm"></i>
                            </button>
                        </div>
                        : <span className="card-text ml-1">{this.props.content}</span>
                    }
                </div>
                {this.visible && this.props.canEdit && this.props.isEditing === false ?
                    <div className="d-none" ref={div => this.optionButton = div} >
                        <button className="nav-link p-0 fas fa-ellipsis-h fa-md text-dark bg-transparent border-0"
                            id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        </button>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                            <button className="dropdown-item row m-0 pl-2" onClick={this.props.handleEdit}>
                                <i className="fas fa-edit fa-sm col-sm-4"></i>
                            Edit
                        </button>
                            <button className="dropdown-item row m-0 pl-2" onClick={this.props.handleDelete}>
                                <i className="fas fa-times fa-sm col-sm-4"></i>
                            Delete
                    </button>
                        </div>
                    </div>
                    : ""
                }
            </div>
        )
    }
}

class Caption extends Comment {
    constructor(props) {
        super(props);
        this.visible = false;
    }
}

class CommentInput extends Component {
    constructor(props) {
        super(props);
        this.inputField = undefined;
    }
    focus = () => {
        this.inputField.focus();
    }
    onKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.props.onSubmitComment();
        }
    }
    render() {
        return (
            <div className="card-footer text-muted px-0 py-0 d-flex">
                <input ref={inputField => this.inputField = inputField}
                    onChange={this.props.onChange} type="text"
                    className="form-control border border-white" placeholder="Add a comment..."
                    value={this.props.value}
                    onKeyDown={this.onKeyDown} />
                <button className="btn btn-white text-primary" onClick={this.props.onSubmitComment}>Post</button>
            </div>
        );
    }
}

class OptionDropdown extends Component {
    render() {
        return (
            <div>
                <button className="nav-link fas fa-ellipsis-h fa-md mr-n2 text-dark bg-transparent border-0" href="#" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                </button>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                    {this.props.isHorizontal ? "" :
                        <button className="dropdown-item row m-0 pl-2" onClick={this.props.handleViewFullPost}>
                            <i className="fas fa-external-link-alt fa-sm col-sm-4"></i>
                                View full post
                        </button>
                    }
                    {this.props.canEdit ?
                        <>
                            <button className="dropdown-item row m-0 pl-2" onClick={this.props.handleEdit}>
                                <i className="fas fa-edit fa-sm col-sm-4"></i>
                                    Edit
                            </button>
                            <button className="dropdown-item row m-0 pl-2" onClick={this.props.handleDelete}>
                                <i className="fas fa-times fa-sm col-sm-4"></i>
                                    Delete
                            </button>
                        </>
                        : ""
                    }
                </div>
            </div>
        )
    }
}

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            liked: this.props.likedBy.some(like => like.username === this.props.sessionUser),
            pendingComment: "",
            isEditing: false,
            pendingCaption: this.props.caption,
            editingComment: -1
        };
        this.commentInput = undefined;
        this.captionInput = undefined;
        this.editingComment = undefined;
    }

    commitLike = (postId, token, willLike) => {
        console.log(`${this.props.id} is${this.state.liked ? "" : " not"} liked!`)
        fetch(`${Constant.host}/posts/${postId}/likes?key=${token}`,
            {
                method: willLike ? "POST" : "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(this.props.updatePosts);
    };

    createComment = (postId, token, comment) => {
        fetch(`${Constant.host}/posts/${postId}/comments?key=${token}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    postId: postId,
                    content: comment
                })
            }).then(this.props.updatePosts);
    };

    editCaption = (postId, token, caption) => {
        fetch(`${Constant.host}/posts/${postId}?key=${token}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: postId,
                    caption: caption
                })
            }).then(() => {
                this.setState({ pendingCaption: caption, isEditing: false });
                this.props.updatePosts();
            });
    }

    editComment = (commentId, token, comment) => {
        fetch(`${Constant.host}/comments/${commentId}?key=${token}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: commentId,
                    content: comment
                })
            }).then(() => {
                this.setState({ editingComment: -1 });
                this.props.updatePosts();
            });
    }

    deletePost = (postId, token) => {
        const okToDelete = window.confirm("Are you sure want to delete?");
        if (!okToDelete) {
            return;
        }
        fetch(`${Constant.host}/posts/${postId}?key=${token}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(this.props.updatePosts);
    }

    deleteComment = (commentId, token) => {
        const okToDelete = window.confirm("Are you sure want to delete?");
        if (!okToDelete) {
            return;
        }
        fetch(`${Constant.host}/comments/${commentId}?key=${token}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(this.props.updatePosts);
    }

    viewFullPost = (id) => {
        window.location.href = `/posts/${id}`;
    }

    commitLikeCallback = () => this.commitLike(this.props.id, this.props.token, this.state.liked);
    createCommentCallback = () => {
        this.createComment(this.props.id, this.props.token, this.state.pendingComment.trim());
        this.setState({ pendingComment: "" });
    }
    editCaptionCallback = () => {
        this.editCaption(this.props.id, this.props.token, this.state.pendingCaption.trim());
    }
    deletePostCallback = () => {
        this.deletePost(this.props.id, this.props.token);
    }
    viewFullPostCallback = () => this.viewFullPost(this.props.id);

    render() {
        if (this.props.isHorizontal) {
            return (
                <div className="card container p-0 my-3 d-flex flex-row">
                    <PhotoList photos={this.props.photos} postId={this.props.id} isHorizontal={this.props.isHorizontal}
                        onLike={() => { this.setState({ liked: true }, this.commitLikeCallback) }} />
                    <div className="col-sm-5">
                        <User 
                            username={this.props.username} userAvatar={this.props.userAvatar} canEdit={this.props.canEdit} 
                            handleEdit={() => this.setState({ isEditing: !this.state.isEditing })}
                            isHorizontal={this.props.isHorizontal} />
                        <div className="card-body px-3 py-2">
                            <Reaction likeCount={this.props.likeCount}
                                commentCount={this.props.commentCount}
                                liked={this.state.liked}
                                onLikeClicked={() => { this.setState({ liked: !this.state.liked }, this.commitLikeCallback) }}
                                onCommentClicked={() => { this.commentInput.focus() }} />
                            <Caption ref={input => this.captionInput = input}
                                isEditing={this.state.isEditing} 
                                username={this.props.username}
                                handleChange={() => this.setState({ pendingCaption: this.captionInput.inputField.value })}
                                canCommitEdit={this.props.caption !== this.state.pendingCaption}
                                handleCommitEdit={this.editCaptionCallback}
                                handleEditExit={() => this.setState({ isEditing: false, pendingCaption: this.props.caption })}
                                content={this.state.pendingCaption} />
                            {this.props.comments.map(comment => 
                                <Comment {...comment} key={comment.id} 
                                    ref={ this.state.editingComment === comment.id ? cmt => this.editingComment = cmt : undefined}
                                    canEdit={comment.username === this.props.sessionUser}
                                    handleEdit={() => this.setState({ editingComment: comment.id })}
                                    isEditing={this.state.editingComment === comment.id}
                                    handleCommitEdit={() => this.editComment(comment.id, this.props.token, this.editingComment.state.value)}
                                    handleDelete={() => this.deleteComment(comment.id, this.props.token)} />)}
                        </div>
                        <CommentInput ref={input => this.commentInput = input}
                            onChange={() => this.setState({ pendingComment: this.commentInput.inputField.value })}
                            value={this.state.pendingComment}
                            onSubmitComment={this.createCommentCallback} />
                    </div>
                </div>
            );
        }
        return (
            <div className="card container w-50 p-0 my-3">
                <User 
                    username={this.props.username} userAvatar={this.props.userAvatar} canEdit={this.props.canEdit} 
                    handleEdit={() => this.setState({ isEditing: !this.state.isEditing })}
                    handleDelete={this.deletePostCallback}
                    handleViewFullPost={this.viewFullPostCallback} />
                <PhotoList photos={this.props.photos} postId={this.props.id}
                    onLike={() => { this.setState({ liked: true }, this.commitLikeCallback) }} />
                <div className="card-body px-3 py-2">
                    <Reaction likeCount={this.props.likeCount}
                        commentCount={this.props.commentCount}
                        liked={this.state.liked}
                        onLikeClicked={() => { this.setState({ liked: !this.state.liked }, this.commitLikeCallback) }}
                        onCommentClicked={() => { this.commentInput.focus() }} />
                    <Caption ref={input => this.captionInput = input}
                        isEditing={this.state.isEditing} 
                        username={this.props.username}
                        handleChange={() => this.setState({ pendingCaption: this.captionInput.inputField.value })}
                        canCommitEdit={this.props.caption !== this.state.pendingCaption}
                        handleCommitEdit={this.editCaptionCallback}
                        handleEditExit={() => this.setState({ isEditing: false, pendingCaption: this.props.caption })}
                        content={this.state.pendingCaption} />
                    {this.props.comments.map(comment => 
                        <Comment {...comment} key={comment.id} 
                            ref={ this.state.editingComment === comment.id ? cmt => this.editingComment = cmt : undefined}
                            canEdit={comment.username === this.props.sessionUser}
                            handleEdit={() => this.setState({ editingComment: comment.id })}
                            isEditing={this.state.editingComment === comment.id}
                            handleCommitEdit={() => this.editComment(comment.id, this.props.token, this.editingComment.state.value)}
                            handleDelete={() => this.deleteComment(comment.id, this.props.token)} />)}
                </div>
                <CommentInput ref={input => this.commentInput = input}
                    onChange={() => this.setState({ pendingComment: this.commentInput.inputField.value })}
                    value={this.state.pendingComment}
                    onSubmitComment={this.createCommentCallback} />
            </div>
        );
    }
}

export default Post;
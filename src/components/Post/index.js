import React, { Component } from "react";

class User extends Component {
    render() {
        return (
            <div className="header container p-2 my-1 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <img src="./images/test.jpg" className="img-fluid rounded-circle mr-2 ml-1" style={{ objectFit: "cover", width: "35px", height: "35px" }} alt="" />
                    <a className="text-decoration-none text-dark ml-1 insta-bold" href="#" aria-haspopup="true" aria-expanded="false"
                        style={{ fontSize: ".9rem" }}>
                        {this.props.username} </a>
                </div>
                <div>
                    <i class="fas fa-ellipsis-h fa-md mr-1" ></i>
                </div>
            </div>
        );
    }
}

class Photo extends Component {
    render() {
        return (
            <div>
                <img src={this.props.photos} className="card-img-top" />
            </div>
        );
    }
}

class Reaction extends Component {
    render() {
        return (
            <div className="card-body px-3 py-2">
                <div style={{ fontSize: "1.5rem" }}>
                    <i class="far fa-heart fa-md mr-2"></i>
                    <i class="far fa-comment fa-md ml-2" aria-hidden="true"></i>
                </div>

                <div><span>{`${this.props.likeCount} likes, ${this.props.commentCount} comments`}</span>
                </div>
                <div>
                    <a className="insta-bold text-decoration-none text-dark" href="#">{this.props.username}</a>
                    <span className="card-text ml-1">{this.props.caption}</span>
                </div>
            </div>
        )
    }
}

class CommentInput extends Component {
    render() {
        return (
            <div class="card-footer text-muted px-0 py-0 d-flex">
                <input type="text" class="form-control border border-white" name="" id="" placeholder="Add a comment..." />
                <a name="" id="" class="btn btn-white text-primary" href="#" role="button">Post</a>
            </div>

        );
    }
}

class Post extends Component {
    render() {
        console.log(this.props);
        return (
            <div className="card container w-50 p-0">
                <section>
                    <User username={this.props.post.username} />
                    <Photo photos={this.props.photo.photos} />
                    <Reaction username={this.props.post.username}
                              likeCount={this.props.post.likeCount}
                              commentCount={this.props.post.commentCount}
                              caption={this.props.post.caption} />
                    <CommentInput />

                </section>

            </div>
        );
    }
}

export default Post;
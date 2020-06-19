import React, { Component } from 'react';

class User extends Component {
    render() {
        return (
            <div>
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
            </div>
        );
    }
}

class Photo extends Component {
    render() {
        return (
            <div className="col-md-7 p-0">
                <img src={this.props.photos} className="card-img-top" />
            </div>
        );
    }
}

class Reaction extends Component {
    render() {
        return (
            <div className="card-body px-3 py-2">
                <div>
                    <a className="insta-bold text-decoration-none text-dark" href="#">{this.props.username}</a>
                    <span className="card-text ml-1">{this.props.caption}</span>
                </div>
                <div style={{ fontSize: "1.5rem" }}>
                    <i class="far fa-heart fa-md mr-2"></i>
                    <i class="far fa-comment fa-md ml-2" aria-hidden="true"></i>
                </div>
                <div><span>{`${this.props.likeCount} likes ${this.props.commentCount} comments`}</span>
                </div>

            </div>
        );
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

class OnePost extends Component {
    render() {
        return (
            <div className="card container-fluid w-50 p-0">
                <div className="d-flex">
                    <Photo photos={this.props.photo.photos} />
                    <div className="col-md-5">
                        <User username={this.props.post.username} />
                        <Reaction username={this.props.post.username}
                            caption={this.props.post.caption}
                            likeCount={this.props.post.likeCount}
                            commentCount={this.props.post.commentCount}
                        />
                        <CommentInput />
                    </div>
                </div>
            </div>
        );
    }
}

export default OnePost;

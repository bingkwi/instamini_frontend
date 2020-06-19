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
                    <i className="fas fa-ellipsis-h fa-md mr-1" ></i>
                </div>
            </div>
        );
    }
}

class PhotoList extends Component {
    render() {
        if (this.props.photos.length > 1)
            return (
                <div id="carouselId" className="carousel slide" data-ride="carousel" data-interval="0">
                    <ol className="carousel-indicators">
                        {this.props.photos.map((photo, index) => {
                            if (index === 0) {
                                return <li data-target="#carouselId" data-slide-to="0" className="active"></li>;
                            } else {
                                return <li data-target="#carouselId" data-slide-to={index}></li>
                            }
                        })}
                    </ol>
                    <div className="carousel-inner" role="listbox">
                        {this.props.photos.map((photo, index) => {
                            if (index === 0) {
                                return <div className="carousel-item active">
                                    <img className="d-block w-100" src={photo.link} alt="First slide" />
                                </div>;
                            } else {
                                return <div className="carousel-item">
                                    <img className="d-block w-100" src={photo.link} alt="First slide" />
                                </div>;
                            }
                        })}
                        {/* <div className="carousel-item">
                            <img data-src="holder.js/900x500/auto/#666:#444/text:Second slide" alt="Second slide"/>
                        </div>
                        <div className="carousel-item">
                            <img data-src="holder.js/900x500/auto/#666:#444/text:Third slide" alt="Third slide"/>
                        </div> */}
                    </div>
                    <a className="carousel-control-prev" href="#carouselId" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselId" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>

            );
        else {
            return (<div>
                {this.props.photos.map(photo => <img src={photo.link} className="card-img-top" />)}
            </div>)
        }
    }
}

class Reaction extends Component {
    render() {
        return (
            <div className="card-body px-3 py-2">
                <div style={{ fontSize: "1.5rem" }}>
                    <i className="far fa-heart fa-md mr-2"></i>
                    <i className="far fa-comment fa-md ml-2" aria-hidden="true"></i>
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
            <div className="card-footer text-muted px-0 py-0 d-flex">
                <input type="text" className="form-control border border-white" name="" id="" placeholder="Add a comment..." />
                <a name="" id="" className="btn btn-white text-primary" href="#" role="button">Post</a>
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
                    <PhotoList photos={this.props.photos} />
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
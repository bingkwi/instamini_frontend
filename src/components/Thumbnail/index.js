import React, { Component } from 'react';
import Post from '../../components/Post';

class Thumbnail extends Component {

    constructor(props) {
        super(props)
    }
    
    // mouseHoverHandler = {
    //     setState show = ` <div>
    //     <span>{`${this.props.likeCount} ${this.props.likeCount > 1 ? "likes" : "like"}, ${this.props.commentCount} ${this.props.commentCount > 1 ? "comments" : "comment"}`}</span>
    // </div>`;
    // }
    
    render() {
        return (
            <div className="container">
                <div className="row d-flex p-5 m-3">
                    <div className="col-md-4 col-sm-6" >
                        <div className="card">
                            onMouseOver={this.mouseHoverHandler}
                            <img src="./images/test.jpg" className="" style={{ objectFit: "cover", width: "300px", height: "300px" }} alt="" />
                            <div className="reaction" style={{ fontSize: "1.5rem" }}>
                                <i class="far fa-heart fa-md mr-3"></i>
                                <i class="far fa-comment fa-md ml-3" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 mb-4">
                        <div className="card">
                            <img src="./images/test.jpg" className="" style={{ objectFit: "cover", width: "300px", height: "300px" }} alt="" />
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6">
                        <div className="card">
                            <img src="./images/test.jpg" className="" style={{ objectFit: "cover", width: "300px", height: "300px" }} alt="" />
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6">
                        <div className="card">
                            <img src="./images/test.jpg" className="" style={{ objectFit: "cover", width: "300px", height: "300px" }} alt="" />
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6">
                        <div className="card">
                            <img src="./images/test.jpg" className="" style={{ objectFit: "cover", width: "300px", height: "300px" }} alt="" />
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6">
                        <div className="card">
                            <img src="./images/test.jpg" className="" style={{ objectFit: "cover", width: "300px", height: "300px" }} alt="" />
                        </div>
                    </div>

                </div>
                {/* <div style={{ fontSize: "1.5rem" }}>
                    <i className="far fa-heart fa-md mr-2"></i>
                    <i className="far fa-comment fa-md ml-2" aria-hidden="true"></i>
                </div> */}
            </div>

        );
    }
}

export default Thumbnail;

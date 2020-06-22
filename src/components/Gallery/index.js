import React, { Component } from 'react';
import Post from '../Post';

class Thumbnail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hovered: false
        }

        this.handleMouseOver = () => this.setState({ hovered: true });
        this.handleMouseLeave = () => this.setState({ hovered: false });
    }

    // handle mouseover


    render() {
        return (
            <div className="col-md-4 col-sm-6 pb-5" >
                <div className="card thumbnail" style={{ width: "300px", height: "300px", cursor: "pointer", background: `url(${this.props.link})`, backgroundSize: "cover", backgroundPosition: "center" }}
                    onMouseEnter={this.handleMouseOver}
                    onMouseLeave={this.handleMouseLeave} >
                    {/* <img src="./images/test.jpg" className="w-100 h-100" style={{ objectFit: "cover" }} alt="" /> */}
                    {this.state.hovered ?
                        <div className="reaction d-flex justify-content-center" style={{ fontSize: "1.5rem" }}>
                            <div>
                            <i class="fas fa-heart fa-sm"></i>
                            <span className="mx-3">{this.props.likeCount}</span>
                            </div>
                            <div>
                            <i class="fas fa-comment fa-sm" aria-hidden="true"></i>
                            <span className="mx-3">{this.props.commentCount}</span>
                            </div>
                        </div>
                        : ""
                    }
                </div>
            </div>

        );
    }
}

class Gallery extends Component {
    render() {
        return (
            <div className="container">
                <div className="row d-flex mt-5">
                    {this.props.posts.map(post => <Thumbnail {...post} />)}
                </div>
            </div>

        );
    }
}

export default Gallery;

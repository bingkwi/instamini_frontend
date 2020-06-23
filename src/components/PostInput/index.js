import React, { Component } from 'react';
import Constant from '../../utils/Constants';

class PostInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            caption: "",
            files: undefined
        };
    }

    handleSubmitCallback = () => this.props.handleSubmit(this.state.caption, this.state.files)

    render() {
        return (
            <div className="card container w-50 my-2 p-0">
                <div className="card-header p-2">
                    <span className="text-muted font-weight-bold">Create Post</span>
                </div>
                <div className="card-body d-flex py-3">
                    <img src="./images/test.jpg" className="img-fluid rounded-circle mr-2" style={{ objectFit: "cover", width: "35px", height: "35px" }} alt="" />
                    <textarea type="text" className="form-control border border-white card container" 
                        placeholder="What's on your mind?" style={{ resize: "none" }} value={this.state.caption}
                        onChange={e => this.setState({ caption: e.target.value })} />
                    <input type="file" multiple className="form-control-file" 
                        onChange={e => this.setState({ files: e.target.files })} />
                </div>

                <button type="button" className="btn btn-primary btn-md btn-block py-1" onClick={this.handleSubmitCallback}>Post</button>

            </div>
        );
    }
}

export default PostInput;

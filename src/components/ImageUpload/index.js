import "./index.css";
import React from 'react';
import Constant from "../../utils/Constants";

class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: undefined,
            imageResultUrl: '#'
        };
        this.imageResult = undefined;
        this.fileUpload = undefined;
        this.modal = undefined;
    }

    resetState = () => {
        this.setState({
            file: undefined,
            imageResultUrl: '#'
        });
    }

    readURL = (input) => {
        if (input.files && input.files[0]) {
            this.setState({ file: input.files[0] }, () => {
                let reader = new FileReader();
                reader.onload = e => {
                    this.setState({ imageResultUrl: e.target.result });
                };
                reader.readAsDataURL(input.files[0]);
            });
        }
    }

    changeAvatar = (username, token, file) => {
        if (!username || !token || !file) {
            return;
        }
        let formData = new FormData();
        formData.append("newAvatar", this.state.file);
        fetch(`${Constant.host}/users/${username}/avatar?key=${token}`, {
            method: "PATCH",
            body: formData
        }).then(res => {
            if (res.ok) {
                window.showMessageModal("success", "Success", "Avatar was successfully updated!", "avatarModal", this.props.refresh);
            } else {
                window.showMessageModal("danger", "Failed", "Avatar could not be updated, please retry!", "avatarModal", this.props.refresh);
            }
        })
    }

    changeAvatarCallback = () => this.changeAvatar(this.props.username, this.props.token, this.state.file)

    componentDidMount() {
        window.addCloseEventToModal(this.modal, this.resetState);
    }

    render() {
        return (
            <>
                <div ref={modal => this.modal = modal} className="modal fade" id="avatarModal" tabIndex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Change avatar</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span className="m-0" aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div>
                                    <div className="py-2">
                                        <div className="w-100">
                                            <div className="input-group d-flex justify-content-center mb-3 px-2 py-2 rounded bg-white shadow-sm">
                                                <input id="upload" ref={input => this.fileUpload = input} type="file" onChange={() => this.readURL(this.fileUpload)} className="form-control border-0 h-100 w-100" />
                                                <label id="upload-label" htmlFor="upload" className="font-weight-light text-muted">{this.state.imageResultUrl === "#" ? "Drag and drop to upload or click to browse..." : `File name: ${this.state.file.name}`}</label>
                                            </div>
                                            <div className="image-area p-0 mt-4">
                                                {this.state.imageResultUrl !== "#" ? <h5>Preview</h5> : ""}
                                                <img ref={img => this.imageResult = img} src={this.state.imageResultUrl} alt="" className="img-fluid rounded shadow-sm mx-auto d-block" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                {this.state.imageResultUrl === "#" ? "" :
                                <button type="button" className="btn btn-success" onClick={this.changeAvatarCallback}>Save</button>}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default ImageUpload;
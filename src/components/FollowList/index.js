import React from 'react';
import SearchResultItem from '../SearchResultItem';

class FollowList extends React.Component {
    render() {
        return (
            <div>
                {this.props.follows.map(f => 
                    <SearchResultItem {...f} fullWidth isSelf={this.props.sessionUser === f.username}
                        followed={this.props.currentFollowings.some(fl => fl.username === f.username)} />)}
            </div>
        )
    }
}

export default FollowList;
import React, { Component } from 'react';
import SearchResultItem from '../../components/SearchResultItem';

class SearchResult extends Component {
    render() {
        return (
            <div className="my-1 d-flex flex-column">
            {(!this.props.matchingUsers || this.props.matchingUsers.length === 0) ? 
                <div className="d-flex justify-content-center">No result to display</div>
                : this.props.matchingUsers.map(user => <SearchResultItem {...user}
                    followed={user.followers.some(u => u.username === this.props.sessionUser)}
                    isSelf={user.username === this.props.sessionUser} 
                    handleFollow={this.props.handleFollow}
                    handleUnfollow={this.props.handleUnfollow} />)
            }
            </div>
        );
    }
}

export default SearchResult;
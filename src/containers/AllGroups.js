import React, { Component } from 'react'

class AllGroups extends Component {
    renderGroups = () => {
        return this.props.groups.map(group => {
            return <div key={group.id}>
                <h3>{group.name}</h3>
                <button>Join</button>
            </div>
        })
    }

    render() {
        return (
            <div>
                {this.renderGroups()}
                <button>Start a new Group</button>
            </div>
        )
    }
}

export default AllGroups

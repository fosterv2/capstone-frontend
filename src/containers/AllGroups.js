import React, { Component } from 'react'
import GroupForm from '../forms/GroupForm'

class AllGroups extends Component {
    state = {
        addClicked: false,
        currentGroup: {
            name: "",
            description: ""
        }
    }

    renderGroups = () => {
        return this.props.groups.map(group => {
            return <div className="join" key={group.id}>
                <p><span onClick={() => this.handleClickName(group)}>{group.name}</span><br />
                <button onClick={() => this.props.handleClick(group.id)}>Join</button></p>
            </div>
        })
    }

    handleClickButton = () => {
        this.setState(prev => {
            return { addClicked: !prev.addClicked }
        })
    }

    handleClickName = group => {
        this.setState({ currentGroup: group })
    }

    render() {
        return (
            <div className="main groups">
                <div className="all groups">
                    {this.state.addClicked ?
                    <GroupForm handleSubmit={this.props.handleSubmit} handleBack={this.handleClickButton} />
                    : <button onClick={this.handleClickButton}>Start a new Group</button>}
                    {this.renderGroups()}
                </div>
                <div className="single group">
                    <h2>{this.state.currentGroup.name}</h2>
                    <p>{this.state.currentGroup.description}</p>
                </div>
            </div>
        )
    }
}

export default AllGroups

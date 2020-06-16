import React, { Component, Fragment } from 'react'

const AuthHoc = WrappedComconent => {
    return class AuthHOC extends Component {
        state = {
            authorized: false
        }

        componentDidMount() {
            if (!localStorage.getItem("token")) {
                this.props.history.push("/login")
            } else {
                this.setState({ authorized: true })
            }
        }

        render() {
            return (
                <Fragment>
                    {this.state.authorized ? 
                    <WrappedComconent {...this.props} /> :
                    null}
                </Fragment>
            )
        }
    }
}

export default AuthHoc

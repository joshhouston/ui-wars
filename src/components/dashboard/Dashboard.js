import React, {Component} from 'react';
import Navigation from '../navigation/Navigation'
import axios from 'axios'
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducer';
import {Redirect} from 'react-router-dom';


class Dashboard extends Component {
    constructor() {
        super();
        this.state ={
            redirect: false
        }
        this.logOutUser = this.logOutUser.bind(this);
    }

    componentDidMount() {
        // this.props.getUser();
    }

    logOutUser() {
        axios
            .post('/auth/logout').then(res => {
                console.log(res.data)
            })
    }

    render() {
        // if(!this.props.user) {
        //     this.setState({redirect: true})
        // }
        // if(this.state.redirect) {
        //     alert('please login')
        //     return <Redirect to='/' />
        // }
        return (

            <div className='dashboard'>
                <Navigation logOut={this.logOutUser} />
            
                <div className="dashMain">
                    <div className="dashHeader">


                    </div>
                </div>

                {/* <button onClick={this.logOutUser} >Logout</button> */}
                
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const {user} = reduxState
    return {
        user
    }
}

export default connect (
    mapStateToProps,
    {getUser}
)(Dashboard)
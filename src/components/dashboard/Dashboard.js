import React, {Component} from 'react';
import Navigation from '../navigation/Navigation';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUser} from '../../redux/reducer';
import {Redirect} from 'react-router-dom';
import edit from './edit-icon.png';
import {Link} from 'react-router-dom';
import Loader from 'react-loader-spinner';
import Accepted from '../accepted/Accepted';
import Responsive from '../navigation/Responsive'

class Dashboard extends Component {
    constructor() {
        super();
        this.state ={
            redirect: false,
            username: '',
            fullname: '',
            email: '',
            github: '',
            profilePicture: '',
            isLoading: true
        }
        this.logOutUser = this.logOutUser.bind(this);
    }

    componentDidMount() {
        axios
            .get('/api/dashboard')
            .then(response => {
                const user = response.data[0]
                this.setState({
                    username: user.username,
                    fullname: user.full_name,
                    email: user.email,
                    github: user.github,
                    profilePicture: user.profile_picture,
                    isLoading: false
                })
            })
            
        
    }

    logOutUser() {
        axios
            .post('/auth/logout').then(res => {
                console.log(res.data)
            })
    }

    render() {
     
        return (

            <div className='dashboard'>
                <Responsive />
                <Navigation logOut={this.logOutUser} />
                {this.state.isLoading
                    ?
                    <div className="loader">
                        <Loader type="Oval" color="#FFF" height={80} width={80} />
                    </div>
                    :
                    <div className="dashMain">
                        <div className="dashHeader">
                            <div className="profile-picture">
                                <img src={this.state.profilePicture} alt=""/>
                            </div>

                            <div className="profile-info">
                                <h3>Full Name:<br/> {this.state.fullname}</h3>
                                <h3>Email:<br/> {this.state.email}</h3>
                                <h3>Github: <br/> <a target='_blank' href={this.state.github}><i className="devicon-github-plain"></i></a> </h3>
                            </div>

                            <div className="profile-stats">
                                <h3>Following: 0</h3>
                                <h3>Followers: 0</h3>
                                <h3>Posts Liked: 2</h3>
                            </div>

                            <div className="edit-icon">
                                <Link to='/edit'>
                                    <img src={edit} title='Edit Profile' alt="edit-button"/>
                                </Link>
                            </div>

                        </div>

                        <div className="my-challenges">
                            <Accepted />
                        </div>
                    </div>
                }
                
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
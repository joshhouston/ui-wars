import React, {Component} from 'react';
import axios from 'axios';
import Navigation from '../navigation/Navigation';


class Edit extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return(
            <div className='row' >
                <Navigation />
                <div>
                    Edit
                </div>
            </div>
        )
    }
}

export default Edit;
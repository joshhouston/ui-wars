import React, {Component} from 'react';
import Navigation from '../navigation/Navigation';


class Challenge extends Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <div className='row'>

                <Navigation />
                <button type='file' className='addButton' >Upload</button>
            </div>
        )
    }
}

export default Challenge
import React, { Component } from 'react'
import { Link} from 'react-router-dom'; 
import {  Button } from '@material-ui/core';
import StatusBar from '../StatusBar'; 

import './BeliefInstructions1.css'

class BeliefInstructions1 extends Component {

    state = {
        statusBar : 17
    }

    render() {
        return (
            <div>
                 <StatusBar status={this.state.statusBar} />
                 
                <div className ="instructions">
                    <div>
                On the next screen please write 3 of your beliefs that you would not want to give up. 
                Beliefs can be personal, political, or religious. Here is a short tutorial. 
                    </div> <div>
                (Examples for tutorial: 
                I believe people can change for the better. 
                I believe taxes should be lowered. I believe in a higher power.)
                    </div>
                 </div>
                 
                 <div className="examples">
                  (Examples for tutorial: I believe people can change for the better. 
                I believe taxes should be lowered. I believe in a higher power.)
                </div>
                
                <div className="giph">

                </div>

                <Link to="/Belief1"> 
                    <Button
                        color="primary"
                        variant="contained"
                        >
                        Next
                    </Button> 
                 </Link>
            </div>
        )
    }
}

export default BeliefInstructions1

import React, {Component} from 'react'
import {connect} from 'react-redux'
class MovieDetail extends Component{

    render(){
        console.log(this.props.selectedMovie)
        if(this.props.selectedMovie){
        return (<h1>
            {this.props.selectedMovie.title}

        </h1>)}
        else{
            return (
                <h1>
                    No Movie Selected
                </h1>
            )
        }

    }
}

function mapStateToProps(state) {
    return {
        selectedMovie:state.active_movie
    }
}
export default connect(mapStateToProps)(MovieDetail)
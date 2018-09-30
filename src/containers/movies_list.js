import React, { Component } from 'react'
import {connect} from 'react-redux'
import {selectMovie} from "../actions/index"
import {bindActionCreators} from 'redux'
class movies_list extends Component{
    getMoviesList = () =>{
        let list=[];
        this.props.movies.map((movie)=>{
            list.push (
                <li key={movie.title} className="list-group-item"
                onClick={(e)=>this.props.selectMovie(movie)}>
                    {movie.title}
                </li>)

        })
return list

    }

    render(){
        return (<ul className="list-group col-sm-4">
            {this.getMoviesList()}

        </ul>)

    }

}
/*function below assign state returned by redux store to this.props of the component*/
/*in Project, this function was nopthing but selectors, which takes application state as the argument
* and return things*/
/*it returns an object*/
function mapStateToProps(state){
   /*movies was assigned to state by our reducer reducer_movies*/
    return {movies:state.movies}
}

/*The function  returns action function as this.props.action*/
function mapDispatchToProps(dispatch){
/*What bindActionCreator does is whenever this.props.selectBook is called
* its result is gonna flow through the dispatch function which will pass it through all the reducers*/

return bindActionCreators({selectMovie:selectMovie},dispatch)

}

/*this is called exporting the container.*/
/*a container is nothing but a component which is aware of redux state*/
export default connect(mapStateToProps,mapDispatchToProps)(movies_list);

/*imp thing: whenever there is change in redux state, the containder will re-render*/
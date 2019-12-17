import React, { Component } from 'react'
import {connect} from 'react-redux'
// import {selectMovie} from "../actions/index"
import {fetchTestContent,resetAttempts} from '../actions/testActions'
import {bindActionCreators} from 'redux'
import Question from '../components/Question'
import Button from '@material-ui/core/Button';
import BarGraph from '../components/common/BarGraph'
import {questionAttemptStatus} from '../constants'
import '../../style/style.css'
class TestContainer extends Component{
    constructor(props){
        super(props)
        this.state={showResult:false,submitted:false}
    }  
    Handlers={
        handleSubmit:()=>{
            this.setState({showResult:true,submitted:true})  
          },
        handleClearAll:()=>{
            console.log("handle clear all")
        },
        handleBackClick:()=>{
            this.setState({showResult:false})
        },
        clearValues:()=>{
            this.setState({submitted:false})
            this.props.resetAttempts()
        }
    }

    DataHelpers={
        getResultData:()=>{
            let correct=0,incorrect=0
            let graphData = []
            if(this.props.attempts && Object.keys(this.props.attempts).length){
                //  let attemptedQuestions = Object.keys(this.props.attempts)
                 for(let qId in this.props.attempts){
                      let attemptObj = this.props.attempts[qId]
                      if(attemptObj.status===questionAttemptStatus.CORRECT){
                        correct+=1
                      }
                      else if (attemptObj.status===questionAttemptStatus.INCORRECT){
                       incorrect+=1
                      }
                 }
              let correctObj = {field:'Correct',value:correct,color:'#99ff99'}
              let incorrectObj = {field:'In-correct',value:incorrect,color:'#ff8566'}
              graphData.push(correctObj)
              graphData.push(incorrectObj)

            }
          return graphData
        },
    getQuestionStatus:(qId)=>{
        let status
        if(this.state.submitted && this.props.attempts){
            let attemptForQuestion = this.props.attempts[qId]
            if(attemptForQuestion){
                status=attemptForQuestion.status
            }
          }  
          return status
        }
     }
    
    Renderers={
        renderQuestions:()=>{
           if(this.props.testContent){
            let questionElements = []  
            let questions = this.props.testContent.questions?this.props.testContent.questions:[]
            for(let question of questions){
                 questionElements.push(<Question testSubmitted={this.state.submitted} status={this.DataHelpers.getQuestionStatus(question.questionId)} question={question} />)
            }  
            return questionElements
   
           }
               },
           renderCTAs:()=>{
                 let ctaElements = []
                 ctaElements.push(<Button variant="contained" color="primary" onClick={this.Handlers.handleSubmit}>
                 {this.state.submitted ?'Go to result':'Submit'} 
               </Button>)
                ctaElements.push(<Button style={{marginLeft:"20px"}} variant="contained" color="secondary" onClick={this.Handlers.clearValues}>
                Clear Values
              </Button>)
             return(<div className="ctas-container">{ctaElements}</div>)
           },
           renderHeader:()=>{
                return(<div className="header-wrapper">
                     <div className="button-container">
                        <Button variant="contained" color="primary" onClick={this.Handlers.reAttemptTest}>
                            Re-attempt 
                        </Button>
                     </div>

                </div>)
           },
           renderResultSection:()=>{
        let resultElements = []
            let graphData = this.DataHelpers.getResultData()
            console.log("graphData",graphData)
            if(graphData.length){
                resultElements.push( <Button style={{marginTop:"30px"}} onClick={this.Handlers.handleBackClick} color="primary">{`<- Back to questions`}</Button>)
                resultElements.push(<div className="bar-graph-container"><BarGraph data={graphData}/></div>)
                return (<div className="result-container">{resultElements}</div>)
             }
            }    
       }

    
    init(){
        this.props.fetchTestContent()
    }
    componentDidMount(){
        this.init()
    } 


    render(){
        console.log("Test container props",this.props)
        return(<React.Fragment>
            {/* {this.state.submitted && this.Renderers.renderHeader()} */}
            <div className="test-container"><div>{this.Renderers.renderQuestions()}</div>
            <div>{this.Renderers.renderCTAs()}</div> 
            {this.state.showResult && this.Renderers.renderResultSection()}
            </div>
         </React.Fragment>)
     
    }



}
function mapStateToProps(state){
   /*movies was assigned to state by our reducer reducer_movies*/
    return {testContent:state.testContent,attempts:state.attempts}
}

function mapDispatchToProps(dispatch){
   return bindActionCreators({fetchTestContent,resetAttempts},dispatch)

}

/*this is called exporting the container.*/
/*a container is nothing but a component which is aware of redux state*/
export default connect(mapStateToProps,mapDispatchToProps)(TestContainer);

/*imp thing: whenever there is change in redux state, the containder will re-render*/
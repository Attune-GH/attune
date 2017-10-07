import React, { Component } from 'react'
import {Radar} from 'react-chartjs-2'
import { connect } from 'react-redux'
import { getMatches } from 'APP/fire/refs'

class MatchesChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      matches: {}
    }
  }

  componentDidMount() {
    store.dispatch(constantlyUpdateUser())
    const user = this.props.user
    console.log(user)
    const uid = this.props.user.uid
    console.log('uid', uid)
    getMatches(uid).then(matches => this.setState({ matches }))
  }

  render() {  
    const data = {
      labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgba(179,181,198,0.2)',
          borderColor: 'rgba(179,181,198,1)',
          pointBackgroundColor: 'rgba(179,181,198,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(179,181,198,1)',
          data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
          label: 'My Second dataset',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          pointBackgroundColor: 'rgba(255,99,132,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(255,99,132,1)',
          data: [28, 48, 40, 19, 96, 27, 100]
        }
      ]
    }
    const options = {
      scale: {
        display: true,
        gridLines: {
          color: 'rgba(255,255,255,0.9)'
        },
        ticks: {
          backdropColor: 'rgba(0,0,0,0.9)'
       }
      }
      
    }
    
    // scaleShowGridLines: true,
    // scaleGridLineColor: 'rgba(255,255,255,0.9)',
    // scaleGridLineWidth: 1,
    // scaleShowHorizontalLines: true,
    // scaleShowVerticalLines: true,
    // bezierCurve: true,
    // bezierCurveTension: 0.4,
    // pointDot: true,
    // pointDotRadius: 4,
    // pointDotStrokeWidth: 1,
    // pointHitDetectionRadius: 20,
    // datasetStroke: true,
    // datasetStrokeWidth: 2,
    // datasetFill: true,
    // legendTemplate: '<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'

    const styles = {
      graphContainer: {
        border: '1px solid white',
        padding: '15px'
      }
    }
    return (
      
      <div style={styles.graphContainer}>
        <Radar data={data} options={options} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(MatchesChart)
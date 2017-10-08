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
    const user = this.props.user
    const uid = this.props.user.uid
    getMatches(uid).then(matches => this.setState({ matches }))
  }

  render() {  
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
    const styles = {
      graphContainer: {
        border: '1px solid white',
        padding: '15px'
      }
    }
    const matches = this.state.matches
    let sortable = [];
    for (var person in matches) {
    sortable.push([person, matches[person]]);
    }

  let sortedMatches = sortable.sort(function(a, b) {
        return b[1] - a[1];
    });
    
    if(sortedMatches.length > 5) sortedMatches = sortedMatches.slice(0, 5)

    const translucentColors = ['rgba(179,181,198,0.2)', 'rgba(255,99,132,0.2)', 'rgba(201,81,232,0.2)', 'rgba(86,170,234,0.2)', 'rgba(92,224,138,0.2)']

    const opaqueColors = ['rgba(179,181,198,1)', 'rgba(255,99,132,1)', 'rgba(201,81,232,1)', 'rgba(86,170,234,1)', 'rgba(92,224,138,1)']

    const dataset$ = sortedMatches.map((person, ind) => {
      return {
        label: person[0].slice(13),
        backgroundColor: translucentColors[ind],
        borderColor: opaqueColors[ind],
        pointBackgroundColor: opaqueColors[ind],
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: opaqueColors[ind],
        data: [person[1]*200, person[1]*200, person[1]*200, person[1]*200]
      }
    })

    const data = {
      labels: ['Top Artists', 'Top Tracks', 'Recent Tracks', 'Genres'],
      datasets: dataset$
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
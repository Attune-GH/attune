import React, { Component } from 'react'
import {Radar} from 'react-chartjs-2'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getMatches, getAllMatches } from 'APP/fire/refs'

class MatchesChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      matches: {},
      allMatches: {}
    }
  }

  fetchMatches(props) {
    getMatches(props.user.uid).then(matches => this.setState({matches}))
    getAllMatches(props.user.uid).then(allMatches => this.setState({allMatches}))
  }

  componentDidMount() {
    this.fetchMatches(this.props)
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.user.uid !== nextProps.user.uid) {
      this.fetchMatches(nextProps)
    }  
  }

  render() {  
    const options = {
      scale: {
        display: true,
        gridLines: {
          color: 'rgba(255,255,255,0.9)'
        },
        ticks: {
          backdropColor: 'rgba(0,0,0,0.9)',
          beginAtZero: true
       },
       responsive: 'true',
       maintainAspectRatio: true
      }
    }
    const styles = {
      graphContainer: {
        border: '1px solid black',
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
    console.log('sortedMatches', sortedMatches)
    
    if(sortedMatches.length > 5) sortedMatches = sortedMatches.slice(0, 5)

    var allMatches = this.state.allMatches

    const translucentColors = ['rgba(179,181,198,0.2)', 'rgba(255,99,132,0.2)', 'rgba(201,81,232,0.2)', 'rgba(86,170,234,0.2)', 'rgba(92,224,138,0.2)']

    const opaqueColors = ['rgba(179,181,198,1)', 'rgba(211,82,138,1)', 'rgba(201,81,232,1)', 'rgba(86,170,234,1)', 'rgba(92,224,138,1)']

 
    let dataset$ = allMatches.artistsScores
      ? sortedMatches.map((person, ind) => {
      console.log('person', person)
      return {
        label: person[0].slice(13),
        backgroundColor: translucentColors[ind],
        borderColor: opaqueColors[ind],
        pointBackgroundColor: opaqueColors[ind],
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: opaqueColors[ind],
        data: [person[1]*200, allMatches.artistsScores[person[0]]*1000, allMatches.tracksScores[person[0]]*1400, allMatches.genreScores[person[0]]*200]
      }
    }) : []

    console.log('dataset$', dataset$)
    // Do not change totalMatch score

    const data = {
      labels: ['Total Match Score', 'Top Artists', 'Top Tracks', 'Genres'],
      datasets: dataset$
    }

    return (
      
      <div>
        <Radar data={data} options={options} style={styles.graphContainer} width={99} height={99} />
        {sortedMatches.map(user => {
          return (
            <div>
              {<Link to={`/profile/${user[0]}`} style={{ color: 'white' }}>
                <button className="btn btn-match" style={{ width: '250px' }}>{user[0].slice(13)}</button>
              </Link>}
            </div>
          )
        })}
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
import React, { Component } from 'react'
import {Radar} from 'react-chartjs-2'
import { connect } from 'react-redux'
import { getMatches, getAllMatches } from 'APP/fire/refs'

class MatchesChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      matches: {},
      allMatches: {}
    }
  }

  // //change
  // componentDidMount() {
  //   const user = this.props.user
  //   const uid = this.props.user.uid
  //   getMatches(uid).then(matches => {
  //     this.setState({ matches })
  //   }).then(() => console.log(this.state.matches))
  //   getAllMatches(uid).then(allMatches => this.setState({allMatches}))
  // }
  componentWillReceiveProps(nextProps) {
    if(this.props.user.uid !== nextProps.user.uid) {
      getMatches(nextProps.user.uid).then(matches => this.setState({matches}))
      getAllMatches(nextProps.user.uid).then(allMatches => this.setState({allMatches}))
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
          backdropColor: 'rgba(0,0,0,0.9)'
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
    console.log('matches', matches)
    let sortable = [];
    for (var person in matches) {
    sortable.push([person, matches[person]]);
    }

  let sortedMatches = sortable.sort(function(a, b) {
        return b[1] - a[1];
    });
    
    if(sortedMatches.length > 5) sortedMatches = sortedMatches.slice(0, 5)

    var allMatches = this.state.allMatches
    console.log('allMatches', allMatches)

    const translucentColors = ['rgba(179,181,198,0.2)', 'rgba(255,99,132,0.2)', 'rgba(201,81,232,0.2)', 'rgba(86,170,234,0.2)', 'rgba(92,224,138,0.2)']

    const opaqueColors = ['rgba(179,181,198,1)', 'rgba(211,82,138,1)', 'rgba(201,81,232,1)', 'rgba(86,170,234,1)', 'rgba(92,224,138,1)']

    let dataset$ = sortedMatches.map((person, ind) => {
      return {
        label: person[0].slice(13),
        backgroundColor: translucentColors[ind],
        borderColor: opaqueColors[ind],
        pointBackgroundColor: opaqueColors[ind],
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: opaqueColors[ind],
        data: [person[1]*100, allMatches.artistsScores[person[0]]*800, allMatches.tracksScores[person[0]]*1200, allMatches.genreScores[person[0]]*100]
      }
    })

    const data = {
      labels: ['Total Match Score', 'Top Artists', 'Top Tracks', 'Genres'],
      datasets: dataset$
    }

    return (
      
      <div>
        <Radar data={data} options={options} style={styles.graphContainer} width={99} height={99} />
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
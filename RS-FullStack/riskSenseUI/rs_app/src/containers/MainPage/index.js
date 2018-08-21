import React, { Component } from 'react';
import AppBarComp from '../../components/AppBar/index';
import GraphDetailCard from '../../components/GraphDetail/index';

import {
  FlexibleWidthXYPlot,
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  MarkSeries,
  Hint
} from 'react-vis';

//css
import './MainPage.css';


import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import { makeRiskDataLoading} from './selectors';
import { loadMainPageData, mainPageLoaded, mainPageError} from './actions';
import reducer from './reducer';
import saga from './saga';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';

function myFormatter(t, i) {
  let label = "";
  switch(t){
    case 0:
     label = "";
     break;
    case 4:
     label = "0-4 rank: RED";
     break;
    case 8:
     label = "5-8 rank : ORANGE";
     break;
    case 12:
     label = "9-12 rank : YELLOW";
     break;
    case 16:
     label = "13-16 rank : GREEN";
     break;
    case 20:
     label = "17-20: BLUE";
     break;
    default:
     label = "";
  }
  return (<tspan>
    <tspan x="0" dy="1em">{label}</tspan>
    <tspan x="0" dy="1em">{t}</tspan>
  </tspan>);
}


class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [],
      datapointVal:{},
      dataDesc:{}
    };
}
componentDidMount() {
    this.props.onMainPageComponentLoad();
}

componentWillReceiveProps = (nextProps) => {
  let value = [];
  value = nextProps.riskData.map((e)=>{
    let dta;
    if(e.rank_s <5){
      dta = {x:e.rank_s,y:5, size:e.target, color:0, label: 'woah!'};
      return dta;
    } else if(e.rank_s >4 && e.rank_s <9){
      dta = {x:e.rank_s,y:5, size:e.target, color:1, label: 'woah!'};
    } else if(e.rank_s >8 && e.rank_s <13){
      dta = {x:e.rank_s,y:5, size:e.target, color:2, label: 'woah!'};
    } else if(e.rank_s >12 && e.rank_s <17){
      dta = {x:e.rank_s,y:5, size:e.target, color:3, label: 'woah!'};
    } else {
      dta = {x:e.rank_s,y:5, size:e.target, color:4, label: 'woah!'};
    }
    return dta;
  });
  value.push({x:0,y:0, size:0, color:4});
  value.push({x:24,y:10, size:0, color:4});

  this.setState({
     series: value
  })
}
  render() {
    return (
      <div className="whClass">
        <AppBarComp title="Risk Distribution by Client"></AppBarComp>
        <div className="paddingClass">
          <GraphDetailCard></GraphDetailCard>
        </div>
        <div>
        <FlexibleWidthXYPlot
          height={500}
          colorType="category"
          colorRange={['red', 'orange', 'yellow', 'green', 'blue']}
          >
          <XAxis tickFormat={myFormatter} tickValues={[0,4,8,12,16,20]} style={{
            line: {stroke: '#ADDDE1'},
            ticks: {stroke: '#ADDDE1'},
            text: {stroke: 'none', fill: '#6b6b76', fontWeight: 600}}} />
            <MarkSeries
            onValueMouseOver={(datapoint, event)=>{
                let dta = this.props.riskData.filter((e,i) =>{
                  return e.rank_s === datapoint.x
                })
                if(dta){
                this.setState({
                   datapointVal: datapoint,
                   dataDesc: {
                      "rank_s":dta[0].rank_s,
                       "target_port":dta[0].target_port,
                       "record":dta[0].record,
                       "target":dta[0].target,
                       "source":dta[0].source}
                })
                }
               }}
              className="mark-series-example"
              strokeWidth={2}
              opacity="0.8"
              sizeRange={[0,100]}
              data={this.state.series}>
           </MarkSeries>
           {this.state.datapointVal?<Hint value={this.state.datapointVal} format={(data) =>{
             console.log(data);
           }}>
             <div style={{background: 'black',borderRadius:5, padding:5}}>
              <h3 style={{color:'white', margin:10}}>Rank: {this.state.dataDesc.rank_s} </h3>
               <div style={{color:'white', margin:10}}>
                <p>Target Ports: {this.state.dataDesc.target_port}</p>
                <p>Record: {this.state.dataDesc.record}</p>
                <p>Targets: {this.state.dataDesc.target}</p>
                <p>Sources: {this.state.dataDesc.source}</p>
               </div>
             </div>
          </Hint>: null}
        </FlexibleWidthXYPlot>
        </div>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
    return {
      onMainPageComponentLoad: () => dispatch(loadMainPageData())
  }
}

const mapStateToProps = createStructuredSelector({
    riskData: makeRiskDataLoading()
});

const withConnect = connect(mapStateToProps,mapDispatchToProps);
const withReducer = injectReducer({ key: 'MainPage', reducer });
const withSaga = injectSaga({ key: 'MainPage', saga });

export default compose(withReducer,withSaga,withConnect)(MainPage);

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
  let wrapArray = nextProps.riskData.map((e)=>{
      return e.target;
  });
  let wrapAvg0 = wrapArray.reduce((acc, e, i)=>{
    return i <5?acc+parseInt(e):acc;
  })
  wrapAvg0 = wrapAvg0/4;

  let wrapAvg1 = wrapArray.reduce((acc, e, i)=>{
    return (i>4 &&i <9)?acc+parseInt(e):acc;
  })
  wrapAvg1 = wrapAvg1/4;

  let wrapAvg2 = wrapArray.reduce((acc, e, i)=>{
    return (i>8 &&i <13)?acc+parseInt(e):acc;
  })
  wrapAvg2 = wrapAvg2/4;

  let wrapAvg3 = wrapArray.reduce((acc, e, i)=>{
    return (i>12 &&i <17)?acc+parseInt(e):acc;
  })
  wrapAvg3 = wrapAvg3/4;

  let wrapAvg4 = wrapArray.reduce((acc, e, i)=>{
    return (i>16 &&i <21)?acc+parseInt(e):acc;
  })
  wrapAvg4 = wrapAvg4/4;
  let totalAvg = (wrapAvg0+wrapAvg1+wrapAvg2+wrapAvg3+wrapAvg4)/5;
  console.log(totalAvg);
  console.log(wrapAvg0);
  console.log(wrapAvg1);
  console.log(wrapAvg2);
  console.log(wrapAvg3);
  console.log(wrapAvg4);
  let y0 = 2;
  let y1 = 2;
  let y2 = 2;
  let y3 = 2;
  let y4 = 2;
  value = nextProps.riskData.map((e)=>{
    let dta;
    if(e.rank_s <5){
      if(totalAvg < wrapAvg0){
        dta = {x:e.rank_s,y:y0, size:e.target, color:0, label: 'woah!'};
        y0 = y0 +2;
      }else{
      if(e.target < wrapAvg0)
      dta = {x:e.rank_s,y:2, size:e.target, color:0, label: 'woah!'};
      else{
       dta = {x:e.rank_s,y:6, size:e.target, color:0, label: 'woah!'};
      }
    }
    } else if(e.rank_s >4 && e.rank_s <9){
      if(totalAvg < wrapAvg1){
        dta = {x:e.rank_s,y:y1, size:e.target, color:1, label: 'woah!'};
        y1 = y1 +2;
      }else{
      if(e.target < wrapAvg1)
      dta = {x:e.rank_s,y:2, size:e.target, color:1, label: 'woah!'};
      else{
       dta = {x:e.rank_s,y:6, size:e.target, color:1, label: 'woah!'};
      }
    }
    } else if(e.rank_s >8 && e.rank_s <13){
      if(totalAvg < wrapAvg2){
        dta = {x:e.rank_s,y:y2, size:e.target, color:2, label: 'woah!'};
        y2 = y2 +2;
      }else{
      if(e.target < wrapAvg2)
      dta = {x:e.rank_s,y:2, size:e.target, color:2, label: 'woah!'};
      else{
       dta = {x:e.rank_s,y:6, size:e.target, color:2, label: 'woah!'};
      }
     }
    } else if(e.rank_s >12 && e.rank_s <17){
      if(totalAvg < wrapAvg3){
        dta = {x:e.rank_s,y:y3, size:e.target, color:3, label: 'woah!'};
        y3 = y3 +2;
      }else{
      if(e.target < wrapAvg3)
      dta = {x:e.rank_s,y:2, size:e.target, color:3, label: 'woah!'};
      else{
       dta = {x:e.rank_s,y:6, size:e.target, color:3, label: 'woah!'};
      }
     }
    } else {
      if(totalAvg < wrapAvg4){
        dta = {x:e.rank_s,y:y2, size:e.target, color:4, label: 'woah!'};
        y4 = y4 +2;
      }else{
      if(e.target < wrapAvg4)
      dta = {x:e.rank_s,y:2, size:e.target, color:4, label: 'woah!'};
      else{
       dta = {x:e.rank_s,y:6, size:e.target, color:4, label: 'woah!'};
      }
     }
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
          height={850}
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
              sizeRange={[1,100]}
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

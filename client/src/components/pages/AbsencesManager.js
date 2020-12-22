import React, { Component } from 'react';
import moment from 'moment';
import { ConfigProvider, DatePicker } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import DataFrame from 'dataframe-js';
import MultiSelect from '../widgets/MultiSelect.js';
import backendRoutes from '../constants/backendRoutes.json';
import Auxiliary from '../util/components/Auxiliary.js';
import Loader from '../widgets/Loader.js';
// import AbsenceCard from '../Widgets/AbsenceCard';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
// import axios from 'axios';
// import DataFrame from 'dataframe-js';
// import TextField from '@material-ui/core/TextField';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import InputAdornment from '@material-ui/core/InputAdornment';
import { dateToString } from '../util/functions/dates';
import { getValues } from '../util/functions/values';

const { RangePicker } = DatePicker;
const dateFormat = 'DD/MM/YYYY';

class AbsencesManager extends Component {
  constructor(props) {
    super(props);

    // Defining min and max date accordingly to db max and min
    let minDate = '2016-12-01'
    let maxDate = '2018-03-01'

    this.state = {
        startDate: minDate,
        endDate: maxDate,
        minDate: minDate,
        maxDate: maxDate,
        loadingData: true,
        crewIds: new DataFrame([]),
        members: new DataFrame([]),
        selectedCrewIds: [],
        selectedMembers: [],
        crewIdsOptions: [],
        membersOptions: []
    };
	} 
	
	// shouldComponentUpdate(prevProps, prevState) {
	// 	if(prevState !== this.state && (prevState.priceValue !== this.state.priceValue || prevState.categoryValue !== this.state.categoryValue || prevState.placeValue !== this.state.placeValue)) {
	// 		return false
	// 	} else {
	// 		return true
	// 	}
    // }
    
    async componentDidMount() {
        let members = await axios.get(backendRoutes.localHost + backendRoutes.allMembers)
  
        let membersDataFrame = new DataFrame(members.data.result);
        let crewIds = membersDataFrame.distinct('crewId');

        let crewIdsOptions = getValues(crewIds, true)
        let membersOptions = getValues(membersDataFrame, true)

        this.setState({
            crewIds: crewIds,
            members: membersDataFrame,
            crewIdsOptions: crewIdsOptions,
            membersOptions: membersOptions,
            loadingData: false
        })
    }

  render() {
    const selectsContainer = {
      margin: '0.3vw auto 0 auto', 
      maxWidth: '80%', 
      display: 'flex', 
      justifyContent: 'space-between'
    }
    const membersSelect = {
      padding: '0.5vw', 
      flexBasis: '20%',
      zIndex: 4
    }
    const dateSelect = {
      padding: '0.5vw', 
      flexBasis: '30%', 
      zIndex: 4
    }
    const storeSelect = {
      padding: '0.5em', 
      flexBasis: '35%', 
      zIndex: 4
    }
    const yearSelect = {
      padding: '0.5em 0em 0.5em 0.5em', 
      flexBasis: '50%', 
      zIndex: 4
    }
    const titleContainer = {
      display: 'flex', 
      flexDirection: 'column',
      maxWidth: '85vw', 
      margin: '0 auto 1em auto'
    }
    const titleStyle = {
      fontSize: '2em', 
      fontWeight: 'bold', 
      color: 'black'
		}
		const buttonContainer = {
      padding: '0.5em 0em 0.5em 2em', 
      flexBasis: '5%', 
      zIndex: 4
    }
    const buttonStyle = {
			// backgroundColor: 'red',
			// color: 'red',
      width: '100%',
      height: '90%',
      maxWidth: '135.55px',
      maxHeight: '32.39px',
      // borderRadius: '6px',
      // border: '1px solid #bdc3c7',
      textTransform: 'none',
      padding: '0'
    }
    const subtitleStyle = {
      fontSize: '1em',  
      alignSelf: 'flex-start', 
      color: 'black'
    }
    const chartsContainer = {
      display: 'flex', 
      margin: '0.3em auto 0 auto', 
      maxWidth: '90vw', 
      justifyContent: 'space-between'
    }
    const verticalContainer = {
      flexDirection: 'column', 
      flexBasis: '70%'
    }
    const netWorthStyle = {
			height: '30vh', 
			flexBasis: '60%',
			paddingLeft: '7%', 
			fontSize: '4em', 
			paddingTop: '6%'
	}
    const budgetStyle = {
			height: '10vh', 
			flexBasis: '100%',
			paddingLeft: '7%', 
			fontSize: '2em', 
			paddingTop: '6%',
			color: 'green'
	}
	const incomeBalanceContainer = {
		display: 'flex', 
		flexDirection: 'column', 
		flexBasis: '40%'
	}
	const balanceStyle = {
		height: '10vh', 
		flexBasis: '100%',
		fontSize: '2.5em', 
		paddingTop: '6%',
		paddingBottom: '6%',
		color: 'green',
		alignSelf: 'center'
	}
    const incomeMovementStyle = {
			height: '10vh', 
			flexBasis: '100%',
			paddingTop: '6%',
			fontSize: '1.7em'
	}
    const barChartContainer = {
      height: '50%'
    }
    const sumTypeSelector = {
      width: '17em', 
      paddingLeft: '4em'
    }
    const topWorstContainer = {
      height: '50%'
    }
    const barChartStyle = {  
      height: '43.25vh',
    }
    const topStyle = {
      height: '43.25vh',
    }
    const heatMapContainer = {
      flexBasis: '30%', 
      height: '75vh', 
      overflowY: 'scroll', 
      // overflowX: 'scroll'
    }

    let usedCrewIds = this.state.selectedCrewIds.length === 0 ? this.state.crewIdsOptions : this.state.selectedCrewIds;

    let membersOptions = [];
    this.state.members.where(row => usedCrewIds.includes(row.get('crewId'))).map(row => {
        membersOptions.push({label: (row.get('userId') + ' - ' + row.get('name')), value: row.get('userId')});
    });

    if(this.state.loadingData === false) {
        return (
        <div className="gx-main-content">
            <div>
                <div style={selectsContainer}>
                    {/* <div style={{display: 'flex', flexBasis: '35%', alignContent: 'flex-end'}}> */}
                    <div style={dateSelect}>
                        <ConfigProvider>
                            <RangePicker 
                                value={[moment(new Date(this.state.startDate), dateFormat).utc(), moment(new Date(this.state.endDate), dateFormat).utc()]}
                                format={dateFormat}
                                onChange={(d, s) => {
                                    console.log('d', d)
                                    if(d[0] === null || d[0] === undefined) {
                                        this.setState({startDate: this.state.minDate, endDate: this.state.maxDate})
                                    } else {
                                        this.setState({startDate: dateToString(d[0]._d, false), endDate: dateToString(d[1]._d, false)})
                                    }
                                }}
                            />
                        </ConfigProvider>
                    </div>
                    <div style={membersSelect}>
                        <MultiSelect 
                            value={this.state.selectedMembers} 
                            options={membersOptions}
                            placeholder={'Select members'}
                            onChange={(e) => {
                                this.setState({
                                    selectedMembers: e
                                })
                            }}
                        />
                    </div> 
                        {/* <div style={yearSelect}>
                                <MultiSelect 
                                        value={'Jun'}
                                        options={['Jun', 'Jul']}
                                />
                            </div>  */}
                    {/* </div> */}
                    {/* <div style={buttonContainer}>
                        <IconButton style={buttonStyle} onClick={e => {this.handleClickOpen()}}>
                            <AddCircleOutlineIcon/>
                        </IconButton>
                    </div> */}
                </div>
                {/* <div style={chartsContainer}>
                    <div style={verticalContainer}>
                        <div style={{display: 'flex'}}>
                            <NetWorth
                                style={netWorthStyle}
                                month={this.state.monthFilter.value}
                                year={this.state.yearFilter.value}
                                state={this.state}
                            />
                            <div style={incomeBalanceContainer}>
                                <MonthBalance
                                    style={balanceStyle}
                                    month={this.state.monthFilter.value}
                                    year={this.state.yearFilter.value}
                                    state={this.state}
                                /> */}
                                {/* <DailyBudget
                                    style={budgetStyle}
                                    month={this.state.monthFilter.value}
                                    year={this.state.yearFilter.value}
                                    state={this.state}
                                /> */}
                                {/* <IncomeMovement
                                    style={incomeMovementStyle}
                                    month={this.state.monthFilter.value}
                                    year={this.state.yearFilter.value}
                                    state={this.state}
                                />
                            </div>
                        </div>
                        
                        <div style={barChartContainer}>
                            <BarChart 
                                style={barChartStyle} 
                                month={this.state.monthFilter.value}
                                year={this.state.yearFilter.value}
                                state={this.state}
                                name={'expensesBarChart'}
                                color={'red'}
                            />
                        </div> */}
                        {/* <div style={topWorstContainer}>
                            <BarChart 
                                style={topStyle} 
                                storeNames={this.state.storeOptions}
                                stores={this.state.stores}
                                minDateFilter={this.state.startDate}
                                maxDateFilter={this.state.endDate}
                                countryFilter = {this.state.country.value}
                                dash={this.props.value} color={this.props.bulletColor}
                                state={this.state} lang={this.props.lang.value}  
                                sumType={this.state.sumType.value}
                                name={this.props.value + 'Top'}
                            />
                        </div>*/}
                    {/* </div>
                    <div style={heatMapContainer}>
                        <ExpenseCard 
                            style={{height: '71vh', paddingTop: '2vh'}} 
                            month={this.state.monthFilter.value}
                            year={this.state.yearFilter.value}
                            state={this.state}
                        />
                    </div> */}
                {/* </div>  */}
            </div>
        </div>
        );
    } else {
        return(
            <Auxiliary>
            <div className="gx-loader-view">
                <Loader />
            </div>
            </Auxiliary>
        );
    }
    }
}

export default AbsencesManager;
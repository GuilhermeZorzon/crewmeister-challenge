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
import Button from '@material-ui/core/Button';
import { createCalendar, addEvent, endCalendar } from '../util/functions/ics.js';
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
            members: new DataFrame([]),
            selectedCrewIds: [],
            selectedMembers: [],
            crewIdsOptions: [],
            membersOptions: [],
            fetchingICS: false
        };
    } 

    async componentDidMount() {
        let members = await axios.get(backendRoutes.localHost + backendRoutes.allMembers)
  
        let membersDataFrame = new DataFrame(members.data.result);
        let crewIds = membersDataFrame.distinct('crewId');

        let crewIdsOptions = [];
        crewIds.map(row => {
            crewIdsOptions.push({label: (row.get('crewId')), value: row.get('crewId')});
        });

        let membersOptions = [];
        membersDataFrame.map(row => {
            membersOptions.push({label: (row.get('userId') + ' - ' + row.get('name')), value: row.get('userId')});
        });

        this.setState({
            members: membersDataFrame,
            crewIdsOptions: crewIdsOptions,
            membersOptions: membersOptions,
            loadingData: false
        })
    }

    async downloadData() {
        this.setState({
          fetchingCSV: true
        });
    
        let usedUserIds = this.state.selectedMembers.length === 0 ? this.state.membersOptions : this.state.selectedMembers;
        let userIdsValues = getValues(usedUserIds);
    
        let parameters = {
          startDate: this.state.startDate, 
          endDate: this.state.endDate,
          userIds: userIdsValues
        };
    
        // Data filtered by user ids and dates
        let absences = await axios.get(backendRoutes.localHost + backendRoutes.absences,
            { params: parameters } 
        );
    
        let absencesDataFrame = new DataFrame(absences.data.result);
    
        // Truncate the mongo '_id' column
        let columnNamesAbsences = absencesDataFrame.listColumns().slice(1);
        
        // Ordering by date
        absencesDataFrame = absencesDataFrame.sortBy(['startDate']);
    
        absencesDataFrame = absencesDataFrame.restructure(columnNamesAbsences);
        console.log('csv absences', absencesDataFrame.restructure(columnNamesAbsences));
    
        this.setState({
          fetchingCSV: false
        });

        let calendar = createCalendar();
        let uid = 0; 
        absencesDataFrame.map(row => {
            // uid, dtStart, dtEnd, userName, absenceType, memberNote, admitterNote
            calendar += addEvent(uid, row.get('startDate'), row.get('endDate'), row.get('name'), row.get('type'), row.get('memberNote'), row.get('admitterNote'));
            uid += 1;
        })
        calendar += endCalendar();

        let MIME_TYPE = "text/ics";
        let blobStores = new Blob([calendar], {type: MIME_TYPE});
        let urlStores = window.URL.createObjectURL(blobStores)
        let absencesLink = document.createElement('a')
        absencesLink.setAttribute('hidden', '')
        absencesLink.setAttribute('href', urlStores)
        absencesLink.setAttribute('download', 'absences.ics')
        document.body.appendChild(absencesLink)
        absencesLink.click()
      }

  render() {
    const selectsContainer = {
        margin: '0.3vw auto 0 auto', 
        maxWidth: '70%', 
        display: 'flex', 
        justifyContent: 'space-between'
    }
    const dateSelect = {
        padding: '0.5vw', 
        flexBasis: '30%', 
        zIndex: 4
    }
    const membersSelect = {
        padding: '0.5vw', 
        flexBasis: '20%',
        zIndex: 4
    }
    const crewsSelect = {
        padding: '0.5vw', 
        flexBasis: '20%',
        zIndex: 4
    }
    const buttonStyle = {
        padding: '0.5vw 0vw 0.5vw 0.5vw', 
        flexBasis: '15%',
        backgroundColor: 'orange',
        color: 'white',
        maxHeight: '4vw',
    }

    let usedCrewIds = this.state.selectedCrewIds.length === 0 ? this.state.crewIdsOptions : this.state.selectedCrewIds;
    let usedCrewIdsValues = getValues(usedCrewIds)

    let crewsOptions = [];
    this.state.members.distinct('crewId').map(row => {
        crewsOptions.push({label: (row.get('crewId')), value: row.get('crewId')});
    });

    let membersOptions = [];
    this.state.members.where(row => usedCrewIdsValues.includes(row.get('crewId'))).map(row => {
        membersOptions.push({label: (row.get('userId') + ' - ' + row.get('name')), value: row.get('userId')});
    });

    if(this.state.loadingData === false) {
        return (
        <div className="gx-main-content">
            <div>
                <div style={selectsContainer}>
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
                                disabled={this.state.fetchingICS}
                            />
                        </ConfigProvider>
                    </div>
                    <div style={membersSelect}>
                        <MultiSelect 
                            value={this.state.selectedMembers} 
                            options={membersOptions}
                            placeholder={'Select members'}
                            onChange={(e) => {
                                let membersList = e === null ? [] : e;
                                this.setState({
                                    selectedMembers: membersList
                                })
                            }}
                            isDisabled={this.state.fetchingICS}
                        />
                    </div> 
                    <div style={crewsSelect}>
                        <MultiSelect 
                            value={this.state.selectedCrewIds} 
                            options={crewsOptions}
                            placeholder={'Select crews'}
                            onChange={(e) => {
                                let crewsList = e === null ? [] : e;
                                this.setState({
                                    selectedCrewIds: crewsList
                                })
                            }}
                            isDisabled={this.state.fetchingICS}
                        />
                    </div>
                    <Button style={buttonStyle} onClick={e => {this.downloadData()}} disabled={this.state.fetchingICS}>
                        {this.state.fetchingICS ? 'Downloading' : 'Export iCal file'}
                    </Button>
                </div>
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
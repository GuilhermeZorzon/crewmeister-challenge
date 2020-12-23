import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import DataFrame from 'dataframe-js';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'transparent',
  },
//   bullet: {
//     display: 'inline-block',
//     margin: '0 2px',
//     transform: 'scale(0.8)',
//   },
  title: {
    fontSize: 14,
  },
//   pos: {
//     marginBottom: 12,
//   },
});

class AbsenceCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
            cardsJson: [],
            open: false,
            row: '',
        };
	}

	componentDidMount() {
		this.getExpenses()
	}

	componentDidUpdate() {
		this.getExpenses()
	}

	shouldComponentUpdate(prevProps, prevState) {
        if(prevProps.state.open !== this.props.state.open || prevState.open !== this.state.open) {
			return true
		}
		// Stops it from rerendering infinitely because of setState inside getExpenses
		if(prevState.cardsJson.length === this.state.cardsJson.length && (prevProps.month === this.props.month && prevProps.year === this.props.year)) {
            return false
		} 
		else {
			return true
		}
	}

	async getExpenses() {
        let monthUsed = this.props.month
    
        if(monthUsed < 10) {
            monthUsed = '0' + this.props.month
        }

		let parameters = {
            minDate: this.props.year + '-' + monthUsed + '-' + '01 00:00:00', 
            maxDate: this.props.year + '-' + monthUsed + '-' + '31 23:59:59', 
        }

        let expensesCardsData = await axios.get('http://localhost:5000/api/expenses/myExpenses',
            { 
                params: parameters
            }
        )

		let expensesData = await this.aggregateData(new DataFrame(expensesCardsData.data.result))

        this.setState({
			cardsJson: expensesData
		})
	}

	async aggregateData(data) {
        let orderedData = data.sortBy('date') 

		let resultArr = orderedData.toCollection().map(row => {
			return row
        }) 

        return resultArr
    }
    
    async handleEdit(row) {
        console.log('editing row: ', row)
    }

    async handleOpenDelete(row) {
        console.log('row', row)
        await this.setState({
            open: true, 
            row: row
        })
        console.log('state', this.state)
    }

    async handleCloseWithoutDelete() {
        await this.setState({
            open: false
        })
    }

    async handleDelete() {
        let parameters = {
			id: this.state.row._id
        }
        
        let deleteExpense = await axios.delete('http://localhost:5000/api/expenses/myExpensesDelete',
		  { 
			params: parameters
		  }
        )
        this.getExpenses()
        this.setState({
            open: false
        })
    }

	render() {
        const buttonContainer = {
            padding: '0em 0em 0.5em 27em', 
            flexBasis: '5%', 
            zIndex: 4
        }
        const buttonStyle = {
            // backgroundColor: 'red',
            // color: 'red',
            width: '10%',
            height: '100%',
            maxWidth: '135.55px',
            maxHeight: '32.39px',
            // borderRadius: '6px',
            // border: '1px solid #bdc3c7',
            textTransform: 'none',
            padding: '0'
        }

		return (
            <div>
                {this.state.cardsJson.map(row => {
                    return (
                        <Card variant="outlined" style={{backgroundColor: 'transparent'}}>
                            <div style={{display: 'flex', flexDirection: 'row'}}>
                                <CardContent style={{paddingLeft: '3vw', minWidth: '20vw'}}>
                                    <Typography gutterBottom color="textSecondary" style={{fontSize: 12}}>
                                        {row.date.replace(/-/g, '/').slice(0,10)}
                                    </Typography>   
                                    <Typography gutterBottom style={{fontSize: 12, fontWeight: 'bold'}}>
                                        {row.category}
                                    </Typography>
                                    <Typography gutterBottom>
                                        {row.place}
                                    </Typography>
                                    {row.price > 0 ? 
                                        <Typography gutterBottom style={{color: '#ff3333', opacity: '0.8'}}>
                                            R$ {row.price}
                                        </Typography> 
                                        : 
                                        <Typography gutterBottom style={{color: '#009900', opacity: '0.8'}}>
                                            R$ {row.price * -1}
                                        </Typography>
                                    }
                                    {(row.type === 'credit' && row.parcel !== 9) ? 
                                        <Typography color="textSecondary" style={{fontSize: 12}}>
                                            {row.type} {(row.bank === 'bb') ? row.bank.toUpperCase() : 'Nu'} {row.parcel}
                                        </Typography>
                                        : 
                                        <Typography color="textSecondary" style={{fontSize: 12}}>
                                            {row.type} {(row.bank === 'bb') ? row.bank.toUpperCase() : 'Nu'}
                                        </Typography>
                                    }    
                                </CardContent>
                                <div style={{flexDirection: 'column', flexBasis: '20%'}}>
                                    <CardActions style={{paddingBottom: '5vh'}}>
                                        <IconButton onClick={e => {this.handleEdit(row)}}>
                                            <EditIcon/>
                                        </IconButton>
                                    </CardActions>
                                    <CardActions>
                                        <IconButton onClick={e => {this.handleOpenDelete(row)}}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </CardActions>
                                </div>
                            </div>
                        </Card>
                    )
                })}
                <Dialog 
                    open={this.state.open} 
                    onClose={this.state.open} 
                    aria-labelledby="form-dialog-title"
                >
                    <DialogContent style={{display: 'flex', flexDirection: 'column'}}>
                        <DialogContentText>
                            Are you sure you want to delete this expense?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Button onClick={e => {this.handleCloseWithoutDelete()}} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={e => {this.handleDelete()}} color="primary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
		);
	}
}

export default AbsenceCard;
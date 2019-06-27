import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, CardContent, CardActions, TextField, Button, Table, TableBody, TableHead, TableCell, TableRow, MenuItem, Grid} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {Chance} from 'chance';

const styles = {
	root: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	card: {
		margin: 'auto',
		marginTop: '30px',
		marginBottom: '40px',
		width: '75%',
	},
	table: {
		margin: 'auto',
		width: '75%',
	},
	text: {
		width: '150px',
	},
	select: {
		width: '100%',
	},
}

class MyParticipants extends Component{
	state = {
		participant: {
			first_name: '',
			last_name: '',
			age: '',
			gender: '',
			category: '',
			state: '',
			email_address: '',
			phone_number: '',
			url: '',
		},
		offender: {
			system_id: 0,
			offender_system_id: 0,
			felon: '',
			violent_offender: '',
			population_id: 0
		}
	}

	componentDidMount(){
		this.props.dispatch({type:'FETCH_PARTICIPANTS'})
		this.props.dispatch({type: 'FETCH_CATEGORY'})
		this.props.dispatch({type: 'FETCH_SYSTEM'})
		this.props.dispatch({type: 'FETCH_POPULATION'})
		this.generateLink();
	};//end componentDidMount

	generateLink = () => {
		//generate uniqure url invite link and assign to local state on page load
		let chance = new Chance();
		console.log('generateLink')
		let urlLink = chance.string({length: 12, pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'});
		console.log('urlLink:', urlLink)
		this.setState({
			participant:{
			...this.state.participant,
			url: urlLink}
		})
	};//end generateLink

	handleInputChange = propertyName => (event) => {
	    this.setState({
			participant:{
				...this.state.participant,
				[propertyName]: event.target.value,
			}
	    });
	};//end handleInputChange

	handleOffenderInput = propertyName => (event) => {
	    this.setState({
			offender:{
				...this.state.offender,
				[propertyName]: event.target.value,
			}
	    });
	};//end handleOffenderInput

	handleSubmit = () => {
		let chance = new Chance();
		let urlLink = chance.string({length: 12, pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'});
		console.log('urlLink:', urlLink)
		this.props.dispatch({type: 'ADD_PARTICIPANT', payload: this.state.participant, history: this.props.history, url: urlLink})
	};//end handleSubmit

	handleSubmitOffender = () => {
		let chance = new Chance();
		let urlLink = chance.string({length: 12, pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'});
		console.log('urlLink:', urlLink)
		this.props.dispatch({type: 'ADD_OFFENDER', payload: this.state, history: this.props.history, url: urlLink})
	};//end handleSubmit

	renderInputs = () =>{
		let input;
		if(this.state.participant.category === "Offender"){
			input =
			<>
			<br></br>
			Offender Data: 
			<br></br>
			<TextField required select margin="normal"
				label="System:" value={this.state.offender.offender_system_id} 
				onChange={this.handleInputChange('system')}>
					{this.props.system.map((system) => {
						return(
							<MenuItem key={system.id} value={system.system}>{system.system}</MenuItem>
						)
					})}
			</TextField>

			<TextField label="System:" type="number" onChange={this.handleOffenderInput('offender_system_id')}/>

			<TextField label="Population:" type="number" onChange={this.handleOffenderInput('population_id')}/>

			<TextField label="Felony?:" select margin="normal" onChange={this.handleOffenderInput('felon')} value={this.state.offender.felon}>
				<MenuItem value={true}>Yes</MenuItem>
				<MenuItem value={false}>No</MenuItem>
			</TextField>

			<TextField label="Violent Crime?:" select margin="normal" onChange={this.handleOffenderInput('violent_offender')} value={this.state.offender.violent_offender}>
				<MenuItem value={true}>Yes</MenuItem>
				<MenuItem value={false}>No</MenuItem>
			</TextField>

			<TextField label="System ID #:" onChange={this.handleOffenderInput('system_id')}/>
			</>
		}
		return input;
	};//end renderInputs

	viewParticipant = (id) =>{
		this.props.history.push(`/individualparticipant/${id}`)
	};//end viewParticipant

	render(){
		//console.log('this.state:', this.state)
		const {classes} = this.props;
		let submitButton;
		if(this.state.participant.first_name !== '' && this.state.participant.last_name !== ''
		&& this.state.participant.age !== '' && this.state.participant.gender !== '' && this.state.participant.category !== ''
		&& this.state.participant.category !== "Offender" && this.state.participant.state !== '' && this.state.participant.url !== ''){
			//console.log('OK to submit non offender')
			submitButton = <Button variant="contained" color="primary" onClick={this.handleSubmit}>Add Participant</Button>
		}else if(this.state.participant.first_name !== '' && this.state.participant.last_name !== '' && this.state.participant.url !== ''
		&& this.state.participant.age !== '' && this.state.participant.gender !== ''
		&& this.state.participant.category === "Offender" && this.state.participant.state !== 0
		&& this.state.offender.system_id !== 0 && this.state.offender.offender_system_id !== 0
		&& this.state.offender.felon !== '' && this.state.offender.violent_offender !== '' && this.state.offender.population_id !== 0){
			//console.log('OK to submit offender')
			submitButton = <Button variant="contained" color="primary" onClick={this.handleSubmitOffender}>Add Participant</Button>
		}else{
			//console.log('Not OK to submit participant yet')
			submitButton = <Button variant="contained" color="primary" disabled>Add Participant</Button>
		}
		return(
			<div className={classes.root}>
				<Card className={classes.card}>
					<CardContent>
						<h3>Add a Participant:</h3>
						{/* I made this h5 disclaimer because you have to use different Material-UI label things on text
						fields than on selects, and they of course are not styled the same so it looked weird... */}
						<h5>(Unless specified, all fields are required)</h5>
						<br></br>

						<TextField label="First Name:" onChange={this.handleInputChange('first_name')}/>

						<TextField label="Last Name:" onChange={this.handleInputChange('last_name')}/>

						<TextField label="Age:" type="number" onChange={this.handleInputChange('age')}/>

						<Grid>
						<TextField label="Gender:" select margin="normal" onChange={this.handleInputChange('gender')} value={this.state.participant.gender}>
							<MenuItem value="M">Male</MenuItem>
							<MenuItem value="F">Female</MenuItem>
							<MenuItem value="Other">Other</MenuItem>
							<MenuItem value="Prefer Not to Say">Prefer Not to Say</MenuItem>
						</TextField></Grid>

                        <TextField required select margin="normal"
							label="Category:" value={this.state.participant.category} 
							onChange={this.handleInputChange('category')}>
                                {this.props.category.map((category) => {
                                    return(
                                        <MenuItem key={category.id} value={category.category}>{category.category}</MenuItem>
                                    )
                                })}
                        </TextField>

						<TextField required select margin="normal"
							label="State:" value={this.state.participant.state} 
							onChange={this.handleInputChange('state')}>
								<MenuItem value=""><em>Select State</em></MenuItem>
								<MenuItem value="AL">Alabama</MenuItem>
								<MenuItem value="AK">Alaska</MenuItem>
								<MenuItem value="AZ">Arizona</MenuItem>
								<MenuItem value="AR">Arkansas</MenuItem>
								<MenuItem value="CA">California</MenuItem>
								<MenuItem value="CO">Colorado</MenuItem>
								<MenuItem value="CT">Connecticut</MenuItem>
								<MenuItem value="DE">Delaware</MenuItem>
								<MenuItem value="DC">District of Columbia</MenuItem>
								<MenuItem value="FL">Florida</MenuItem>
								<MenuItem value="GA">Georgia</MenuItem>
								<MenuItem value="HI">Hawaii</MenuItem>
								<MenuItem value="ID">Idaho</MenuItem>
								<MenuItem value="IL">Illinois</MenuItem>
								<MenuItem value="IN">Indiana</MenuItem>
								<MenuItem value="IA">Iowa</MenuItem>
								<MenuItem value="KS">Kansas</MenuItem>
								<MenuItem value="KY">Kentucky</MenuItem>
								<MenuItem value="LA">Louisiana</MenuItem>
								<MenuItem value="ME">Maine</MenuItem>
								<MenuItem value="MD">Maryland</MenuItem>
								<MenuItem value="MA">Massachusetts</MenuItem>
								<MenuItem value="MI">Michigan</MenuItem>
								<MenuItem value="MN">Minnesota</MenuItem>
								<MenuItem value="MS">Mississippi</MenuItem>
								<MenuItem value="MO">Missouri</MenuItem>
								<MenuItem value="MT">Montana</MenuItem>
								<MenuItem value="NE">Nebraska</MenuItem>
								<MenuItem value="NV">Nevada</MenuItem>
								<MenuItem value="NH">New Hampshire</MenuItem>
								<MenuItem value="NJ">New Jersey</MenuItem>
								<MenuItem value="NM">New Mexico</MenuItem>
								<MenuItem value="NY">New York</MenuItem>
								<MenuItem value="NC">North Carolina</MenuItem>
								<MenuItem value="ND">North Dakota</MenuItem>
								<MenuItem value="OH">Ohio</MenuItem>
								<MenuItem value="OK">Oklahoma</MenuItem>
								<MenuItem value="OR">Oregon</MenuItem>
								<MenuItem value="PA">Pennsylvania</MenuItem>
								<MenuItem value="PR">Puerto Rico</MenuItem>
								<MenuItem value="RI">Rhode Island</MenuItem>
								<MenuItem value="SC">South Carolina</MenuItem>
								<MenuItem value="SD">South Dakota</MenuItem>
								<MenuItem value="TN">Tennessee</MenuItem>
								<MenuItem value="TX">Texas</MenuItem>
								<MenuItem value="UT">Utah</MenuItem>
								<MenuItem value="VT">Vermont</MenuItem>
								<MenuItem value="VA">Virginia</MenuItem>
								<MenuItem value="VI">Virgin Islands</MenuItem>
								<MenuItem value="WA">Washington</MenuItem>
								<MenuItem value="WV">West Virginia</MenuItem>
								<MenuItem value="WI">Wisconsin</MenuItem>
								<MenuItem value="WY">Wyoming</MenuItem>
						</TextField>

						<TextField label="Email Address:" helperText="*Optional"
							onChange={this.handleInputChange('email_address')}/>

						<TextField label="Phone Number:" helperText="*Optional"
							onChange={this.handleInputChange('phone_number')}/>

						{this.renderInputs()}
					</CardContent>
					<CardActions>
						{submitButton}
					</CardActions>
				</Card>
	
	<h3>My Participants:</h3>
		<Table className={classes.table}>
			<TableHead>
				<TableRow>
					<TableCell>First Name</TableCell>
					<TableCell>Last Name</TableCell>
					<TableCell>Age</TableCell>
					<TableCell>Gender</TableCell>
					<TableCell>Category</TableCell>
					<TableCell>State</TableCell>
					<TableCell>Email Address</TableCell>
					<TableCell>Phone Number</TableCell>
					<TableCell>View/Edit Participant</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				{this.props.participant.map((person) => {
					return(
						<TableRow key={person.id}>
							<TableCell>{person.first_name}</TableCell>
							<TableCell>{person.last_name}</TableCell>
							<TableCell>{person.age}</TableCell>
							<TableCell>{person.gender}</TableCell>
							<TableCell>{person.category}</TableCell>
							<TableCell>{person.state}</TableCell>
							<TableCell>{person.email}</TableCell>
							<TableCell>{person.phone_number}</TableCell>
							<TableCell><Button variant="contained" color="primary" onClick={()=>this.viewParticipant(`${person.id}`)}>View/Edit</Button></TableCell>
						</TableRow>
					)
				})}
			</TableBody>
		</Table>
			</div>
		)
	}
}

const mapStateToProps = state => ({
  admin: state.admin,
  profile: state.profile,
  participant: state.participant,
  category: state.category,
  addParticipant: state.addParticipant,
  population: state.population,
  system: state.system,
});

export default withStyles(styles)(connect(mapStateToProps)(MyParticipants));
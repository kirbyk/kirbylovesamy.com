import React from 'react';


export default class RSVPModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      people: []
    };

    this.state.people = this.props.attendee.people.map((person) => ({
      name: person,
      status: 'Unknown'
    }));
  }

  componentWillReceiveProps(nextProps) {
    this.state.people = nextProps.attendee.people.map((person) => ({
      name: person,
      status: 'Unknown'
    }));

    this.setState(this.state);
  }

  toggleStatus(index) {
    var person = this.state.people[index];

    if (person.status !== 'Attending') {
      this.state.people[index].status = 'Attending';
    } else {
      this.state.people[index].status = 'Not Attending';
    }

    this.setState(this.state);
  }

  submit() {
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <h3 className='center primary-font'>
          { this.props.attendee.formatted }
        </h3>

        <br />

        <p className='center'>
          Please modify the attendee(s) below to reflect your RSVP.
        </p>

        <div className='row'>
          <div className='col-xs-8 col-xs-offset-2'>
            <ul className='list-group'>

              {this.state.people.map((person, index) => (
                <li className='list-group-item' key={index} onClick={ () => this.toggleStatus(index) }>
                  <span className='badge'>{ person.status }</span>
                  { person.name }
                </li>
              ))}

            </ul>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-6 col-xs-offset-3 center'>
            <input
              className='btn btn-default rsvp-submit'
              id='rsvp-submit'
              type='submit'
              value='Submit RSVP'
              onClick={ () => this.submit() }
            />
          </div>
        </div>
      </div>
    );
  }
}

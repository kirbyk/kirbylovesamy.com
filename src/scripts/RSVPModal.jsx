import React from 'react';


export default class RSVPModal extends React.Component {
  render() {
    console.log(this.props.attendee);
    return (
      <div>
        <h3 className='center'>
          Wedding Invitation for:
          <span id='attendee'></span>
        </h3>

        <p className='center'>
          Please modify the attendees below to reflect your RSVP.
        </p>

        <div className='row'>
          <div className='col-xs-8 col-xs-offset-2'>
            <ul className="list-group">
              <li className="list-group-item">
                <span className="badge">Unknown</span>
                Ben Alderfer
              </li>
            </ul>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-6 col-xs-offset-3 center'>
            <input className='btn btn-default contact-submit' id='rsvp-submit' type='submit' value='Submit RSVP' />
          </div>
        </div>
      </div>
    );
  }
}

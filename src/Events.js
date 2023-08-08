import React, { useEffect, useState } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get('http://3.110.1.123:8080/events/getallevents')
      .then((response) => {
        setEvents(response.data.reverse());
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="events">
      <h2 style={{ textAlign: 'center' }}>Events</h2>
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Image</th>
            <th scope="col">Event Name</th>
            <th scope="col">Event Date</th>
            <th scope="col">Event Timings</th>
            <th scope="col">Amount</th>
            <th scope="col">Seats Remaining</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {events.map((event, index) => (
            <tr key={event.id}>
              <td>{events.length - index}</td>
              <td>
                <img src={event.imageurl} alt={event.name} style={{ width: '100px' }} />
              </td>
              <td>
                {/* Link to the EventDetailsPage with the specific event id */}
                <Link to={`/events/${event.id}`}>{event.name}</Link>
              </td>
              <td>{new Date(event.date).toLocaleDateString()}</td>
              <td>{event.timings}</td>
              <td>{event.charges}</td>
              <td>{event.seatavalability}</td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
    </div>
  );
};

export default Events;

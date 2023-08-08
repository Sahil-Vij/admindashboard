import React, { useState } from 'react';
import axios from 'axios';
import { MDBInput, MDBRow, MDBCol } from 'mdb-react-ui-kit';

const AddEvent = () => {
  const [eventData, setEventData] = useState({
    name: '',
    imageurl: '',
    charges: '',
    date: '',
    timings: '',
    type: '',
    status: '',
    seatavalability: '',
    phonenumber: '',
    description: '',
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://3.110.1.123:8080/events/addevents', eventData);
      console.log(response.data);
      // Handle success, display a success message or redirect to another page
    } catch (error) {
      console.error(error);
      // Handle error, display an error message or perform other actions
    }
  };

  return (
    <div className="add-event-container">
      <h1 className="add-event-heading">Add Event</h1>

      <MDBRow>
        <MDBCol>
          <MDBInput
            id='nameInput'
            placeholder='Name'
            type='text'
            name='name'
            value={eventData.name}
            onChange={handleChange}
          />
        </MDBCol>
        <MDBCol>
          <MDBInput
            id='imageUrlInput'
            placeholder='Image URL'
            type='text'
            name='imageurl'
            value={eventData.imageurl}
            onChange={handleChange}
          />
        </MDBCol>
      </MDBRow>
      <br />
      <MDBRow>
        <MDBCol>
          <MDBInput
            id='chargesInput'
            placeholder='Charges'
            type='text'
            name='charges'
            value={eventData.charges}
            onChange={handleChange}
          />
        </MDBCol>
        <MDBCol>
          <MDBInput
            id='dateInput'
            placeholder='Date'
            type='text'
            name='date'
            value={eventData.date}
            onChange={handleChange}
          />
        </MDBCol>
        <MDBCol>
          <MDBInput
            id='timingsInput'
            placeholder='Timings'
            type='text'
            name='timings'
            value={eventData.timings}
            onChange={handleChange}
          />
        </MDBCol>
      </MDBRow>
      <br />
      <MDBRow>
        <MDBCol>
          <MDBInput
            id='typeInput'
            placeholder='Type'
            type='text'
            name='type'
            value={eventData.type}
            onChange={handleChange}
          />
        </MDBCol>
        <MDBCol>
          <MDBInput
            id='statusInput'
            placeholder='Status'
            type='text'
            name='status'
            value={eventData.status}
            onChange={handleChange}
          />
        </MDBCol>
        <MDBCol>
          <MDBInput
            id='seatAvailabilityInput'
            placeholder='Seat Availability'
            type='text'
            name='seatavalability'
            value={eventData.seatavalability}
            onChange={handleChange}
          />
        </MDBCol>
      </MDBRow>
      <br />
      <MDBRow>
        <MDBCol>
          <MDBInput
            id='phoneNumberInput'
            placeholder='Phone Number'
            type='text'
            name='phonenumber'
            value={eventData.phonenumber}
            onChange={handleChange}
          />
        </MDBCol>
        <MDBCol>
          <MDBInput
            id='descriptionInput'
            placeholder='Description'
            type='text'
            name='description'
            value={eventData.description}
            onChange={handleChange}
          />
        </MDBCol>
      </MDBRow>
      <br />
      <button type='submit' onClick={handleSubmit}>
        Add Event
      </button>
    </div>
  );
};

export default AddEvent;

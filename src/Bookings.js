import React, { useEffect, useState } from 'react';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [eventNameFilter, setEventNameFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    axios
      .get('http://3.110.1.123:8080/events/getallbookings')
      .then((response) => {
        setBookings(response.data.reverse());
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const resultsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const filteredBookings = bookings.filter((booking) => {
    if (startDate && endDate && eventNameFilter && nameFilter) {
      const bookingDate = new Date(booking.bookingDate);
      const startDateTime = new Date(startDate + 'T00:00:00');
      const endDateTime = new Date(endDate + 'T23:59:59');
      return (
        bookingDate >= startDateTime &&
        bookingDate <= endDateTime &&
        booking.eventName.toLowerCase() === eventNameFilter.toLowerCase() &&
        booking.name.toLowerCase() === nameFilter.toLowerCase()
      );
    } else if (startDate && endDate && eventNameFilter) {
      const bookingDate = new Date(booking.bookingDate);
      const startDateTime = new Date(startDate + 'T00:00:00');
      const endDateTime = new Date(endDate + 'T23:59:59');
      return (
        bookingDate >= startDateTime &&
        bookingDate <= endDateTime &&
        booking.eventName.toLowerCase() === eventNameFilter.toLowerCase()
      );
    } else if (startDate && endDate && nameFilter) {
      const bookingDate = new Date(booking.bookingDate);
      const startDateTime = new Date(startDate + 'T00:00:00');
      const endDateTime = new Date(endDate + 'T23:59:59');
      return (
        bookingDate >= startDateTime &&
        bookingDate <= endDateTime &&
        booking.name.toLowerCase() === nameFilter.toLowerCase()
      );
    } else if (eventNameFilter && nameFilter) {
      return (
        booking.eventName.toLowerCase() === eventNameFilter.toLowerCase() &&
        booking.name.toLowerCase() === nameFilter.toLowerCase()
      );
    } else if (startDate && endDate) {
      const bookingDate = new Date(booking.bookingDate);
      const startDateTime = new Date(startDate + 'T00:00:00');
      const endDateTime = new Date(endDate + 'T23:59:59');
      return bookingDate >= startDateTime && bookingDate <= endDateTime;
    } else if (eventNameFilter) {
      return booking.eventName.toLowerCase() === eventNameFilter.toLowerCase();
    } else if (nameFilter) {
      return booking.name.toLowerCase() === nameFilter.toLowerCase();
    }
    return true;
  });

  const totalResults = filteredBookings.length;
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = currentPage * resultsPerPage;
  const currentResults = filteredBookings.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bookings">
      <h2 style={{ textAlign: 'center' }}>Bookings</h2>
      <div>
        <div style={{paddingBottom:"2rem"}}></div>
        <label htmlFor="startDate">Start Date:&nbsp;</label>
        <input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        &nbsp;&nbsp;<label htmlFor="endDate">End Date:&nbsp;</label>
        <input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        &nbsp;&nbsp;<label htmlFor="eventNameFilter">Event Name:</label>
        <select id="eventNameFilter" value={eventNameFilter} onChange={(e) => setEventNameFilter(e.target.value)}>
          <option value="">All</option>
          {Array.from(new Set(bookings.map((booking) => booking.eventName))).map((eventName) => (
            <option key={eventName} value={eventName}>
              {eventName}
            </option>
          ))}
        </select>&nbsp;&nbsp;
        <label htmlFor="nameFilter">Name:&nbsp;</label>
        <input type="text" id="nameFilter" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
      </div>
      <div style={{paddingBottom:"2rem"}}></div>
      <MDBTable align="middle">
        <MDBTableHead>
          <tr>
            <th scope="col">Serial No.</th>
            <th scope="col">Event Name</th>
            <th scope="col">Booking Date</th>
            <th scope="col">Name</th>
            <th scope="col">Mobile Number</th>
            <th scope="col">Persons</th>
            <th scope="col">Total Amount</th>
            <th scope="col">Transaction ID</th>
          </tr>
        </MDBTableHead>
        <MDBTableBody>
          {currentResults.map((booking, index) => (
            <tr key={booking.transactionId}>
              <td>{totalResults - (startIndex + index)}</td>
              <td>{booking.eventName}</td>
              <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
              <td>{booking.name}</td>
              <td>{booking.mobile_no}</td>
              <td>{booking.persons}</td>
              <td>{booking.totalAmount}</td>
              <td>{booking.transactionId}</td>
            </tr>
          ))}
        </MDBTableBody>
      </MDBTable>
      <div style={{ marginBottom: '1rem' }}></div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Bookings;

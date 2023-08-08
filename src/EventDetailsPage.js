import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

const EventDetailsPage = () => {
  const { recId } = useParams();
  const [event, setEvent] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const[seats,setSeats]=useState(0);
  const[loading,setLoading]=useState(false);
  const[money,setMoney]=useState(0);
  const [newExpense, setNewExpense] = useState({
    name_of_expense: '',
    price: 0,
    type_of_expense: '',
  });
  
  useEffect(() => {
    fetchEventDetails();
    fetchExpenses();
    
  }, [recId]);

  // Fetch event details
  const fetchEventDetails = () => {
    axios
      .get(`http://localhost:8080/events/getallevents`)
      .then((response) => {
        setEvent(response.data[recId - 1]);
        console.log("events",event)
        
        setLoading(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };
 
  // Fetch expenses
  const fetchExpenses = () => {
    axios
      .get(`http://localhost:8080/events/getallexpenses?recId=${recId}`)
      .then((response) => {
        setExpenses(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const calculateTotalExpenses = () => {
    let total = 0;
    console.log("eve2",event);
    //console.log("eve3",event.seatavalability);
    expenses.forEach((expense) => {
      if (expense.type_of_expense === 'individual') {
        total += expense.price * (12 - event.seatavalability);
        
      } else {
        total += expense.price;
      }
    });
    // setMoney(total);
    return total;
  };

  // const calculateProfit = () => {
  //   let total = 0;
  //   console.log("eve2",event);
  //   //console.log("eve3",event.seatavalability);
  //   total=event.charges*(12 - event.seatavalability);
  //   return total;
  // };


  // Handle form submission to add a new expense
  const handleAddExpense = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/events/addexpenses`, {
        ...newExpense,
        event_id: recId,
      })
      .then((response) => {
        console.log('Expense added successfully:', response.data);
        // Refresh the expenses table after adding the expense
        fetchExpenses();
        // Clear the form fields
        setNewExpense({
          name_of_expense: '',
          price: 0,
          type_of_expense: '',
        });
      })
      .catch((error) => {
        console.error('Error adding expense:', error);
      });
  };

  return (
    <div className="event-details">
      {event ? (
       
        <>
          <h2 style={{ textAlign: 'center', paddingTop: '10px' }}>{event.name}</h2>
          <div style={{ paddingTop: '25px' }}>
            <p><b>Charges:</b> Rs. {event.charges}</p>
            <p><b>Date:</b> {new Date(event.date).toLocaleDateString()}</p>
            <p><b>Seats Booked:</b> {12 - event.seatavalability}</p>
            
          </div>
        </>
      ) : (
        <p>Loading event details...</p>
      )}

      {/* Add Expense Form */}
      <div style={{ marginBottom: '20px',paddingTop:'25px' }}>
        <h3>Add Expenses</h3>
        <form onSubmit={handleAddExpense}>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
            <label htmlFor="name_of_expense">Name of Expense:</label>
            <input
              type="text"
              id="name_of_expense"
              value={newExpense.name_of_expense}
              onChange={(e) =>
                setNewExpense({ ...newExpense, name_of_expense: e.target.value })
              }
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              value={newExpense.price}
              onChange={(e) => setNewExpense({ ...newExpense, price: e.target.value })}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
            <label htmlFor="type_of_expense">Type of Expense:</label>
            <input
              type="text"
              id="type_of_expense"
              value={newExpense.type_of_expense}
              onChange={(e) =>
                setNewExpense({ ...newExpense, type_of_expense: e.target.value })
              }
            />
          </div>
          <button type="submit" style={{ padding: '8px 12px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
            Add Expense
          </button>
        </form>
      </div>      {/* Expenses Table */}
      <MDBTable align="middle" style={{ paddingTop: '25px' }}>
  {/* Table Head */}
  <MDBTableHead>
    <tr>
      <th scope="col">S.No</th>
      <th scope="col">Name of Expense</th>
      <th scope="col">Price</th>
      <th scope="col">Type of Expense</th>
    </tr>
  </MDBTableHead>

  {/* Table Body */}
  <MDBTableBody>
    {expenses.map((expense, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{expense.name_of_expense}</td>
          <td>Rs. {expense.price}</td>
          <td>{expense.type_of_expense}</td>
        </tr>
      );
    })}
  </MDBTableBody>
</MDBTable>
<div style={{ paddingTop: '25px' }}>
        <p>
          <b>Total Expenses:</b> Rs. {calculateTotalExpenses()}
        </p>
        <p>
          <b> total booking:</b> 
        </p>
      </div>
</div>
    
  );
  
};

export default EventDetailsPage;


import React, { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard.js';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupingOption] = useState(() => localStorage.getItem('groupingOption') || 'status');
  const [sortingOption] = useState(() => localStorage.getItem('sortingOption') || 'priority');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
      const data = await response.json();
      setTickets(data.tickets);
      setUsers(data.users);
    };
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('groupingOption', groupingOption);
    localStorage.setItem('sortingOption', sortingOption);
  }, [groupingOption, sortingOption]);

  return (
    <div>
      {/* <Dropdown setGroupingOption={setGroupingOption} setSortingOption={setSortingOption} /> */}
      <KanbanBoard tickets={tickets} groupingOption={groupingOption} sortingOption={sortingOption} users={users} />
    </div>
  );
};

export default App;

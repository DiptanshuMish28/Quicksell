// Dropdown.js
import React from 'react';

const Dropdown = ({ setGroupingOption, setSortingOption }) => {
  return (
    <div>
      <label>Group by: </label>
      <select onChange={(e) => setGroupingOption(e.target.value)}>
        <option value="status">Status</option>
        <option value="user">User</option>
        <option value="priority">Priority</option>
      </select>

      <label>Sort by: </label>
      <select onChange={(e) => setSortingOption(e.target.value)}>
        <option value="priority">Priority</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
};

export default Dropdown;

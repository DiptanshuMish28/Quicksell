import React, { useState, useRef, useEffect } from 'react';
import TicketCard from './TicketCard';
import './KanbanBoard.css'; // assets maih hai
import DisplayIcon from '../Icons/Display.svg'; 
import DownIcon from '../Icons/down.svg';
import AddIcon from '..add.svg'; 
import MenuIcon from '../Icons/'; 
import BacklogIcon from '../Icons/Backlog.svg';
import TodoIcon from '../Icons/To-do.svg';
import InProgressIcon from '../Icons/in-progress.svg';
import DoneIcon from '../Icons/Done.svg';
import CancelledIcon from '../Icons/Cancelled.svg';
import NoPriorityIcon from '../Icons/No-priority.svg';
import LowPriorityIcon from '../Icons/Img - Low Priority.svg';
import MediumPriorityIcon from '../Icons/Img - Medium Priority.svg';
import HighPriorityIcon from '../Icons/Img - High Priority.svg';
import UrgentPriorityIcon from '../Icons/SVG - Urgent Priority colour.svg';

const statuses = ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'];
const priorityLabels = {
  0: { label: 'No priority', icon: NoPriorityIcon },
  1: { label: 'Low', icon: LowPriorityIcon },
  2: { label: 'Medium', icon: MediumPriorityIcon },
  3: { label: 'High', icon: HighPriorityIcon },
  4: { label: 'Urgent', icon: UrgentPriorityIcon },
};

const priorityOrder = [0, 4, 3, 2, 1];

const groupTickets = (tickets, groupingOption, users) => {
  const groups = {};

  if (groupingOption === 'status') {
    statuses.forEach(status => {
      groups[status] = tickets.filter(ticket => ticket.status === status);
    });
  } else if (groupingOption === 'user') {
    users.forEach(user => {
      groups[user.name] = tickets.filter(ticket => ticket.userId === user.id);
    });
  } else if (groupingOption === 'priority') {
    priorityOrder.forEach(priority => {
      groups[priorityLabels[priority].label] = tickets.filter(ticket => ticket.priority === priority);
    });
  }

  return groups;
};

const sortTickets = (tickets, sortingOption) => {
  if (sortingOption === 'priority') {
    return tickets.sort((a, b) => {
      return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
    });
  } else if (sortingOption === 'title') {
    return tickets.sort((a, b) => a.title.localeCompare(b.title));
  }
  return tickets;
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'Backlog':
      return BacklogIcon;
    case 'Todo':
      return TodoIcon;
    case 'In progress':
      return InProgressIcon;
    case 'Done':
      return DoneIcon;
    case 'Cancelled':
      return CancelledIcon;
    default:
      return null;
  }
};

const getUserInitials = (userName) => {
  return userName.charAt(0).toUpperCase();
};

const KanbanBoard = ({ tickets, users }) => {
    const [groupingOption, setGroupingOption] = useState('status');
    const [sortingOption, setSortingOption] = useState('priority');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setDropdownVisible(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  
    const groupedTickets = groupTickets(tickets, groupingOption, users);
  
    return (
      <div style={{width: '100%'}}>
        <div className="display-dropdown" ref={dropdownRef}>
          <div className="button-container">
            <button 
              className="display-button" 
              onClick={() => setDropdownVisible(!dropdownVisible)}
            >
              <img src={DisplayIcon} alt="Display" />
              <span>Display</span>
              <img src={DownIcon} alt="Down Arrow" className="down-arrow-icon" />
            </button>
          </div>
          {dropdownVisible && (
            <div className="dropdown-content">
              <div className="dropdown-item">
                <label>Grouping</label>
                <select value={groupingOption} onChange={(e) => setGroupingOption(e.target.value)}>
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
              <div className="dropdown-item">
                <label>Ordering</label>
                <select value={sortingOption} onChange={(e) => setSortingOption(e.target.value)}>
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          )}
    </div>


      <div className="kanban-board">
        {Object.keys(groupedTickets).map(group => (
          <div key={group} className="kanban-column">
            <div className="kanban-header">
              <div className="kanban-title">
                {groupingOption === 'priority' ? (
                  <>
                    <img src={priorityLabels[priorityOrder.find(p => priorityLabels[p].label === group)].icon} alt={group} className="icon" />
                    <span>{group}</span>
                    <span className="card-count">{groupedTickets[group].length}</span>
                  </>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {groupingOption === 'user' ? (
                      <>
                        <div className="user-icon">
                          {getUserInitials(group)}
                          <span className={`availability-dot ${users.find(user => user.name === group)?.available ? 'available' : 'unavailable'}`}></span>
                        </div>
                        <span>{group}</span>
                        <span className="card-count">{groupedTickets[group].length}</span>
                      </>
                    ) : (
                      <>
                        <img src={getStatusIcon(group)} alt={group} className="icon" />
                        <span>{group}</span>
                        <span className="card-count">{groupedTickets[group].length}</span>
                      </>
                    )}
                  </div>
                )}
              </div>
              <div className="kanban-actions">
                <img src={AddIcon} alt="Add" className="action-icon" />
                <img src={MenuIcon} alt="Menu" className="action-icon" />
              </div>
            </div>
            {sortTickets(groupedTickets[group], sortingOption).map(ticket => (
                <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    users={users}
                    showUserIcon={groupingOption !== 'user'}
                    hidePriorityIcon={groupingOption === 'priority'} // Pass the hidePriorityIcon prop
                    hideStatusIcon={groupingOption === 'status'} // Pass the hideStatusIcon prop
                />
            ))}


          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;

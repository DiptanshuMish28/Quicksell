/* TicketCard.js */

import React from 'react';
import './TicketCard.css';
import UrgentPriorityIcon from '../Icons/SVG - Urgent Priority grey.svg';
import NoPriorityIcon from '../Icons/No-priority.svg';
import LowPriorityIcon from '../Icons/Img - Low Priority.svg';
import MediumPriorityIcon from '../Icons/Img - Medium Priority.svg';
import HighPriorityIcon from '../Icons/Img - High Priority.svg';

import BacklogIcon from '../Icons/Backlog.svg';
import TodoIcon from '../Icons/To-do.svg';
import InProgressIcon from '../Icons/in-progress.svg';
import DoneIcon from '../Icons/Done.svg';
import CancelledIcon from '../Icons/Cancelled.svg';

const statusIcons = {
  Backlog: BacklogIcon,
  Todo: TodoIcon,
  "In progress": InProgressIcon,
  Done: DoneIcon,
  Cancelled: CancelledIcon,
};

const getPriorityIcon = (priority) => {
  switch (priority) {
    case 0:
      return NoPriorityIcon;
    case 1:
      return LowPriorityIcon;
    case 2:
      return MediumPriorityIcon;
    case 3:
      return HighPriorityIcon;
    case 4:
      return UrgentPriorityIcon;
    default:
      return null;
  }
};

const TicketCard = ({ ticket, users, showUserIcon, hidePriorityIcon, hideStatusIcon }) => {
    const user = users.find(u => u.id === ticket.userId);
    const statusIcon = statusIcons[ticket.status];

    return (
        <div className="ticket-card">
            <div className="ticket-header">
                <span className="ticket-id">{ticket.id}</span>
                {showUserIcon && user && (
                    <div className="user-icon">
                        {getUserInitials(user.name)}
                        <span className={`availability-dot ${user.available ? 'available' : 'unavailable'}`}></span>
                    </div>
                )}
            </div>
            <div className="ticket-title-container">
                {!hideStatusIcon && (
                    <img src={statusIcon} alt="Status" className="status-icon" />
                )}
                <p className="ticket-title">{ticket.title}</p>
            </div>
            <div className="priority-section">
                {!hidePriorityIcon && (
                    <img src={getPriorityIcon(ticket.priority)} alt="Priority" className="priority-icon" />
                )}
                {ticket.tag && ticket.tag.length > 0 && (
                    <span className='feature-tag'>
                        <span className="grey-dot"></span>
                        <span className="ticket-tag">{ticket.tag[0]}</span>
                    </span>
                )}
            </div>
        </div>
    );
};

const getUserInitials = (userName) => {
  return userName.charAt(0).toUpperCase();
};

export default TicketCard;

import React from 'react';


function NavBar() {
    return (
        <div className="navbar">
            <span className="taskBoardName">Planner Clone</span>
            <button className='buttons'>Add New Column</button>
            {/* <div className='buttons'>
            <button className="membersBtn">Members</button>
            <button className="filtersBtn">Filters</button>
            </div> */}
        </div>
    );
}

export default NavBar;

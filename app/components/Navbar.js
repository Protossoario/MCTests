import React from 'react';
import {Link} from 'react-router';

class Navbar extends React.Component {
    render() {
        return (
            <nav className='navbar navbar-default navbar-static-top'>
                <div className='navbar-header'>
                    {/* Shown only in smaller screens to make the navbar collapsable for mobile */}
                    <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link to='/' className='navbar-brand'><small><i className="glyphicon glyphicon-list-alt" style={{ color: '#cc0000' }}></i></small> MCT</Link>
                </div>
                <div id='navbar' className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/addTest'>Add Test</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;

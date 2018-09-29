import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import moment from 'moment';


const ExpenseListItem = ({id,description,amount,createdAt}) =>{

   return (
    <div>
        <Link to={`/edit/${id}`} ><h3>{description} </h3></Link>
        <p>{amount/100} - {moment(createdAt).format('DD/MM/YY')} -
        {description}</p>
    </div>
   );
 };


export default ExpenseListItem;
import React from 'react';
import { shallow } from 'enzyme';
import ExpensifyDashboardPage from '../../components/Dashboard';

test('should render dashboard',()=>{
   
    const wrapper = shallow(<ExpensifyDashboardPage />);
    
    expect(wrapper).toMatchSnapshot();
});

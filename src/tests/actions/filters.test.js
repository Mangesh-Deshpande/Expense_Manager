import moment from 'moment';
import { setStartDate , setEndDate, sortByDate ,sortByAmount ,setTextFilter} from '../../actions/filters';

// Test for set start date
test('should generate set start date action object',()=>{
    
    const action = setStartDate(moment(0));
    
    expect(action).toEqual({
        type:'SET_START_DATE',
        startDate:moment(0)
    });
})

// Test for set end date
test('should generate set end date action object',()=>{
   
    const action = setEndDate(moment(0));
    
    expect(action).toEqual({
        type:'SET_END_DATE',
        endDate:moment(0)
    });
})

// Test for sort by date
test('should generate sort by date action object',()=>{
    expect(sortByDate()).toEqual({ type:'SORT_BY_DATE'})
});

// Test for sort by amount
test('should generate sort by amount action object',()=>{
    expect(sortByAmount()).toEqual({ type:'SORT_BY_AMOUNT'})
});

// Test for Text filter with value passed
test('should generate text filter action object',()=>{
    const action= setTextFilter('abc');
    expect(action).toEqual({
        type:'SET_TEXT_FILTER',
        text:'abc'
    })
})

// Test for set Text filter with no value
test('should generate set text filter action objct with default',()=>{
    const action = setTextFilter();
    expect(action).toEqual({
        type:'SET_TEXT_FILTER',
        text:''
    })
})
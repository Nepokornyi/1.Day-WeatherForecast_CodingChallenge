const result = document.getElementById('result');
const btn = document.querySelector('.check');


btn.addEventListener('click', () => {
    let date1 = document.getElementById('date-1').value;
    let date2 = document.getElementById('date-2').value;

    if(date1.length == 0  || date2.length == 0) {
        result.innerHTML = '<span>Please enter valid dates</span>';
    }
    else{
        if(date1 > date2) {
            result.innerHTML = 'First Date is greater than Second Date';
        }
        else if(date1 == date2) {
            result.innerHTML = 'Dates are equal'
        }
        else if(date1 < date2) {
            result.innerHTML = 'Second Date is greater than First Date'
        }
    }
})
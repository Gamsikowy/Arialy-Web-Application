const plannedRevClass = document.querySelector('.pl-rev-class');
const plannedExpClass = document.querySelector('.pl-exp-class');
const realRevClass = document.querySelector('.rl-rev-class');
const realExpClass = document.querySelector('.rl-exp-class');
const plannedMonthlyDest = document.querySelector('.mon-dest-class-pl');
const plannedAnnualRev = document.querySelector('.an-rev-class-pl');
const plannedAnnualExp = document.querySelector('.an-exp-class-pl');
const plannedAnnualDest = document.querySelector('.an-dest-class-pl');
const realMonthlyDest = document.querySelector('.mon-dest-class-rl');
const realAnnualRev = document.querySelector('.an-rev-class-rl');
const realAnnualExp = document.querySelector('.an-exp-class-rl');
const realAnnualDest = document.querySelector('.an-dest-class-rl');
const logoNavigate = document.querySelector('.logo-navigate');
const ulNavChildren = document.querySelectorAll('.ul-navbar form');
const catHeaders = document.querySelectorAll('.cat-header');
const saveBtn = document.querySelector('.save-btn');

// navigation buttons
ulNavChildren.forEach(child => {
    child.addEventListener('click', () => {
        child.submit();
    });
});

logoNavigate.addEventListener('click', () => {
    logoNavigate.submit();
});

// creating a chart of earnings consists in filling in the fields concerning the spheres of life
// or the previously added amount of money
const chartDataManagement = () => {
    let chartData = new Array(12).fill(0);
    const dynamicCouns = document.querySelectorAll('.dynamicCoun');

    dynamicCouns.forEach(dynamicCoun => {
        let counter = +dynamicCoun.dataset.counter;
        switch (true) {
            case (counter >= 1 && counter <= 5):
                const dynamicResultFood = document.querySelector('.dynamic-result-food');
                chartData[0] += +dynamicCouns[counter - 1].value;
                dynamicResultFood.value = +dynamicCouns[counter - 1].value;
                break;
            case (counter > 5 && counter <= 15):
                const dynamicResultFlatHouse = document.querySelector('.dynamic-result-flat-house');
                chartData[1] += +dynamicCouns[counter - 1].value;
                dynamicResultFlatHouse.value = +dynamicCouns[counter - 1].value;
                break;
            case (counter > 15 && counter <= 21):
                const dynamicResultTransport = document.querySelector('.dynamic-result-transport');
                chartData[2] += +dynamicCouns[counter - 1].value;
                dynamicResultTransport.value = +dynamicCouns[counter - 1].value;
                break;
            case (counter > 21 && counter <= 26):
                const dynamicResultTelecommunication = document.querySelector('.dynamic-result-telecommunication');
                chartData[3] += +dynamicCouns[counter - 1].value;
                dynamicResultTelecommunication.value = +dynamicCouns[counter - 1].value;
                break;
            case (counter > 26 && counter <= 30):
                const dynamicResultHealthcare = document.querySelector('.dynamic-result-healthcare');
                chartData[4] += +dynamicCouns[counter - 1].value;
                dynamicResultHealthcare.value = +dynamicCouns[counter - 1].value;
                break; 
            case (counter > 30 && counter <= 36):
                const dynamicResultClothes = document.querySelector('.dynamic-result-clothes');
                chartData[5] += +dynamicCouns[counter - 1].value;
                dynamicResultClothes.value = +dynamicCouns[counter - 1].value;
                break;   
            case (counter > 36 && counter <= 41):
                const dynamicResultHygiene = document.querySelector('.dynamic-result-hygiene');
                chartData[6] += +dynamicCouns[counter - 1].value;
                dynamicResultHygiene.value = +dynamicCouns[counter - 1].value;
                break;    
            case (counter > 41 && counter <= 47):
                const dynamicResultFlatChildren = document.querySelector('.dynamic-result-children');
                chartData[7] += +dynamicCouns[counter - 1].value;
                dynamicResultFlatChildren.value = +dynamicCouns[counter - 1].value;
                break; 
            case (counter > 47 && counter <= 54):
                const dynamicResultEntertainment = document.querySelector('.dynamic-result-entertainment');
                chartData[8] += +dynamicCouns[counter - 1].value;
                dynamicResultEntertainment.value = +dynamicCouns[counter - 1].value;
                break; 
            case (counter > 54 && counter <= 62):
                const dynamicResultOtherExpenses = document.querySelector('.dynamic-result-other-expenses');
                chartData[9] += +dynamicCouns[counter - 1].value;
                dynamicResultOtherExpenses.value = +dynamicCouns[counter - 1].value;
                break; 
            case (counter > 62 && counter <= 68):
                const dynamicResultDebtRepayment = document.querySelector('.dynamic-result-debt-repayment');
                chartData[10] += +dynamicCouns[counter - 1].value;
                dynamicResultDebtRepayment.value = +dynamicCouns[counter - 1].value;
                break; 
            case (counter > 68 && counter <= 75):
                const dynamicResultSavings = document.querySelector('.dynamic-result-savings');
                chartData[11] += +dynamicCouns[counter - 1].value;
                dynamicResultSavings.value = +dynamicCouns[counter - 1].value;
                break;
            default:
                return;
        }
    });
    return chartData;
};

// calculation of monthly / annual expenses / revenues
const updateMonOutput = () => {
    let annualRev = 12 * +plannedRevClass.value;
    let annualExp = 12 * +plannedExpClass.value;
    let difference = plannedRevClass.value - plannedExpClass.value;
    let annualDifference = annualRev - annualExp;
    plannedMonthlyDest.value = difference;
    plannedAnnualRev.value = annualRev;
    plannedAnnualExp.value = annualExp;
    plannedAnnualDest.value = annualDifference;
};

const updateAnnOutput = () => {
    let annualRev = 12 * realRevClass.value;
    let annualExp = 12 * realExpClass.value;
    let difference = realRevClass.value - realExpClass.value;
    let annualDifference = annualRev - annualExp;
    realMonthlyDest.value = difference;
    realAnnualRev.value = annualRev;
    realAnnualExp.value = annualExp;
    realAnnualDest.value = annualDifference;
};

plannedRevClass.addEventListener('change', () => { updateMonOutput() });

plannedExpClass.addEventListener('change', () => { updateMonOutput() });

realExpClass.addEventListener('change', () => { updateAnnOutput() });

realExpClass.addEventListener('change', () => { updateAnnOutput() });

// change page title
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = 'Come back to us';
    } else {
        document.title = 'Arialy - Your Trusted Banking';
    }
});

// support for showing / hiding form
catHeaders.forEach(catHeader => {
    catHeader.addEventListener('click', () => {
        let sybling = catHeader.nextElementSibling;
        let syblingStyles = catHeader.nextElementSibling.style;
        let height = sybling.scrollHeight + 'px';
        sybling.classList.toggle('visible');
        if (sybling.classList.contains('visible')) {
            syblingStyles.height = height;
        } else {
            syblingStyles.height = '0px';
        }
    });
});

saveBtn.addEventListener('click', () => {
        let chartData = chartDataManagement();
        const overall = document.querySelectorAll('.overall input');
        
        for (let i = 0; i < 12; i++) overall[i].value = chartData[i];

        // handling with Chart.js
        let myChart = document.getElementById('myChart').getContext('2d');

        Chart.defaults.global.defaultFontFamily = 'Open Sans';
        Chart.defaults.global.defaultFontSize = 16;
        Chart.defaults.global.defaultFontColor = '#000';
        
        //let summaryChart = new Chart(myChart, {
        new Chart(myChart, {
            type: 'pie',
            data: {
            labels: ['Food', 'Flat / House', 'Transport', 'Telecommunication', 'Healthcare', 'Clothes', 
                        'Hygiene', 'Children', 'Entertainment', 'Other', 'Debt repaymet', 'Savings'],
            datasets: [{
                label: 'Your finances',
                data: chartData,
                backgroundColor: [
                '#9866E9', '#00899D', '#F9F871', '#B0A8B9', '#E74A32','#00A1F1', 
                '#B91C32', '#67D1B2', '#508078', '#007D50', '#FF8A89','#E6AFDA'
                ],
                borderWidth: 1,
                borderColor: '#000',
                hoverBorderWidth: 2
                }]
            },
            options: {
            responsive: true,
            title: {
                display: true,
                text: 'Expenses chart:',
                fontSize: 24
            },
            legend: {
                display: true,
                position: 'right',
                align: 'center',
                labels: {
                fontColor:'#000'
                }
            },
            layout:{
                padding:{
                left: 0,
                right: 0,
                bottom: 0,
                top: 0
                }
            },
            tooltips:{
                enabled: true
            }
        }
        });
    });
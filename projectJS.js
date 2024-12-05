const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];
const mealTypes = {
    BREAKFAST: 'breakfast', 
    FIRST_SNACK: 'first_snack', 
    LUNCH: 'lunch', 
    SECOND_SNACK: 'second_snack', 
    DINNER: 'dinner'
};

function isEmailValid(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
}

function getMealName(mealType) {
    switch(mealType.trim().toUpperCase()) {
        case 'BREAKFAST':
            return 'Breakfast';
        case 'FIRST_SNACK':
        case 'SECOND_SNACK':
            return 'Snack';
        case 'LUNCH':
            return 'Lunch';
        case 'DINNER':
            return 'Dinner';
        default:
            return '';    
    }
}

function getMeal(day, mealType) {
    switch(day) {
        case 'MONDAY':
            return document.getElementById(`mon_${mealType}`).value;
        case 'TUESDAY':
            return document.getElementById(`tue_${mealType}`).value;
        case 'WEDNESDAY':
            return document.getElementById(`wed_${mealType}`).value;
        case 'THURSDAY':
            return document.getElementById(`thu_${mealType}`).value;
        case 'FRIDAY':
            return document.getElementById(`fri_${mealType}`).value;
        case 'SATURDAY':
            return document.getElementById(`sat_${mealType}`).value;
        case 'SUNDAY':
            return document.getElementById(`sun_${mealType}`).value;
        default:
            return '';    
    }
}

function hideOrShowSubmitError(isAllValid) {
    if(isAllValid) {
        document.getElementById('submit_error').setAttribute('class', 'no_error');
    } else {
        document.getElementById('submit_error').setAttribute('class', 'error');
    }
}

function hideOrShowEmailError(isEmailValid) {
    if(isEmailValid) {
        document.getElementById('email_error').setAttribute('class', 'no_error');
    } else {
        document.getElementById('email_error').setAttribute('class', 'error');
    }
}

function hideOrShowNameError(isEmailValid) {
    if(isEmailValid) {
        document.getElementById('name_error').setAttribute('class', 'no_error');
    } else {
        document.getElementById('name_error').setAttribute('class', 'error');
    }
}

function hideOrShowGoalError(isEmailValid) {
    if(isEmailValid) {
        document.getElementById('goal_error').setAttribute('class', 'no_error');
        document.getElementById('submit_error').setAttribute('class', 'no_error');
    } else {
        document.getElementById('goal_error').setAttribute('class', 'error');
        document.getElementById('submit_error').setAttribute('class', 'error');
    }
}

function generateFlyWindowMealPlanHTML(isEmailValid) {
    if (isEmailValid) {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const goal = document.getElementById('goal').value;

        const meals = {
            breakfast: days.map(day => getMeal(day, mealTypes.BREAKFAST)),
            first_snack: days.map(day => getMeal(day, mealTypes.FIRST_SNACK)),
            lunch: days.map(day => getMeal(day, mealTypes.LUNCH)),
            second_snack: days.map(day => getMeal(day, mealTypes.SECOND_SNACK)),
            dinner: days.map(day => getMeal(day, mealTypes.DINNER)),
        };

        let flyWindowHTML = `
        <html>
            <head>
                <title>Meal Plan for ${name}</title>
                <style type="text/css" media="print"> 
                    @page { 
                        size: landscape; 
                    } 
                </style>
                <style>
                    body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    }
                    
                    textarea {
                        white-space: pre-wrap;
                        display: block;
                        resize: none;
                        min-height: 100px;
                        width: inherit;
                        height: 100%;
                        background-color: #ffffff;
                        overflow: hidden;
                    }
                    
                    .odd_col {
                        background-color: rgb(230, 230, 230);
                        padding: 5px;
                        margin: 0px;
                    }

                    .even_col {
                        background-color: rgb(212, 212, 212);
                        padding: 5px;
                        margin: 0px;
                    }

                    h2 {
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <h2>Weekly Meal Plan</h2>

                <p>
                    <b>${name}</b><br/>
                    <b>${email}</b><br/><br/>
                    Goal for the Week: <b>${goal}</b>
                </p>

                <table cellspacing="0">`;

        let colIndex = 0;
        let rowIndex = 0;
        
        flyWindowHTML += `
                    <tr>
                        <th class="odd_col">Monday</th>
                        <th class="even_col">Tuesday</th>
                        <th class="odd_col">Wednesday</th>
                        <th class="even_col">Thursday</th>
                        <th class="odd_col">Friday</th>
                        <th class="even_col">Saturday</th>
                        <th class="odd_col">Sunday</th>
                    </tr>`;

        Object.values(mealTypes).forEach(mealType => {
            flyWindowHTML += `<tr>`;
            colIndex = 0;

            meals[mealType].forEach(meal => {
                flyWindowHTML += `<td class="${colIndex % 2 === 0 ? 'odd_col' : 'even_col'}">${getMealName(mealType)}<br/><textarea class="textarea_row_${rowIndex}" disabled>${meal}</textarea></td>`;
                colIndex++;
            });

            flyWindowHTML += `</tr>`;
            rowIndex++;
        });
                    
        flyWindowHTML += `
                </table>
                <script>
                    function adjustHeight(element) { 
                        element.style.height = 'auto'; 
                        element.style.height = element.scrollHeight + 'px';
                    }  
                    
                    function adjustHeightForElements(elements) {
                        let maxHeight = 0;

                        for (let index = 0; index < elements.length; index++) {
                            adjustHeight(elements[index]);
    
                            if (elements[index].scrollHeight > maxHeight)
                                maxHeight = elements[index].scrollHeight;
                        }
    
                        for (let index = 0; index < elements.length; index++) {
                            elements[index].style.height = maxHeight + 'px';
                        }
                    }

                    adjustHeightForElements(document.getElementsByClassName('textarea_row_0'));
                    adjustHeightForElements(document.getElementsByClassName('textarea_row_1'));
                    adjustHeightForElements(document.getElementsByClassName('textarea_row_2'));
                    adjustHeightForElements(document.getElementsByClassName('textarea_row_3'));
                    adjustHeightForElements(document.getElementsByClassName('textarea_row_4'));
                </script>
            </body>
        </html>`;

        return flyWindowHTML;
    }

    return '';
}

function generateMealPlan(event) {
    event.preventDefault();

    const isEmailInputValid = isEmailValid(document.getElementById('email').value);
    const nameValid = document.getElementById('name').value.length > 0;
    const goalValid = document.getElementById('goal').value.length > 0;

    hideOrShowEmailError(isEmailInputValid);
    hideOrShowNameError(nameValid);
    hideOrShowGoalError(goalValid);
    hideOrShowSubmitError(isEmailInputValid && nameValid && goalValid);

    const flyWindowMealPlanHTML = generateFlyWindowMealPlanHTML(isEmailInputValid);

    if (isEmailInputValid && nameValid && goalValid) {
        const flyWindow = window.open(`about:blank`,'myPop','width=1170,height=600,left=300,top=10');
        flyWindow.document.write(flyWindowMealPlanHTML);
    }
}

function printMealPlan(event) {
    event.preventDefault();

    const isEmailInputValid = isEmailValid(document.getElementById('email').value);
    const nameValid = document.getElementById('name').value.length > 0;
    const goalValid = document.getElementById('goal').value.length > 0;

    hideOrShowEmailError(isEmailInputValid);
    hideOrShowNameError(nameValid);
    hideOrShowGoalError(goalValid);
    hideOrShowSubmitError(isEmailInputValid && nameValid && goalValid);

    const flyWindowMealPlanHTML = generateFlyWindowMealPlanHTML(isEmailInputValid);

    if (isEmailInputValid && nameValid && goalValid) {
        const flyWindow = window.open(`about:blank`,'myPop','width=1170,height=600,left=300,top=10');
        flyWindow.document.write(flyWindowMealPlanHTML);

        flyWindow.document.close();

        flyWindow.onload = function() {
            flyWindow.focus();
            flyWindow.print();
            flyWindow.close();
        }
    }
}

document.getElementById('submit_button').addEventListener('click', (event) => generateMealPlan(event));
document.getElementById('print_button').addEventListener('click', (event) => printMealPlan(event));
document.getElementById('clear_button').addEventListener('click', (event) => hideOrShowEmailError(true));
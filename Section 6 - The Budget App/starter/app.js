var budgetController = (function() {
    
    var Expense = function(id, description, value) {
        this.id = id;
        this.desc = description;
        this.value = value;
        this.percent = -1;
    };

    Expense.prototype.calcPercent = function(totalInc) {
        if(totalInc > 0){
            this.percent = Math.round((this.value/totalInc) * 100);
        } else {
            this.percent = -1;
        }
    };

    Expense.prototype.getPercentage = function() {
        return this.percent;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.desc = description;
        this.value = value;
    };

    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(e => {
            sum += e.value;
        });
        data.totals[type] = sum;
    }

    var data = {
        allItems: {
            exp: [],
            inc: [],
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    return {
        addItem: function(type, des, val) {
            var newItem, ID;

            // create new ID
            if(data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // create new item based on type
            if (type === 'exp'){
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            // push it into our data structure
            data.allItems[type].push(newItem);

            // return the new item
            return newItem;
        },

        deleteItem: function(type, id) {
            var ids, index
            var ids = data.allItems[type].map(function(current) {
                return current.id;
            });
            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },

        calculateBudget: function() {
            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            // calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // calculate the percentage of income that we spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },

        calculatePercentages: function() {
            data.allItems['exp'].forEach(i => {
                i.calcPercent(data.totals.inc);
            })
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },

        getPercentages: function() {
            var allPerc = data.allItems['exp'].map(i => {
                return  i.getPercentage();
            });
            return allPerc;
        }
    }
})();

var uiController = (function() {
    var DOMStrings = {
        inputType: '.add__type',
        inputDesc: '.add__description',
        inputValue: '.add__value',
        inputBtn:   '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        budgetIncomeLabel: '.budget__income--value',
        budgetExpenseLabel: '.budget__expenses--value',
        budgetPercentage: '.budget__expenses--percentage',
        container: '.container',
        expensesPercentLabel: '.item__percentage',
        monthLabel: '.budget__title--month'
    };

    var formatNumber = function(num, type) {
        var numSplit, int, dec;

        /*
            Number format rules:
                + or - before number based on type
                exactly 2 decimal places
                comma separating the thousands
        */

        num = Math.abs(num);
        num = num.toFixed(2);
        numSplit = num.split('.');
        int = numSplit[0];

        if (int,length > 3) {
            int = int.substr(0, (int.length - 3)) + ',' + int.substr((int.length - 3), 3);
        }

        dec = numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
        
    };

    var nodeListForEach = function(list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };

    // object containing the public methods
    return {
        addListItem: function(obj, type) {
            var html, newHTML, element;

            // Create HTML string with placeholder text
            if (type === 'inc') {
                element = DOMStrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%">'+
                       '<div class="item__description">%description%</div>'+
                       '<div class="right clearfix"><div class="item__value">%value%</div>'+
                       '<div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div>'+
                       '</div></div>';
            } else if (type === 'exp') {
                element = DOMStrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%">' +
                    '<div class="item__description">%description%</div>'+
                    '<div class="right clearfix">' + 
                    '<div class="item__value">%value%</div>'+
                    '<div class="item__percentage">21%</div>'+
                    '<div class="item__delete">' + 
                    '<button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>' +
                    '</div></div></div>';
            }

            // Replace the placeholder text with some actual data
            newHTML = html.replace('%id%', obj.id);
            newHTML = newHTML.replace('%description%', obj.desc);
            newHTML = newHTML.replace('%value%', formatNumber(obj.value, type));

            // Insert the HTML into the DOM
            //Document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
            document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
        },

        changeType: function() {
            var fields = document.querySelectorAll(
                DOMStrings.inputType + ',' +
                DOMStrings.inputDesc + ',' +
                DOMStrings.inputValue
            );

            nodeListForEach(fields, function(e) {
                e.classList.toggle('red-focus');
            });

            document.querySelector(DOMStrings.inputBtn).classList.toggle('red');
        },

        clearFields: function() {
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMStrings.inputDesc + ',' + DOMStrings.inputValue);
            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(e => {
                e.value = "";
            });
            fieldsArr[0].focus();
        },

        deleteListItem: function(selectorID) {
            var el = document.getElementById(selectorID)
            el.parentNode.removeChild(el)
        },

        displayBudget: function(obj) {
            var type;

            obj.budget > 0 ? type = 'inc' : type = 'exp';

            document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMStrings.budgetIncomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMStrings.budgetExpenseLabel).textContent = formatNumber(obj.totalExp, 'exp');

            if(obj.percentage > 0) {
                document.querySelector(DOMStrings.budgetPercentage).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMStrings.budgetPercentage).textContent = '---';
            }
        },

        displayMonth: function () {
            var now, year, month, months;

            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
                        'August', 'September', 'October', 'November', 'December'];

            now = new Date();
            month = now.getMonth();
            year = now.getFullYear();
            document.querySelector(DOMStrings.monthLabel).textContent = months[month] + ' ' + year;

        },

        displayPercentges: function(perc) {
            var fields = document.querySelectorAll(DOMStrings.expensesPercentLabel);

            nodeListForEach(fields, function(current, index) {
                if (perc[index] > 0) {
                    current.textContent = perc[index] + '%';
                } else {
                    current.textContent = '---';
                }
            });
        },

        getInput: function() {
            return {
                type: document.querySelector(DOMStrings.inputType).value, // will it be an income or an expense
                desc: document.querySelector(DOMStrings.inputDesc).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            };
        },
        getDOMStrings: function() {
            return DOMStrings;
        }
    };
})();

var appController = (function(budgetCtrl, uiCtrl) {
    var setupEventListeners = function() {
        var DOM = uiCtrl.getDOMStrings();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        document.querySelector(DOM.inputType).addEventListener('change', uiCtrl.changeType);
    };

    var ctrlAddItem = function() {
        var input, newItem;

        // 1. Get the filed input data
        input = uiCtrl.getInput();

        if(input.desc !== "" && !isNaN(input.value) && input.value > 0) {

            // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.desc, input.value);

            // 3. Add the item to the UI
            uiCtrl.addListItem(newItem, input.type);

            // 4. Clear the Values
            uiCtrl.clearFields();

            // 5. Calculate and update the budget
            updateBudget();

            // 6. Calculate and update the percentages
            updatePercentages();
        }
    };

    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, ID;

        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        
        if(itemID) {
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            // 1. Delete the item from the data structure
            budgetCtrl.deleteItem(type, ID);
            
            // 2. Delete the item from the UI
            uiCtrl.deleteListItem(itemID);

            // 3. Update and show the new budeget
            updateBudget();

            // 4. Update the percentages
            updatePercentages();
        }
    };

    var updateBudget = function() {
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();

        // 2. Return the budget
        var budget = budgetCtrl.getBudget();

        // 3. Display the budget on the UI.
        uiCtrl.displayBudget(budget);
    }

    var updatePercentages = function() {
        // 1. Calculate the percentages
        budgetCtrl.calculatePercentages();

        // 2. Read them from the budget contorller
        var percentages = budgetCtrl.getPercentages();

        // 3. Update the UI
        uiCtrl.displayPercentges(percentages);
    };

    return {
        init: function() {
            console.log('Application has started.');
            uiCtrl.displayMonth();
            uiCtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    };
})(budgetController, uiController);

appController.init();
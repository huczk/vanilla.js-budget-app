export default function BudgetController() {
    class Expense {
        constructor(id, description, value) {
            this.id = id;
            this.description = description;
            this.value = value;
        }
    }

    class Income {
        constructor(id, description, value) {
            this.id = id;
            this.description = description;
            this.value = value;
        }
    }

    const data = {
        allItems: {
            exp: [],
            inc: [],
        },
        totals: {
            exp: 0,
            inc: 0,
        },
        budget: 0,
    };

    const calculateTotal = function (type) {
        data.totals[type] = data.allItems[type].reduce((acc, next) => acc + next.value, 0);
    };

    return {
        addItem(type, des, val) {
            const ID = (data.allItems[type].length > 0
                ? data.allItems[type][data.allItems[type].length - 1].id + 1
                : 0
            );
            const newItem = (type === 'exp'
                ? new Expense(ID, des, val)
                : new Income(ID, des, val)
            );

            data.allItems[type].push(newItem);
            return newItem;
        },

        deleteItem(type, id) {
            data.allItems[type] = data.allItems[type].filter(item => item.id !== id);
        },

        calculateBudget() {
            calculateTotal('exp');
            calculateTotal('inc');

            data.budget = data.totals.inc - data.totals.exp;
        },

        getBudget() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
            };
        },
    };
}

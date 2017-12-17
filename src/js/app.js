import anime from 'animejs';
import BudgetController from './budgetController';
import UIController from './uiController';

const morphing = anime({
    targets: '#Shape',
    d: [
        { value: 'M 12 7 L 12 9 L 7 9 L 7 14 L 5 14 L 5 9 L 0 9 L 0 7 L 5 7 L 5 2 L 7 2 L 7 7 L 12 7' },
        { value: 'M 12 5 L 11.25 4.25 L 10.5 3.5 L 7.25 6.75 L 4 10 L 1.5 7.5 L 0 9 L 2 11 L 4 13 L 6 11 L 8 9 L 10 7 L 12 5' },
    ],
    easing: [0.23, 1, 0.42, 1],
    duration: 500,
    direction: 'alternate',
    autoplay: false,
});

const controller = (function (budgetCtrl, UICtrl) {
    const updateBudget = function () {
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();

        // 2. Return the budget
        const budget = budgetCtrl.getBudget();

        // 3. Display the budget on the UI
        UICtrl.displayBudget(budget);
    };

    const ctrlAddItem = function () {
        let newItem;

        // 1. Get the field input data
        const input = UICtrl.getInput();

        if (input.description !== '' && !Number.isNaN(input.value) && input.value > 0) {
            morphing.play();
            morphing.restart();
            // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear the fields
            UICtrl.clearFields();

            // 5. Calculate and update budget
            updateBudget();
        }
    };

    const ctrlDeleteItem = function (event) {
        const itemID = event.target.parentNode.parentNode.id || event.target.parentNode.parentNode.parentNode.id;

        if (itemID) {
            const [type, ID] = itemID.split('-');

            // 1. delete the item from the data structure
            budgetCtrl.deleteItem(type, Number(ID));

            // 2. Delete the item from the UI
            UICtrl.deleteListItem(itemID);

            // 3. Update and show the new budget
            updateBudget();
        }
    };

    const setupEventListeners = function () {
        document.querySelector('.add__submit').addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', (event) => {
            if (event.charCode === 13) {
                ctrlAddItem();
            }
        });

        document.querySelector('.details').addEventListener('click', ctrlDeleteItem);
    };

    return {
        init() {
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
            });
            setupEventListeners();
        },
    };
}(BudgetController(), UIController()));

// document.addEventListener('DOMContentLoaded', () => controller.init());
controller.init();

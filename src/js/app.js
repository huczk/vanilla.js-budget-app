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
        budgetCtrl.calculateBudget();
        const budget = budgetCtrl.getBudget();
        UICtrl.displayBudget(budget);
    };

    const ctrlAddItem = function () {
        let newItem;
        const input = UICtrl.getInput();

        if (input.description !== '' && !Number.isNaN(input.value) && input.value > 0) {
            morphing.play();
            morphing.restart();
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            UICtrl.addListItem(newItem, input.type);
            UICtrl.clearFields();
            updateBudget();
        }
    };

    const ctrlDeleteItem = function (event) {
        const itemID = event.target.parentNode.parentNode.id || event.target.parentNode.parentNode.parentNode.id;

        if (itemID) {
            const [type, ID] = itemID.split('-');

            budgetCtrl.deleteItem(type, Number(ID));
            UICtrl.deleteListItem(itemID);
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

controller.init();

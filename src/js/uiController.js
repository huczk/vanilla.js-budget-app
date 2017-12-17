export default function UIController() {
    const formatNumber = function (num, type) {
        const numFormated = Math.abs(num).toFixed(2);
        const numSplit = numFormated.split('.');
        let [int, dec] = numSplit;

        if (int.length > 3) {
            int = `${int.substr(0, int.length - 3)},${int.substr(int.length - 3, 3)}`; // input 23510, output 23,510
        }

        return `${(type === 'exp' ? '-' : '+')} ${int}.${dec}`;
    };

    return {
        getInput() {
            return {
                type: document.querySelector('input:checked').value,
                description: document.querySelector('.add__description').value,
                value: parseFloat(document.querySelector('.add__value').value),
            };
        },

        addListItem(obj, type) {
            const element = type === 'inc' ? '.details__income' : '.details__expense';
            const html = `
                <div class="item" id="${type}-${obj.id}">
                    <div class="item__description">${obj.description}</div>
                    <div class="item__value">${formatNumber(obj.value, type)}</div>
                    <div class="item__delete">
                        <svg viewBox="0 2 12 12" style="width: 15px;">
                            <polygon id="Shape" points="7.48 8 11.23 11.75 9.75 13.23 6 9.48 2.25 13.23 0.77 11.75 4.52 8 0.77 4.25 2.25 2.77 6 6.52 9.75 2.77 11.23 4.25"></polygon>
                        </svg>                            
                    </div>
                </div>
            `;

            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', html);
        },

        deleteListItem(selectorID) {
            const el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        clearFields() {
            const fieldsArr = [...document.querySelectorAll('.add__description, .add__value')];

            fieldsArr.map((current) => {
                current.value = '';
                return current;
            });

            fieldsArr[0].focus();
        },

        displayBudget(obj) {
            const type = obj.budget > 0 ? 'inc' : 'exp';

            document.querySelector('.budget__value').textContent = formatNumber(obj.budget, type);
            document.querySelector('.budget__income').textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector('.budget__expense').textContent = formatNumber(obj.totalExp, 'exp');
        },
    };
}

const bankInput = document.getElementById('bankName');
const systemSelect = document.getElementById('paymentSys');
const numberInput = document.getElementById('cardNum');
const holderInput = document.getElementById('cardHolder');
const dateInput = document.getElementById('expiryDate');
const form = document.getElementById('cardForm');
const bankLogoImg = document.getElementById('bankPreviewLogo');
const systemLogoImg = document.getElementById('paymentPreviewIcon');
const numberPreview = document.getElementById('cardNumberPreview');
const holderPreview = document.getElementById('holderPreview');
const datePreview = document.getElementById('datePreview');
const cardPreview = document.querySelector('.card-preview'); // сама карта
const tableBody = document.getElementById('cardsTableBody');
let cards = [];
function getCardColor(bankName) {
    const bank = bankName.toLowerCase().trim();
    if (bank.includes('сбер') || bank.includes('sber')) {
        return 'linear-gradient(135deg, #1e9b3e, #1e9b3e)'; 
    } else if (bank.includes('тиньк') || bank.includes('tinkoff')) {
        return 'linear-gradient(135deg, #ffd700, #ffd700)'; 
    } else if (bank.includes('альфа') || bank.includes('alfa')) {
        return 'linear-gradient(135deg, #ef3124, #ef3124)';
    } else if (bank.includes('втб') || bank.includes('vtb')) {
        return 'linear-gradient(135deg, #0054a6, #0054a6)'; 
    } else if (bank.includes('открытие') || bank.includes('otkritie')) {
        return 'linear-gradient(135deg, #f39200, #f39200)'; 
    } else if (bank.includes('газпром') || bank.includes('gazprom')) {
        return 'linear-gradient(135deg, #0066b3, #0066b3)'; 
    } else if (bank.includes('россельхоз') || bank.includes('rshb')) {
        return 'linear-gradient(135deg, #008542, #008542)'; 
    } else if (bank.includes('райффайзен') || bank.includes('raiffeisen')) {
        return 'linear-gradient(135deg, #0066a1, #0066a1)'; 
    }
    return 'linear-gradient(135deg, #1e3a8a, #1e3a8a)';
}
function getBankLogo(bankName) {
    const bank = bankName.toLowerCase().trim();
    if (bank.includes('сбер') || bank.includes('sber')) {
        return 'https://png.klev.club/uploads/posts/2024-04/png-klev-club-dfpm-p-logotip-sber-png-6.png';
    } else if (bank.includes('тиньк') || bank.includes('tinkoff')) {
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Tinkoff_logo_2024.svg/1280px-Tinkoff_logo_2024.svg.png';
    } else if (bank.includes('альфа') || bank.includes('alfa')) {
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_alfa-bank.svg/3840px-Logo_alfa-bank.svg.png';
    } else if (bank.includes('втб') || bank.includes('vtb')) {
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/VTB_Logo_2018.svg/1280px-VTB_Logo_2018.svg.png';
    } else if (bank.includes('открытие') || bank.includes('otkritie')) {
        return 'https://upload.wikimedia.org/wikipedia/ru/a/a8/Otkritie_logo_2017.png';
    } else if (bank.includes('газпром') || bank.includes('gazprom')) {
        return 'https://upload.wikimedia.org/wikipedia/ru/thumb/2/2d/Gazprom-Logo-rus.svg/3840px-Gazprom-Logo-rus.svg.png';
    } else if (bank.includes('россельхоз') || bank.includes('rshb')) {
        return 'https://upload.wikimedia.org/wikipedia/ru/thumb/5/51/%D0%9B%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF_%D0%A0%D0%BE%D1%81%D1%81%D0%B5%D0%BB%D1%8C%D1%85%D0%BE%D0%B7%D0%B1%D0%B0%D0%BD%D0%BA.svg/3840px-%D0%9B%D0%BE%D0%B3%D0%BE%D1%82%D0%B8%D0%BF_%D0%A0%D0%BE%D1%81%D1%81%D0%B5%D0%BB%D1%8C%D1%85%D0%BE%D0%B7%D0%B1%D0%B0%D0%BD%D0%BA.svg.png';
    } else if (bank.includes('райффайзен') || bank.includes('raiffeisen')) {
        return 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Raiffeisen_Bank_2022_RU_Logo.svg/3840px-Raiffeisen_Bank_2022_RU_Logo.svg.png';
    }
    return 'https://w7.pngwing.com/pngs/382/162/png-transparent-mastercard-credit-card-payment-bank-mastercard-text-payment-logo.png';
}
function getSystemLogo(systemName) {
    const system = systemName.toLowerCase();
    
    switch(system) {
        case 'visa':
            return 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Visa_Inc._logo_%282021%E2%80%93present%29.svg/3840px-Visa_Inc._logo_%282021%E2%80%93present%29.svg.png';
        case 'mastercard':
            return 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1280px-MasterCard_Logo.svg.png';
        case 'мир':
            return 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Mir-logo.SVG.svg/1280px-Mir-logo.SVG.svg.png?utm_source=ru.wikipedia.org&utm_campaign=index&utm_content=thumbnail';
        default:
            return 'https://w7.pngwing.com/pngs/382/162/png-transparent-mastercard-credit-card-payment-bank-mastercard-text-payment-logo.png';
    }
}
function formatNumber(value) {
    let cleaned = value.replace(/\D/g, '');
    if (cleaned.length > 16) cleaned = cleaned.slice(0, 16);
    let groups = [];
    for (let i = 0; i < cleaned.length; i += 4) {
        groups.push(cleaned.slice(i, i + 4));
    }
    return groups.join(' ');
}
function updatePreview() {
    let bankText = bankInput.value.trim();
    if (bankText !== '') {
        cardPreview.style.background = getCardColor(bankText);
        cardPreview.style.transition = 'background 0.3s ease'; // плавная смена цвета
    } else {
        cardPreview.style.background = 'linear-gradient(135deg, #1e3a8a, #2563eb)';
    }
    if (bankText !== '') {
        bankLogoImg.src = getBankLogo(bankText);
        bankLogoImg.alt = bankText;
        bankLogoImg.style.display = 'inline-block';
    } else {
        bankLogoImg.src = 'https://cdn-icons-png.flaticon.com/512/584/584073.png';
        bankLogoImg.alt = 'Банк';
    }
    let system = systemSelect.value;
    if (system) {
        systemLogoImg.src = getSystemLogo(system);
        systemLogoImg.alt = system;
    } else {
        systemLogoImg.src = 'https://e7.pngegg.com/pngimages/276/392/png-clipart-contactless-payment-google-pay-contactless-smart-card-credit-card-credit-card-white-face.png';
    }
    let formatted = formatNumber(numberInput.value);
    numberPreview.textContent = formatted || '•••• •••• •••• ••••';
    let holderText = holderInput.value.trim();
    holderPreview.textContent = holderText === '' ? 'HOLDER NAME' : holderText.toUpperCase();
    let dateVal = dateInput.value;
    if (dateVal) {
        let [year, month] = dateVal.split('-');
        datePreview.textContent = `${month}/${year.slice(2)}`;
    } else {
        datePreview.textContent = 'MM/YY';
    }
}
function renderTable() {
    if (cards.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6">Нет добавленных карт</td></tr>';
        return;
    }
    let html = '';
    for (let i = 0; i < cards.length; i++) {
        let card = cards[i];
        html += `
            <tr>
                <td>
                    <div style="width: 12px; height: 12px; border-radius: 50%; display: inline-block; margin-right: 8px; background: ${getCardColor(card.bank)}"></div>
                    <img src="${getBankLogo(card.bank)}" width="20" height="20" style="vertical-align: middle; margin-right: 6px;">
                    ${card.bank}
                </td>
                <td>
                    <img src="${getSystemLogo(card.system)}" width="30" height="20" style="vertical-align: middle; margin-right: 6px;">
                    ${card.system}
                </td>
                <td>${card.number}</td>
                <td>${card.holder}</td>
                <td>${card.date}</td>
                <td><button class="delete-btn" data-index="${i}">Удалить</button></td>
            </tr>
        `;
    }
    tableBody.innerHTML = html;
    const deleteBtns = document.querySelectorAll('.delete-btn');
    for (let btn of deleteBtns) {
        btn.addEventListener('click', function() {
            let index = parseInt(this.getAttribute('data-index'));
            cards.splice(index, 1);
            renderTable();
            saveToLocalStorage();
        });
    }
}
function saveToLocalStorage() {
    localStorage.setItem('bankCards', JSON.stringify(cards));
}
function loadFromLocalStorage() {
    let saved = localStorage.getItem('bankCards');
    if (saved) {
        cards = JSON.parse(saved);
        renderTable();
    }
}
function isValid() {
    let bank = bankInput.value.trim();
    let system = systemSelect.value;
    let number = numberInput.value.replace(/\s/g, '');
    let holder = holderInput.value.trim();
    let date = dateInput.value;
    if (!bank) { alert('Введите название банка'); return false; }
    if (!system) { alert('Выберите платежную систему'); return false; }
    if (number.length !== 16) { alert('Номер карты должен содержать 16 цифр'); return false; }
    if (!holder) { alert('👤 Введите имя держателя'); return false; }
    if (!date) { alert('Выберите срок действия'); return false; }
    return true;
}

function addCard(event) {
    event.preventDefault();
    if (!isValid()) return;
    let dateVal = dateInput.value;
    let [year, month] = dateVal.split('-');
    let formattedDate = `${month}/${year.slice(2)}`;
    let newCard = {
        bank: bankInput.value.trim(),
        system: systemSelect.value,
        number: numberInput.value,
        holder: holderInput.value.trim().toUpperCase(),
        date: formattedDate
    };
    cards.push(newCard);
    renderTable();
    saveToLocalStorage();
    form.reset();
    updatePreview();
    alert('Карта успешно добавлена! Цвет карты запомнен!');
}
bankInput.addEventListener('input', updatePreview);
systemSelect.addEventListener('change', updatePreview);
holderInput.addEventListener('input', updatePreview);
dateInput.addEventListener('input', updatePreview);
numberInput.addEventListener('input', function(e) {
    let formatted = formatNumber(this.value);
    this.value = formatted;
    updatePreview();
});
form.addEventListener('submit', addCard);
loadFromLocalStorage();
updatePreview();
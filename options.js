let addRateButton = document.getElementById('add-5-rows')
addRateButton.addEventListener('click', () => addRateInputs(5))

let saveButton = document.getElementById('save-button')
saveButton.addEventListener('click', saveRates)

var storageRates = {};
populateSavedRates();

function populateSavedRates(){
    document.getElementById('saved-rates').innerText = '';
    chrome.storage.local.get('rates', function(data) {
        storageRates = data.rates || {};
        for(key in storageRates) {
            addSavedRateRow(key, storageRates[key])
        }
        document.getElementById('rates').innerText = '';
    });

}

function addSavedRateRow(rateName, rateNum){
    var div = document.createElement('div');
    var name = document.createElement('label');
    name.innerText = rateName;

    var rate = document.createElement('label');
    rate.innerText = " === " + rateNum;

    div.appendChild(name);
    div.appendChild(rate);

    document.getElementById('saved-rates').appendChild(div)
}

function addRateInputs(numberOfInputs){
    for (let i = 0; i < numberOfInputs; i++) {
        addRateInput();
    }
}

function addRateInput(){
    var div = document.createElement('div');
    div.className = "rate-row"

    var nameLabel = document.createElement('label');
    nameLabel.innerText = 'Project'
    var name = document.createElement('input');
    name.type = 'text'
    name.className = 'name'

    var rateLabel = document.createElement('label');
    rateLabel.innerText = 'Daily Rate'
    var rate = document.createElement('input');
    rate.type = 'text'
    rate.className = 'rate'

    div.appendChild(nameLabel);
    div.appendChild(name);
    div.appendChild(rateLabel);
    div.appendChild(rate);

    document.getElementById('rates').appendChild(div)
}

function saveRates() {
    var rates = document.getElementsByClassName('rate-row');
    for (let i = 0; i < rates.length; i++) {
        console.log(rates[i])
        var name = rates[i].getElementsByClassName('name')[0].value
        var rate = rates[i].getElementsByClassName('rate')[0].value
        if(name != '' ) {
            if (rate == '') {
                delete storageRates[name];
            } else {
                storageRates[name] = rate;
            }
        }
    }

    chrome.storage.local.set({rates: storageRates}, function() {
        console.log({rates: storageRates});
        populateSavedRates();
    })
}

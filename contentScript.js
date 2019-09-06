// clean up
var allTheMoney = document.getElementsByClassName("the-money");
for (let i = 0; i < allTheMoney.length; i++) {
    allTheMoney[i].parentNode.removeChild(allTheMoney[i]);
}


var rates
var projectRows = document.getElementsByClassName("staffing-project-row");

chrome.storage.local.get('rates', function(data) {
    rates = data.rates;
    console.log(rates);
    for (let i = 0; i < projectRows.length; i++) {
        updateProject(projectRows[i])
    }
});


function updateProject(projectRow){
    let projectName = projectRow.getElementsByClassName('title')[0].innerText

    var skillsSection = projectRow.getElementsByClassName('skills')[0]
    if(skillsSection != undefined) {

        var rate = getProjectRate(projectName)

        if(rate > 0) {
            let moneyDiv = document.createElement('div');
            moneyDiv.className = "the-money";

            let daysCount = countDays(projectRow)

            moneyDiv.appendChild(createDiv("Days: ", daysCount))
            moneyDiv.appendChild(createDiv("Rate: $", rate))
            moneyDiv.appendChild(createDiv("Revenue: $ ", daysCount*rate))

            skillsSection.appendChild(moneyDiv)
        }
    }
}

function getProjectRate(projectName){
    for (var key in rates) {
        if(projectName.includes(key)) {
            return rates[key];
        }
    }
}

function countDays(projectRow) {
    return projectRow.getElementsByClassName('on-project day').length - projectRow.getElementsByClassName('on-project day on-vacation').length

}

function createDiv(label, num) {
    var div = document.createElement('div');
    div.innerText = label + num.toLocaleString('en');
    return div;
}


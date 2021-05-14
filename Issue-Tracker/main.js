document.querySelector('#issueInputForm').addEventListener('submit', e => {
    let issueDesc = document.querySelector('#issueDescInput').value;
    let issueSeverity = document.querySelector('#issueSeverityInput').value;
    let issueAssignedTo = document.querySelector('#issueAssignedToInput').value;
    let issueId = chance.guid();
    let issueStatus = 'Open';

    let issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    };

    if(localStorage.getItem('issues') == null) {
        let issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        let issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    document.querySelector('#issueInputForm').reset();

    fetchIssues();

    e.preventDefault();
});

const setStatusClosed = (id) => {
    let issues = JSON.parse(localStorage.getItem('issues'));

    if(issues != null) {
        issues.forEach(element => {
            if(element.id == id) element.status = 'Closed';
        });
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
};

const deleteIssue = (id) => {
    let issues = JSON.parse(localStorage.getItem('issues'));

    if(issues != null) {
        issues.forEach(element => {
            if(element.id == id) issues.splice(issues.indexOf(element), 1);
        });
    }

    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();   
}

const fetchIssues = () => {
    let issues = JSON.parse(localStorage.getItem('issues'));
    let issuesList = document.querySelector('#issuesList');

    issuesList.textContent = '';

    if(issues != null) {
        issues.forEach(element => {
            issuesList.innerHTML += `<div class="well">
                                        <h6>Issue ID: ${element.id}</h6>
                                        <p><span class="label label-info">${element.status}</span></p>
                                        <h3>${element.description}</h3>
                                        <p><span class="glyphicon glyphicon-time"></span>${element.severity}</p>
                                        <p><span class="glyphicon glyphicon-user"></span>${element.assignedTo}</p>
                                        <a href="#" onclick="setStatusClosed('${element.id}')" class="btn btn-warning">Close</a>
                                        <a href="#" onclick="deleteIssue('${element.id}')" class="btn btn-danger">Delete</a>
                                    </div>`;
        });        
    }

};
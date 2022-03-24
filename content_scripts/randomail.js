function fetch() {
    mailList = document.querySelectorAll("div[role='main'] div.UI table tbody tr");
    
    allMail = []
    mailList.forEach(mail => {
        userMail = mail.innerHTML.split("email")[1].slice(2).split('"')[0];
        allMail.push(userMail);
    }); 

    return allMail
}

fetch();
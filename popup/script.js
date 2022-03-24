function onGot(result){
    mailList = result.mailList;

    document.getElementsByClassName("random")[0].style.display = "block";
    document.getElementsByClassName("nbr-mail")[0].textContent = mailList.length.toString();

    return mailList
}


try{
    mailList = browser.storage.local.get("mailList").then(onGot);
} 
catch (e) {
    mailList = [];
    browser.storage.local.set({"mailList": mailList});

    document.getElementsByClassName("random")[0].style.display = "none";
    document.getElementsByClassName("nbr-mail")[0].textContent = "0";
}

// fontSize = document.getElementsByClassName("email-random")[0].textContent.length / 250;
// document.getElementsByClassName("email-random")[0].style.fontSize = fontSize;

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("fetch")) {
        browser.tabs.executeScript({file: "/content_scripts/randomail.js"}).then(result => {
            allMails = result.toString().split(",");
            allMails.forEach(mail => {
                mailList.push(mail);
            });

            browser.storage.local.set({"mailList": mailList});

            // Idée : vérif si c'est un mail avant de push avec un regex

            document.getElementsByClassName("nbr-mail")[0].textContent = mailList.length.toString();
            document.getElementsByClassName("random")[0].style.display = "block";         
        });
    }

    else if (e.target.classList.contains("reset")) {
        mailList = [];
        browser.storage.local.set({"mailList": mailList});
        
        document.getElementsByClassName("nbr-mail")[0].textContent = "0";

        document.getElementsByClassName("email-random")[0].style.display = "none";
        document.getElementsByClassName("random")[0].style.display = "none";
    }

    else if (e.target.classList.contains("random")) {
        document.getElementsByClassName("email-random")[0].style.display = "block";
        document.getElementsByClassName("email-random")[0].textContent = mailList[Math.floor(Math.random() * mailList.length)];

        // Mettre la font-size en fonction du nombre de caractères de la chaine
        // fontSize = document.getElementsByClassName("email-random")[0].textContent.length;
        // document.getElementsByClassName("email-random")[0].style.fontSize = fontSize;
    }

    else return;
})


// Funções Criadas Para Alterar Classes do CSS Dinamicamente

function toggleSpecificURLClasses() {
    const currentResources = window.location.pathname

    const homeLink = document.getElementById("home-link")
    const instructorsLink = document.getElementById("instructors-link")
    const membersLink = document.getElementById("members-link")
    const documentBody = document.querySelector("body")

    console.log(currentResources)

    if(currentResources.includes("/home")) {
        homeLink.classList.add("active-members-link")
        documentBody.classList.add("home-body")
    }

    else if(currentResources.includes("/instructors")) {
        instructorsLink.classList.add("active-instructors-link")
        documentBody.classList.add("instructors-body")
    }
 
    else if(currentResources.includes("/members")) {
        membersLink.classList.add("active-members-link")
        documentBody.classList.add("members-body")
    }

    else {
        return
    }
}

function toggleDeleteModalClasses() {
    const modal = document.querySelector('#modal-delete')
    const confirmationText = document.querySelector('.confirmation-text p')
    const buttons = document.querySelectorAll('.buttons-div button')

    modal.classList.toggle('show-modal')
    confirmationText.classList.toggle('show-modal-confirmation-text')

    buttons.forEach((button) => {
        button.classList.toggle('show-modal-buttons')
    })
}
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

function toggleInvisibleClassByFilter() {
    const listFilter = document.querySelector('.list-filter-div input')

    listFilter.addEventListener('input', () => {
        const majorItemArray = document.querySelectorAll('.major-item-link')
        const itemNameArray = document.querySelectorAll('.major-item-link .details .item-name p')
        const regExp = new RegExp(`^${listFilter.value}`, 'i')
        
        for(let i = 0; i < majorItemArray.length; i++) {
            const majorItem = majorItemArray[i]
            const itemName = itemNameArray[i]

            regExp.test(itemName.textContent)
                ? majorItem.classList.remove('invisible-major-item-link')
                : majorItem.classList.add('invisible-major-item-link')
        }
    })
}
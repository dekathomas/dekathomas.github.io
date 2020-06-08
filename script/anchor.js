'use strict'

const anchorScroll = () => {
    const Project = document.querySelector('#project')
    const Skill = document.querySelector('#skill')
    const Contact = document.querySelector('#contact')
    const links = document.querySelectorAll('.anchor')

    links.forEach(link => {
        link.addEventListener('click', function() {
            console.log(link.innerHTML)
        })
    })
}

export default anchorScroll
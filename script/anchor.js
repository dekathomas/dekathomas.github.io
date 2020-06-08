'use strict'

const anchorScroll = () => {
    const project = document.querySelector('#project')
    const skill = document.querySelector('#skill')
    const contact = document.querySelector('#contact')
    const links = document.querySelectorAll('.anchor-link')

    links.forEach(link => {
        link.addEventListener('click', function() {
            const a = bounding(link.innerHTML)
            
            window.scrollBy(0, a.top)
        })
    })

    const bounding = name => {
        const named = name.toLowerCase()
        let value

        if (named === 'project') value = project
        else if (named === 'contact') value = contact
        else if (named === 'skill') value = skill

        return value.getBoundingClientRect()
    }
}

export default anchorScroll
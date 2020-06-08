import anchorScroll from './script/anchor.js'

// Scroll Position
anchorScroll()

const body = document.querySelector('body')
const header = document.querySelector('header')
const projectList = document.querySelectorAll('.project-list')
const move = 20
const skills = document.querySelectorAll('.skill')
const images = document.querySelectorAll('.float-image')
const profileImage = document.querySelector('.profile-image')

function movingElement(e) {
	const { offsetWidth: width, offsetHeight: height } = this
	let { x: x, y: y } = e

	const xMove = Math.round( (x / width * move) - (move / 2) )
	const yMove = Math.round( (y / height * move) - (move / 2) )

	images.forEach(image => {
		if (image.classList.contains('minus-float')) {
			image.style.transform = `
				translate(${-xMove}px, ${-yMove}px)
			`
		} else {
			image.style.transform = `
			translate(${xMove}px, ${yMove}px)
			`
		}
	})

	profileImage.style.transform = `
		rotateY(${xMove}deg)
		rotateX(${-yMove}deg)
	`
}

header.addEventListener('mousemove', movingElement)
projectList.forEach(proj => {
	proj.addEventListener('mousemove', movingElement)
})

// Skills animation
skills.forEach(skill => {
	skill.addEventListener('click', () => {
		if (skill.classList.contains('clicked')) {
			skill.classList.remove('clicked')
			skill.classList.remove('active')
		} else {
			skills.forEach(skill => {
				skill.classList.remove('clicked')
				skill.classList.remove('active')
			})
			skill.classList.add('clicked')
			skill.classList.add('active')
		}

	})
})

// Lazy load
document.addEventListener("DOMContentLoaded", function() {
	let lazyImages = [...document.querySelectorAll('img.lazy')]
	
	const lazyLoad = function() {
		setTimeout(function() {
			lazyImages.forEach(function(lazyImage) {
				let bounding = lazyImage.getBoundingClientRect()
				if( (bounding.top <= window.innerHeight && bounding.bottom >= 0) && getComputedStyle(lazyImage).display != 'none' ) {
					lazyImage.src = lazyImage.dataset.src
					lazyImage.classList.remove('lazy')
	
					lazyImages = lazyImages.filter(function(image) {
						return image != lazyImage
					})
	
					if (lazyImages.length === 0) {
						document.removeEventListener("scroll", lazyLoad)
						window.removeEventListener("resize", lazyLoad)
						window.removeEventListener("orientationchange", lazyLoad)
					}
				}
			})
		}, 200)
	}

	lazyLoad()
	
	document.addEventListener("scroll", lazyLoad)
	window.addEventListener("resize", lazyLoad)
	window.addEventListener("orientationchange", lazyLoad)
})

// Navigation
const nav = document.querySelector('nav')

const navScroll = function() {
	if (window.scrollY > 100) {
		nav.classList.add('scrolled')
	} else {
		nav.classList.remove('scrolled')
	}
}

document.addEventListener("scroll", navScroll)

// Image Click
const imagesProject = document.querySelectorAll('.project-image')
const wrapper = document.querySelector('.wrapper')

const openImage = function() {
	if (!this.classList.contains('clicked')) {
		this.classList.add('clicked')
		wrapper.style.display = 'block'
	} else {
		this.classList.remove('clicked')
		wrapper.style.display = 'none'
	}
}

imagesProject.forEach(function(image) { image.addEventListener('click', openImage) })

// Social Media
const socials = document.querySelectorAll('.social')
const socialIcons = document.querySelectorAll('.social-icon')

socials.forEach(function(social) {
	social.addEventListener('click', function() {
		window.open(`${this.dataset.link}`)
	})
})

socialIcons.forEach(icon => {
	icon.addEventListener('mouseenter', function() {
		icon.style.color = icon.dataset.color
	})

	icon.addEventListener('mouseout', function() {
		icon.style.color = 'var(--color)'
	})
})

// Dark theme
const darks = document.querySelectorAll('.dark-check')
const themes = document.querySelectorAll('.theme-setting')

const darkTheme = function() {
	themes.forEach(theme => {
		theme.classList.add('fa-moon')
		theme.classList.remove('fa-sun')
	})
	body.classList.add('dark')
}

const lightTheme = function() {
	themes.forEach(theme => {
		theme.classList.remove('fa-moon')
		theme.classList.add('fa-sun')
	})
	body.classList.remove('dark')
}

if (localStorage.getItem('dark-mode') === 'true') {
	darkTheme()
} else if (localStorage.getItem('dark-mode') === 'false') {
	lightTheme()
}

darks.forEach(dark => {
	dark.addEventListener('click', function() {
		if (this.checked) {
			// Dark
			darkTheme()
			localStorage.setItem('dark-mode', 'true')
		} else {
			// Light
			lightTheme()
			localStorage.setItem('dark-mode', 'false')
		}
	})
})

// Burger menu
const burger = document.querySelector('#burger-menu')
const navMobile = document.querySelector('#nav-mobile')
const links = navMobile.querySelectorAll('.anchor')

burger.addEventListener('click', () => {
	if (!burger.classList.contains('clicked')) {
		burger.classList.add('clicked')
		navMobile.classList.add('showed')
	} else {
		burger.classList.remove('clicked')
		navMobile.classList.remove('showed')
	}
})

links.forEach(link => {
	link.addEventListener('click', () => {
		burger.classList.remove('clicked')
		navMobile.classList.remove('showed')
	})
})
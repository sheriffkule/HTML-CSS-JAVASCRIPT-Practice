let next_click = document.querySelectorAll('.next_button');
let main_form = document.querySelectorAll('.main');
let step_list = document.querySelectorAll('.progress-bar li');
let num = document.querySelector('.step-number');
let formnumber = 0;

next_click.forEach(function (nex_click_form) {
	nex_click_form.addEventListener('click', function () {
		formnumber++;
		updateform();
		progress_forward();
		contentchange();
	});
});

let back_click = document.querySelectorAll('.back_button');

back_click.forEach(function (back_click_form) {
	back_click_form.addEventListener('click', function () {
		formnumber--;
		updateform();
		progress_backward();
		contentchange();
	});
});

let username = document.querySelector('#user_name');
let showname = document.querySelector('#show_name');

let submit_click = document.querySelectorAll('.submit_button');
submit_click.forEach(function (submit_circle_form) {
	submit_circle_form.addEventListener('click', function () {
		showname.innerHTML = username.value;
		formnumber++;
		updateform();
	});
});

function updateform() {
	main_form.forEach(function (mainform_number) {
		mainform_number.classList.remove('active');
	});
	main_form[formnumber].classList.add('active');
}

function progress_forward() {
	num.innerHTML = formnumber + 1;
	step_list[formnumber].classList.add('active');
}

function progress_backward() {
	var form_num = formnumber + 1;
	step_list[form_num].classList.remove('active');
	num.innerHTML = form_num;
}

let step_num_content = document.querySelectorAll('.step-number-content');

function contentchange() {
	step_num_content.forEach(function (content) {
		content.classList.remove('active');
		content.classList.add('d-none');
	});
	step_num_content[formnumber].classList.add('active');
}

const dropArea = document.querySelector('.drop_box');
const button = dropArea.querySelector('button');
const input = dropArea.querySelector('input');

button.onclick = () => {
	input.click();
};

const year = document.getElementById('year');
const thisYear = new Date().getFullYear();

year.setAttribute('datetime', thisYear);
year.textContent = thisYear;
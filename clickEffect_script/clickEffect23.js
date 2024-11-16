const btn = document.querySelector('button');
const post = document.querySelector('.post');
const widget = document.querySelector('.star-widget');
const editBtn = document.querySelector('.edit');
const title = document.querySelector('h1')

btn.onclick = () => {
    widget.style.display = 'none';
    post.style.display = 'block';
    title.style.display = 'none';
    editBtn.onclick = () => {
		widget.style.display = 'block';
		post.style.display = 'none';
	}
    return false;
};
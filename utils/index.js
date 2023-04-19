export const checkImageUrl = (url) => {
	if(!url) return true;
	else{
		const pattern = new RegExp('^https?: \\/\\/ .+\\.(png|jpg|jpeg|bmp|gif|webp)$','i');
		return pattern.test(url);
	}
}
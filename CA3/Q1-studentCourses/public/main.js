formElem.onsubmit = async (e) => {
  e.preventDefault();
  const formdata = new FormData(formElem)
  formdata.append('resume', e.target[5].files[0])
  let response = await fetch('/mydetails', {
    method: 'POST',
    body: formdata
  });
  let result = await response.json();
  globalThis.myData = { ...result }
  const { name, gender, course, fileName } = globalThis.myData;
  profile.style.visibility = 'visible'
  showName.innerHTML = `<strong>Name:</strong> ${name}`;
  showGender.innerHTML = `<strong>Gender:</strong> ${gender}`;
  showCourse.innerHTML = `<strong>Course:</strong> ${course}`;
  showResume.innerHTML = `<strong>Resume:</strong> <a href="/${name}/myresume" target="_blank" rel="noopener noreferrer">${fileName}<a/>`
};
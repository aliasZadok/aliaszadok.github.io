/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

const listItems = document.getElementsByClassName("student-item cf"); //selecting all list items via <li> tag's class name
const pageDiv = document.getElementsByClassName("page")[0]; //selecting parent element <div> via its class name
const pageCount = 1; //deafult page number
const listOfStudents = 10;

const showPage = (list, page) => {
  const upperIndex = page * listOfStudents - 1; //index of the last list item
  const lowerIndex = upperIndex - 9; //index of the first list item
  for (let i = 0; i < list.length; i++) {
    if (i >= lowerIndex && i <= upperIndex) {
      list[i].style.display = "block";
    } else {
      list[i].style.display = "none";
    }
  }
};

const appendPageLinks = list => {
  const pages = Math.ceil(list.length / 10);
  const div = document.createElement("div");
  div.className = "pagination";
  pageDiv.appendChild(div);

  const ul = document.createElement("ul");
  div.appendChild(ul);

  //appending <li><a></a></li> to <ul>
  for (let i = 1; i <= pages; i++) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    ul.appendChild(li);
    li.appendChild(a);
    a.textContent = i;
    a.addEventListener("click", e => {
      //calling showPage() each time a link to a page is clicked
      showPage(list, i);
    });
  }
};
//finally calling both showPage() and appendPageLinks()
showPage(listItems, pageCount);
appendPageLinks(listItems);

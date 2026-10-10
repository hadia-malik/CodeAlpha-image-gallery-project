const images = [
  {
    id: 1,
    title: "Mountain Landscape",
    category: "Nature",
    url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Modern Architecture",
    category: "Architecture",
    url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Wild Fox",
    category: "Animals",
    url: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Green Forest",
    category: "Nature",
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "City Building",
    category: "Architecture",
    url: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "Curious Cat",
    category: "Animals",
    url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 7,
    title: "Mountain Lake",
    category: "Nature",
    url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 8,
    title: "Creative Workspace",
    category: "Technology",
    url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 9,
    title: "Smart Devices",
    category: "Technology",
    url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 10,
    title: "Ocean View",
    category: "Nature",
    url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 11,
    title: "City at Night",
    category: "Architecture",
    url: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 12,
    title: "Elephant",
    category: "Animals",
    url: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=800&q=80"
  }
];
//  * accessing dom elements
const imageGrid = document.querySelector("#imageGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
const pagination = document.querySelector("#pagination");
const themeBtn = document.querySelector("#themeBtn");

const imagesPerPage = 6;
let currentPage = 1;
let currentImages = images;
// * adding event listner on document to load all category images on windows load
window.addEventListener('load',()=>{
    displayImages(currentImages)
})
// TODO function for displaying images 
function displayImages(imageList) {
  imageGrid.innerHTML = "";
    const startIndex = (currentPage - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;

  const paginatedImages = imageList.slice(startIndex, endIndex);
  paginatedImages.forEach(function (image) {
    const imageCard = document.createElement("article");
    imageCard.classList.add("image-card");

    imageCard.innerHTML = `
      <img src="${image.url}" alt="${image.title}" loading="lazy">

      <div class="image-info">
        <h3>${image.title}</h3>
        <p>${image.category}</p>
      </div>
    `;

    imageGrid.appendChild(imageCard);
  });
    renderPagination(imageList);
}
// * logic for filtering images on the basis of ctegory
filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
 
const selectedCategory = button.dataset.category;

filterButtons.forEach(function (btn) {
  btn.classList.remove("active");
});

button.classList.add("active");

currentPage = 1;

if (selectedCategory === "All") {
  currentImages = images;
} else {
  currentImages = images.filter(function (image) {
    return image.category === selectedCategory;
  });
}

displayImages(currentImages);
  });
   
});
// * TODO function for rendering pagination and apply logic of pagination
function renderPagination(imageList) {
  pagination.innerHTML = "";

  const totalPages = Math.ceil(imageList.length / imagesPerPage);

  if (totalPages <= 1) {
    return;
  }

  const previousButton = document.createElement("button");
  previousButton.textContent = "Previous";
  previousButton.classList.add("page-btn");
  previousButton.disabled = currentPage === 1;

  previousButton.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      displayImages(currentImages);
    }
  });

  pagination.appendChild(previousButton);

  for (let page = 1; page <= totalPages; page++) {
    const pageButton = document.createElement("button");

    pageButton.textContent = page;
    pageButton.classList.add("page-btn");

    if (page === currentPage) {
      pageButton.classList.add("active");
    }

    pageButton.addEventListener("click", function () {
      currentPage = page;
      displayImages(currentImages);
    });

    pagination.appendChild(pageButton);
  }

  const nextButton = document.createElement("button");
  nextButton.textContent = "Next";
  nextButton.classList.add("page-btn");
  nextButton.disabled = currentPage === totalPages;

  nextButton.addEventListener("click", function () {
    if (currentPage < totalPages) {
      currentPage++;
      displayImages(currentImages);
    }
  });

  pagination.appendChild(nextButton);
}
// * adding light and dark theme functionality

const savedTheme = localStorage.getItem("galleryTheme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
  themeBtn.textContent = "☀️";
} else {
  themeBtn.textContent = "🌙";
}

themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");

  const isDarkMode = document.body.classList.contains("dark-theme");

  if (isDarkMode) {
    themeBtn.textContent = "☀️";
    localStorage.setItem("galleryTheme", "dark");
  } else {
    themeBtn.textContent = "🌙";
    localStorage.setItem("galleryTheme", "light");
  }
});

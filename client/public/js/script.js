

let assets = document.getElementById('assests');

// popup modal
const registerProduct = document.getElementById('register-product');

// active state for menu items
let menuItems = document.querySelectorAll('.menu-item');

function setActiveMenu(clickedItem) {
    menuItems.forEach(item => item.classList.remove('active-menu'));
    clickedItem.classList.add('active-menu');
}

// Show only warranty assets
function showWarrantyAssets(event) {
    registerProduct.style.display = 'none';
    assets.style.display = 'block';
    if (event) setActiveMenu(event.target);
    
    
}

// Default load view
window.onload = function() {
    showWarrantyAssets();
};

// Show Product Registration form
function showRegisterationForm(event) {
    event.preventDefault();
    registerProduct.style.display = 'block';
    registerProduct.classList.add('reg-popup');
}
  
// Cancel form
function cancelForm(event) {
    event.preventDefault();
    registerProduct.style.display = 'none';
    registerProduct.classList.remove('reg-popup');
}


let currentRow=null;

let dataTable;

document.addEventListener('DOMContentLoaded', function (event) {
    event.preventDefault();
    if (typeof DataTable !== 'undefined') {
         dataTable = new DataTable('#table');
        document.getElementById('submit').onclick = function (event) {
            event.preventDefault();

            const files = document.getElementById('images').files;
            let imageFilenames = [];
            for (let i = 0; i < files.length; i++) {
                imageFilenames.push(files[i].name);
            }
            const imagesDisplay = imageFilenames.length > 0 ?
                `<button class="view-images-btn" onclick="viewImages(this, '${imageFilenames.join(',')}')">View Images</button>` :
                'No images uploaded';

            const data = [
                document.getElementById('asset-id').value,
                document.getElementById('employee-id').value,
                document.getElementById('serial-no').value,
                document.getElementById('category').value,
                document.getElementById('brand').value,
                document.getElementById('model').value,
                document.getElementById('purchased-from').value,
                document.getElementById('purchase-date').value,
                document.getElementById('warranty-start-date').value,
                document.getElementById('warranty-end-date').value,
                document.getElementById('extendable').value,
                document.getElementById('price').value,
                
                imagesDisplay,
                `
                <button class="edit-row" onclick="editRow(this)"><span class="edit-icon"><i class="ri-edit-box-line"></i></span>Edit</button>
                <button class="delete-row" onclick="deleteRow(this)"><span class="delete-icon"><i class="ri-delete-bin-line"></i></span>Delete</button>
                <button class="extend-warranty" id="extendWarrantyBtn" onclick="showExtendWarrantyPopup(event)">Extend Warranty</button>
                <button class="warranty-history" onclick="showWarrantyHistory(event)">Warranty History</button>
                `
            ];

            if (currentRow) {
                dataTable.row(currentRow).data(data).draw();
                currentRow = null;
                document.getElementById('submit').innerText = 'Submit';
            } else {
                dataTable.row.add(data).draw();
            }
            cancelForm(event);
            const form=document.getElementById('asset-form');
            form.reset();
        }

      
    } else {
        console.error('DataTable is not defined');
    }
});





function editRow(button) {
    const row = button.closest('tr');
    currentRow = row;
    const data = dataTable.row(row).data();

    document.getElementById('asset-id').value = data[0];
    document.getElementById('employee-id').value = data[1];
    document.getElementById('serial-no').value = data[2];
    document.getElementById('category').value = data[3];
    document.getElementById('brand').value = data[4];
    document.getElementById('model').value = data[5];
    document.getElementById('purchased-from').value = data[6];
    document.getElementById('purchase-date').value = data[7];
    document.getElementById('warranty-start-date').value = data[8];
    document.getElementById('warranty-end-date').value = data[9];
    document.getElementById('extendable').value = data[10];
    document.getElementById('price').value = data[11];
    // document.getElementById('images').value= data[12];

    
    const imagesDisplay = data[12] !== 'No images uploaded' ? data[12] : 'No images uploaded';
    document.getElementById('imageViewerContent').innerHTML = imagesDisplay;

    registerProduct.style.display = 'block';    
    registerProduct.classList.add('reg-popup');
    document.getElementById('submit').innerText = 'Update';
}   


// delete a row
 function deleteRow(button) {
      const row=button.closest('tr');
      const table=$('#table').DataTable();
      table.row(row).remove().draw()
      
 }




 const extendWarrantyPopup = document.getElementById('extendWarranty-popup');


 function showExtendWarrantyPopup(event) {
    event.preventDefault();
    // const extendable = document.getElementById('extendable').value;
    extendWarrantyPopup.style.display = 'block';
    // if (extendable === 'Yes') {
      
    // } 
    // else if (extendable === 'SELECT') {
    //     alert("Please select an option Yes or No");
    // } else {
    //     alert('This asset has no warranty');
    // }
}

function cancelExtendForm(event) {
    event.preventDefault();
    extendWarrantyPopup.style.display = 'none';
}

// Warranty History Popup 

const warrantyHistoryPopup = document.getElementById('warranty-history-popup');
function showWarrantyHistory(event) {
    event.preventDefault();

    // const extendable = document.getElementById('extendable').value;  
    warrantyHistoryPopup.style.display = 'block';
    // if (extendable === 'YES') {
        
    // } 
    // else if (extendable === 'SELECT') {
    //     alert("Please select an option Yes or No");
    // } else {
    //     alert('This asset has no warranty, so no warranty history available.');
    // }
}

function cancelHistoryForm(event) {
    event.preventDefault();
    warrantyHistoryPopup.style.display = 'none';  
}

 

// show images 

const imageViewerPopup = document.getElementById('imageViewerPopup');
const imageViewerContent = document.getElementById('imageViewerContent');

function viewImages(button, filenames) {
    imageViewerContent.innerHTML = ''; // Clear existing content
    const imageArray = filenames.split(','); // Split filenames into an array

    imageArray.forEach(filename => {
        const img = document.createElement('img');
        img.src = '/public/uploads/' + filename;  // Use the correct path to serve images
        img.alt = filename; // Set alt text for accessibility
        imageViewerContent.appendChild(img); // Append each image to the content div
    });

    imageViewerPopup.style.display = 'flex';  // Show the popup (use flex to center content)
}
function closeImageViewer() {
    imageViewerPopup.style.display = 'none';
    imageViewerContent.innerHTML = '';
}

// filter 
function loadFilter(event) {
    event.preventDefault();
    const categoryFilter = document.getElementById('filter-category').value;
    const brandFilter = document.getElementById('filter-brand').value;
    const modelFilter = document.getElementById('filter-model').value;

    dataTable.column(3).search(categoryFilter).draw();
    dataTable.column(4).search(brandFilter).draw();
    dataTable.column(5).search(modelFilter).draw();
}











var arr=    JSON.parse(localStorage.getItem("students")) || [];
class studentDetails{
    constructor(fullname,email,dob,studentid,contactNo){
        this.fullName= fullname;
        this.email= email;
        this.dob=dob;
        this.studentid=studentid;
        this.contactNo=contactNo;
         
    }
   }
   
        document.getElementById('registrationForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission
            
            // Get form values
            var fullName = document.getElementById('fullName').value;
            var email = document.getElementById('email').value;
            var dob = document.getElementById('dob').value;
            var studentid = document.getElementById('studentid').value;
            var contactNo= document.getElementById('contactNo').value;
            var studentobj=new studentDetails(fullName,email,dob,studentid ,contactNo )
            
            arr.push(studentobj);
           
            
            // Display submitted information
            alert('Student Registration Successful!\n\nFull Name: ' + fullName + '\nEmail: ' + email + '\nDate of Birth: ' + dob + '\nStudentID: ' + studentid +'\nContactNo'+contactNo);
            
            // Clear form fields after submission
            document.getElementById('registrationForm').reset();
            save();
            display();
        });
    function save(){
        localStorage.setItem("students",    JSON.stringify(arr));
        
    }
   
   
    function display(){
        // Create table element
        const table = document.createElement("table");
        const container=document.getElementById("table");
        container.innerHTML="";
        // Create table header row
        const headerRow = document.createElement("tr");
        const th1 = document.createElement("th");
        const th2 = document.createElement("th");
        const th3 = document.createElement("th");
        const th4 = document.createElement("th");
        const th5 = document.createElement("th");
        const th6 = document.createElement("th");
        //Set header text
        th1.innerHTML = "Full Name";
        th2.innerHTML = "Email";
        th3.innerHTML = "Student ID";
        th4.innerHTML = "Date of Birth";
        th5.innerHTML = "Contact No.";
        th6.innerHTML = "Buttons";
        
        // Append header cells to header row
        headerRow.appendChild(th1);
        headerRow.appendChild(th2);
        headerRow.appendChild(th3);
        headerRow.appendChild(th4);
        headerRow.appendChild(th5);
        headerRow.appendChild(th6);
        
        // Append header row to table
        table.appendChild(headerRow);
        
        // Create table body
        const tbody = document.createElement("tbody");
        
        // Loop through array and create table rows
        arr.forEach((entry,index) => {

            const fullname = entry.fullName;
            const studentid = entry.studentid;
            const email = entry.email;
            const dob = entry.dob;
            const contactNo = entry.contactNo;
            
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
            const td4 = document.createElement("td");
            const td7 = document.createElement("td");
            const td5 = document.createElement("button");
            const td6 = document.createElement("button");
            td5.classList.add('button1')
            td6.classList.add('button2')
            td5.innerHTML="Delete";
            td6.innerHTML="Edit";
            td6.classList.add('editbutton')
            td1.innerHTML = fullname;
            td2.innerHTML = email;
            td3.innerHTML = studentid;
            td4.innerHTML = dob;
            td7.innerHTML = contactNo;
            
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tr.appendChild(td7);
            tr.appendChild(td5);
            tr.appendChild(td6);
            


            td5.addEventListener('click',function(){
                delete2(index)
            })
            td6.addEventListener('click',function(){
                edit(index);
            })
            tbody.appendChild(tr);
        });
    
        // Append table body to table
        table.appendChild(tbody);
    
        // Append table to the document container
        container.appendChild(table);
    
    }
    
    function edit(index) {
        let tbody=document.querySelector("tbody");
        const studentRow = tbody.children[index];
        let editBtn=document.getElementsByClassName("editbutton");

        const tr = tbody.children[index]; // Get the table row to edit
        const tds = tr.children; // Get all the table cells in the row
      
        // Loop through each table cell and make its content editable
        for (let i = 0; i < tds.length - 2; i++) { // Exclude the last two buttons
            tds[i].setAttribute('contenteditable', true);
        }
        const editBtnCell = studentRow.cells[studentRow.cells.length - 2];
        
        editBtn[index].textContent = "Update"; // Change "Save" to "Update"
        editBtn[index].removeEventListener("click", function() {
            edit(index);
        });
        editBtn[index].addEventListener("click", function() {
            save2(index,editBtn[index]);
        });  
    
    }
    function save2(index,editBtn){
        let tbody=document.querySelector("tbody");
        const studentRow = tbody.children[index];
        let fullNameCell= studentRow.children[0];
        let emailCell= studentRow.children[1];
        let studentidCell= studentRow.children[2];
        let dobCell= studentRow.children[3];
        let contactNoCell= studentRow.children[4];

        let fullNameValue=fullNameCell.textContent;
        let emailValue=emailCell.textContent;
        let studentidValue=studentidCell.textContent;
        let dobValue=dobCell.textContent;
        let contactNoValue=contactNoCell.textContent;

         arr[index]["fullName"]=fullNameValue;
         arr[index]["email"]=emailValue;
         arr[index]["studentid"]=studentidValue;
         arr[index]["dob"]=dobValue;
         arr[index]["contactNo"]=contactNoValue;
        
        // console.log(fullNameValue);
        console.log(arr);
        fullNameCell.setAttribute('contenteditable', false);
        emailCell.setAttribute('contenteditable', false);
        studentidCell.setAttribute('contenteditable', false);
        dobCell.setAttribute('contenteditable', false);
        contactNoCell.setAttribute('contenteditable', false);
        editBtn.textContent = "Edit";
        save();
        editBtn.addEventListener("click", function() {
            edit(index);
        });
    }
    function delete2(index){
        console.log(index)
       arr.splice(index,1);
       display();
    }
    display();
    // del=document.getElementById('delete');
    // console.log(del);
    document.getElementById('delete').addEventListener('click', function() {
        var studentIDToDelete = parseInt(document.getElementById('number').value);
        // alert(studentIDToDelete);
        // Find the index of the student with the given student ID
        // var indexToDelete = arr.map((student,index) =>{ 
        //     if(student.studentid === studentIDToDelete){return index;}

        // } );
        var indexToDelete;
        for(let i=0; i<arr.length;i++){
            if(arr[i].studentid==studentIDToDelete){
                indexToDelete=i;
            }
        }
        // console.log("cgh",indexToDelete);
        // console.log(arr);
        if (indexToDelete || indexToDelete==0) {
            // Remove the student from the array
            arr.splice(indexToDelete, 1);
            
            // Save the updated array to localStorage
        
            
            // Clear the input field
            document.getElementById('number').value = '';
            
            // Re-display the student list
            display();
        } else {
            alert("Student with ID " + studentIDToDelete + " not found.");
        }
    });
    
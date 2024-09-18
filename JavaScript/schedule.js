document.addEventListener('DOMContentLoaded', function() {
    setInterval(downloadCSV, 300000); // 300000 milliseconds equals 5 minutes

    let rowCount = 0;
    
      
      // Call the function
    document.getElementById("topLeftButton").addEventListener("click", function() {
        window.location.href = "../Pages/newtab.html";
    });
    
    document.getElementById("topRightButton1").addEventListener("click", function() {
        window.location.href = "../Pages/unicode.html";
    });
    document.getElementById("topRightButton2").addEventListener("click", function() {
        window.location.href = "../Pages/photo.html";
    });
    const setCurrentTime = (inputElement) => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        inputElement.value = `${hours}:${minutes}`;
    };

    const setCurrentDate = (inputElement) => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        inputElement.value = `${year}-${month}-${day}`;
    };

    function validateFields() {
        const lastRow = scheduleBody.lastElementChild;
        if (lastRow) {
            const inputs = lastRow.querySelectorAll('input');
            for (const input of inputs) {
                if (!input.value) {
                    return false;
                }
            }
        }
        return true;
    }

    const addRowButton = document.getElementById('addRow');
    const scheduleBody = document.getElementById('scheduleBody');
    const modifyAllButton = document.getElementById('modifyAll');

    function toggleEditableClass(row, addClass) {
        const inputs = row.querySelectorAll('input');
        const textareas = row.querySelectorAll('textarea');
        
        if (addClass) {
            inputs.forEach(input => input.classList.add('editable'));
            textareas.forEach(textarea => textarea.classList.add('editable'));
        } else {
            inputs.forEach(input => input.classList.remove('editable'));
            textareas.forEach(textarea => textarea.classList.remove('editable'));
        }
    }
    function setRowToReadOnly(row, isReadOnly) {
        const inputs = row.querySelectorAll('input');
        const textareas = row.querySelectorAll('textarea'); // separate query for textarea
        const buttons = row.querySelectorAll('.setBtn');
    
        inputs.forEach(input => input.readOnly = isReadOnly);
        textareas.forEach(textarea => textarea.readOnly = isReadOnly); // use readOnly attribute here instead of disabled
        buttons.forEach(button => button.style.display = isReadOnly ? "none" : "inline");
    }
    
    // Existing JavaScript code for toggling read-only
    const toggleRowReadOnly = (row, isReadOnly) => {
        const inputs = row.querySelectorAll('input[type="date"], input[type="time"], input[type="text"], textarea');
        const buttons = row.querySelectorAll('button');
        inputs.forEach(input => {
            input.readOnly = isReadOnly;
            if (isReadOnly) {
                input.className = 'hide-border';
            } else {
                input.className = 'border-active modify-active';  // Add 'modify-active' here
            }
            console.log(`Attaching focus and blur events to input with ID: ${input.id}`);

            input.addEventListener('focus', function() {
                this.classList.add('input-active');
            });
            input.addEventListener('blur', function() {
                this.classList.remove('input-active');
            });
        });
        
        buttons.forEach(button => button.style.display = isReadOnly ? 'none' : 'inline');
    };

    
        
    
    
    
    
    
    // Function to resize a textarea to fit its content
    const autoResizeTextarea = (textarea) => {
        textarea.style.height = 'auto';
        textarea.style.height = (textarea.scrollHeight) + 'px';
    };

    addRowButton.addEventListener('click', function() {
        if (!validateFields()) {
            alert("Please fill in all fields in the last row before adding a new one.");
            return;
        }

        // Set all existing rows to read-only
        scheduleBody.querySelectorAll('tr').forEach(row => toggleRowReadOnly(row, true));


        // Add new modifiable row
        // In addRowButton event listener
        rowCount++;
        const row = document.createElement('tr');
        row.setAttribute('data-row', rowCount); // Add data-row attribute
        row.innerHTML = `
            <td><input type="date" data-row="${rowCount}" id="date${rowCount}"> <button data-row="${rowCount}" class="setBtn dateBtn">Set Current</button></td>
            <td><input type="time" data-row="${rowCount}" id="startTime${rowCount}"> <button data-row="${rowCount}" class="setBtn startTimeBtn">Set Current</button></td>
            <td><input type="time" data-row="${rowCount}" id="endTime${rowCount}"> <button data-row="${rowCount}" class="setBtn endTimeBtn">Set Current</button></td>
            <td><textarea data-row="${rowCount}" id="activity${rowCount}" class="activity-input"></textarea></td>
        `;

        // In each setBtn click listener
        row.querySelector('.dateBtn').addEventListener('click', function() {
            const rowNumber = this.getAttribute('data-row');
            const dateInput = document.querySelector(`input[data-row="${rowNumber}"][id^="date"]`);
            setCurrentDate(dateInput);
        });
        row.querySelector('.startTimeBtn').addEventListener('click', function() {
            const rowNumber = this.getAttribute('data-row');
            const startTimeInput = document.querySelector(`input[data-row="${rowNumber}"][id^="startTime"]`);
            setCurrentTime(startTimeInput);
        });
        row.querySelector('.endTimeBtn').addEventListener('click', function() {
            const rowNumber = this.getAttribute('data-row');
            const endTimeInput = document.querySelector(`input[data-row="${rowNumber}"][id^="endTime"]`);
            setCurrentTime(endTimeInput);
        });

        // Similar changes for toggleRowReadOnly and setRowToReadOnly functions

        
        

        // Get the textarea in the newly added row
        const textarea = row.querySelector('textarea');

        // Resize the textarea to fit its current content
        autoResizeTextarea(textarea);

        // Add an event listener to resize the textarea whenever its content changes
        textarea.addEventListener('input', function() {
            autoResizeTextarea(textarea);
        });
        toggleRowReadOnly(row, false);
        scheduleBody.appendChild(row);
    });

    
    modifyAllButton.addEventListener('click', function() {
        // Toggle read-only for all rows except the last one
        const rows = Array.from(scheduleBody.querySelectorAll('tr'));
        rows.slice(0, -1).forEach(row => {
            setRowToReadOnly(row, row.querySelector('input').readOnly ? false : true);
            toggleEditableClass(row, !row.querySelector('input').readOnly);
        });
    });
    
    const downloadCSVButton = document.getElementById('downloadCSV');
    downloadCSVButton.addEventListener('click', downloadCSV);

    function downloadCSV() {
        let csvContent = "Date,Start Time,End Time,Activity\n"; // header
        const rows = document.querySelectorAll('#scheduleBody tr');
        rows.forEach(row => {
            const rowData = [];
            const inputs = row.querySelectorAll('td input, td textarea');
    
            // Date
            // Date
            const dateInput = row.querySelector('input[type="date"]');
            //if (dateInput) {
            if (dateInput) {
                const [year, month, day] = dateInput.value.split('-');
                const formattedDate = `${month.padStart(2, '0')}/${day.padStart(2, '0')}/${year}`;
                rowData.push(formattedDate);
            }

    
            // Start and End Times
            const timeInputs = row.querySelectorAll('input[type="time"]');
            timeInputs.forEach(timeInput => {
                const [hour, minute] = timeInput.value.split(':');
                const formattedTime = `${hour % 12 || 12}:${minute} ${hour >= 12 ? 'PM' : 'AM'}`;
                rowData.push(formattedTime);
            });
    
            // Activity
            const textarea = row.querySelector('textarea');
            if (textarea) {
                rowData.push(textarea.value);
            }
    
            csvContent += rowData.join(",") + "\n";
        });
    
        // Create blob and initiate download
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "schedule.csv");
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    
    
    if (scheduleBody.children.length === 0) {
        addRowButton.click();
    }
    

    // Add this at the end of your DOMContentLoaded function

    const importCsvButton = document.getElementById('importCsvBtn');
    const csvFileInput = document.getElementById('csvFile');
    
    
    function convertDate(date) {
        const [month, day, year] = date.split('/');
        return `${year.padStart(4, '0')}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    
    function convertTime12to24(time12h) {
        const [time, modifier] = time12h.split(' ');
        let [hours, minutes] = time.split(':');
        if (hours === '12') {
            hours = '00';
        }
        if (modifier.toLowerCase() === 'pm') {
            hours = parseInt(hours, 10) + 12;
        }
        // Pad the hour with zeros
        hours = String(hours).padStart(2, '0');
        return `${hours}:${minutes}`;
    }
    
    function initializeImportedRows(importedData) {
        importedData.forEach(rowData => {
            // Create and append a new row based on rowData
            const row = createNewRow(rowData);
    
            // Initialize the "End Time" field with the current time only if it's empty
            const endTimeInput = row.querySelector('.endTimeInput');
            if (!endTimeInput.value) {
                setCurrentTime(endTimeInput);
            }
    
            // Append the row to the table body
            scheduleBody.appendChild(row);
        });
    }

    importCsvButton.addEventListener('click', function() {
        csvFileInput.click();
    });
    
    csvFileInput.addEventListener('change', function(evt) {
        const file = evt.target.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            const contents = e.target.result;
            const lines = contents.split('\n'); // Split by new line
            
            // Clear the table
            scheduleBody.innerHTML = '';
            // Skip the header and iterate over each line
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim(); // Trim removes leading and trailing whitespaces
                if (line) {
                    
                    let [date, startTime, endTime, activity] = line.split(',');
                    date = convertDate(date); // Convert date to YYYY-MM-DD-----------------------------
                    startTime = convertTime12to24(startTime.trim()); // Convert to 24-hour format
                    endTime = convertTime12to24(endTime.trim());
                    
                    if (date && startTime && endTime) {
                        rowCount++;
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td><input type="date" value="${date.trim()}" id="date${rowCount}"> <button class="setBtn dateBtn">Set Current</button></td>
                            <td><input type="time" value="${startTime.trim()}" id="startTime${rowCount}"> <button class="setBtn startTimeBtn">Set Current</button></td>
                            <td><input type="time" value="${endTime.trim()}" id="endTime${rowCount}"> <button class="setBtn endTimeBtn">Set Current</button></td>
                            <td><textarea id="activity${rowCount}" class="activity-input">${activity ? activity.trim() : ''}</textarea></td>
                        `;
                        scheduleBody.appendChild(row);
                        const endTimeInput = document.getElementById(`endTime${rowCount}`);
                        if (!endTimeInput.value) {
                            setCurrentTime(endTimeInput);
                        }
                        const dateInput = document.getElementById(`date${rowCount}`);
                        //if (!dateInput.value) {
                        //    setCurrentDate(dateInput);
                        //}
                        // Attach event listeners to the new row, similar to how you did it in the addRowButton function.
                        row.querySelector('.dateBtn').addEventListener('click', function() {
                            setCurrentDate(document.getElementById(`date${rowCount}`));
                        });
                        row.querySelector('.startTimeBtn').addEventListener('click', function() {
                            setCurrentTime(row.querySelector('.startTimeInput'));
                        });
                        row.querySelector('.endTimeBtn').addEventListener('click', function() {
                            setCurrentTime(row.querySelector('.endTimeInput'));
                        });
                        
                        // Get the textarea in the newly added row
                        const textarea = row.querySelector('textarea');
        
                        // Resize the textarea to fit its current content
                        autoResizeTextarea(textarea);
        
                        // Add an event listener to resize the textarea whenever its content changes
                        textarea.addEventListener('input', function() {
                            autoResizeTextarea(textarea);
                        });
    
                        toggleRowReadOnly(row, true);
                        scheduleBody.appendChild(row);
                    }
                }
            }
        };
        reader.readAsText(file);
    });
    
      
});  